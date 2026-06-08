import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// Browser-synthesized mechanical shutter click sound using Web Audio API
const playShutterSound = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // Part 1: Mechanical Mirror Flip (High frequency slap)
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.04);
    gain1.gain.setValueAtTime(0.25, audioCtx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.04);
    
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start();
    osc1.stop(audioCtx.currentTime + 0.05);

    // Part 2: Shutter Curtain Movement (Mechanical noise burst)
    const bufferSize = audioCtx.sampleRate * 0.08; // 80ms duration
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noiseSource = audioCtx.createBufferSource();
    noiseSource.buffer = buffer;
    
    // Bandpass filter to sculpt white noise into a realistic mechanical "click"
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1300;
    filter.Q.value = 4;

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);

    noiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);
    
    noiseSource.start();
    noiseSource.stop(audioCtx.currentTime + 0.09);
  } catch (err) {
    console.warn('Web Audio API click sound could not play:', err);
  }
};

export default function Hero() {
  const mountRef = useRef(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [flash, setFlash] = useState(false);

  const triggerFlash = () => {
    setFlash(true);
    setTimeout(() => {
      setFlash(false);
    }, 150);
  };

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const supported = !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      // Disable Three.js on mobile to enforce robust fallback styling
      setWebGLSupported(supported && window.innerWidth >= 768);
    } catch (e) {
      setWebGLSupported(false);
    }
  }, []);

  useEffect(() => {
    if (!webGLSupported || !mountRef.current) return;

    let width = mountRef.current.clientWidth;
    let height = mountRef.current.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 24);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // 4. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfffdf2, 4.0); // Soft warm white
    mainLight.position.set(6, 6, 6);
    scene.add(mainLight);

    const fillLightPurple = new THREE.DirectionalLight(0xc084fc, 2.5); // Elegant purple fill
    fillLightPurple.position.set(-8, 4, -5);
    scene.add(fillLightPurple);

    const rimLightGold = new THREE.DirectionalLight(0xd4af37, 2.0); // Studio gold accent rim
    rimLightGold.position.set(0, -6, -2);
    scene.add(rimLightGold);

    const frontLight = new THREE.DirectionalLight(0xffffff, 1.8); // Lens reflection light
    frontLight.position.set(0, 0, 8);
    scene.add(frontLight);

    // Lens pointlight flash intensity variable & actual light
    let flashIntensity = 0;
    const flashLight = new THREE.PointLight(0xffffff, 0, 35);
    flashLight.position.set(0, 0, 3.2); // Positioned slightly in front of the centered lens
    scene.add(flashLight);

    // 5. 3D Model Loading using LoadingManager
    let cameraModel = null;
    const loadingManager = new THREE.LoadingManager();

    loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const progressPercent = (itemsLoaded / itemsTotal) * 100;
      window.dispatchEvent(new CustomEvent('3d-loading-progress', { 
        detail: { progress: progressPercent } 
      }));
    };

    loadingManager.onLoad = () => {
      window.dispatchEvent(new CustomEvent('3d-loading-progress', { 
        detail: { progress: 100 } 
      }));
    };

    const loader = new GLTFLoader(loadingManager);
    loader.load('/canon_dslr_camera_opt.glb', (gltf) => {
      const modelScene = gltf.scene;

      // Compute bounding box to center the geometry perfectly
      const box = new THREE.Box3().setFromObject(modelScene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      // Shift position back by its center
      modelScene.position.sub(center);

      // Scale camera model to fit screen beautifully
      const maxDim = Math.max(size.x, size.y, size.z);
      const scaleFactor = maxDim > 0 ? 9.2 / maxDim : 1;
      modelScene.scale.setScalar(scaleFactor);

      // Create model group container for animations
      const modelGroup = new THREE.Group();
      modelGroup.add(modelScene);
      
      // Starting default rotation
      modelGroup.rotation.set(0.15, 0.35, 0);
      
      scene.add(modelGroup);
      cameraModel = modelGroup;
    }, undefined, (error) => {
      console.error('Error loading camera model:', error);
    });

    // 6. Background Dust Layer 1 (Dense gold dust)
    const goldCount = 2200;
    const goldGeom = new THREE.BufferGeometry();
    const goldPositions = new Float32Array(goldCount * 3);
    const goldSpeeds = new Float32Array(goldCount);

    const createParticleTexture = (color1, color2) => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(0.25, color2);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const goldTexture = createParticleTexture('rgba(212, 175, 55, 1)', 'rgba(212, 175, 55, 0.25)');
    const goldMaterial = new THREE.PointsMaterial({
      size: 0.6,
      map: goldTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.55,
    });

    for (let i = 0; i < goldCount * 3; i += 3) {
      goldPositions[i] = (Math.random() - 0.5) * 60;
      goldPositions[i + 1] = (Math.random() - 0.5) * 60;
      goldPositions[i + 2] = (Math.random() - 0.5) * 40;
      goldSpeeds[i / 3] = 0.005 + Math.random() * 0.01;
    }
    goldGeom.setAttribute('position', new THREE.BufferAttribute(goldPositions, 3));
    const goldParticles = new THREE.Points(goldGeom, goldMaterial);
    scene.add(goldParticles);

    // Background Dust Layer 2 (Rose blush bokeh lights)
    const roseCount = 500;
    const roseGeom = new THREE.BufferGeometry();
    const rosePositions = new Float32Array(roseCount * 3);
    const roseSpeeds = new Float32Array(roseCount);

    const roseTexture = createParticleTexture('rgba(201, 147, 143, 1)', 'rgba(212, 175, 55, 0.3)');
    const roseMaterial = new THREE.PointsMaterial({
      size: 1.8,
      map: roseTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.6,
    });

    for (let i = 0; i < roseCount * 3; i += 3) {
      rosePositions[i] = (Math.random() - 0.5) * 50;
      rosePositions[i + 1] = (Math.random() - 0.5) * 50;
      rosePositions[i + 2] = (Math.random() - 0.5) * 30;
      roseSpeeds[i / 3] = 0.01 + Math.random() * 0.02;
    }
    roseGeom.setAttribute('position', new THREE.BufferAttribute(rosePositions, 3));
    const roseParticles = new THREE.Points(roseGeom, roseMaterial);
    scene.add(roseParticles);

    // 7. Event Listeners (Mouse parallax + Shutter click)
    const mouse = { x: 0, y: 0 };
    const targetMouse = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleCanvasClick = () => {
      playShutterSound();
      flashIntensity = 22.0; // Peak flash intensity
      triggerFlash();
    };
    renderer.domElement.addEventListener('click', handleCanvasClick);
    renderer.domElement.classList.add('cursor-pointer');

    // 8. Animation & Render Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse coordinates lerp
      mouse.x += (targetMouse.x - mouse.x) * 0.075;
      mouse.y += (targetMouse.y - mouse.y) * 0.075;

      // Animate Camera 3D Model
      if (cameraModel) {
        // Slow vertical floating drift
        cameraModel.position.y = Math.sin(elapsedTime * 1.4) * 0.35;
        cameraModel.position.x = Math.cos(elapsedTime * 0.8) * 0.15;

        // Yaw and Pitch mouse follow tracking
        cameraModel.rotation.y = 0.35 + mouse.x * 0.45;
        cameraModel.rotation.x = 0.15 - mouse.y * 0.35;

        // Roll drift
        cameraModel.rotation.z = Math.sin(elapsedTime * 0.6) * 0.035;
      }

      // Flash Light Intensity Decay
      if (flashIntensity > 0) {
        flashIntensity *= 0.8; // fast decay
        if (flashIntensity < 0.05) flashIntensity = 0;
      }
      flashLight.intensity = flashIntensity;

      // Particles cosmic rotation & drift
      goldParticles.rotation.y = elapsedTime * 0.015;
      const goldAttr = goldGeom.attributes.position;
      const goldArr = goldAttr.array;
      for (let i = 0; i < goldCount; i++) {
        const yIndex = i * 3 + 1;
        goldArr[yIndex] += goldSpeeds[i] * 0.08;
        if (goldArr[yIndex] > 30) goldArr[yIndex] = -30;
      }
      goldAttr.needsUpdate = true;

      roseParticles.rotation.y = -elapsedTime * 0.01;
      const roseAttr = roseGeom.attributes.position;
      const roseArr = roseAttr.array;
      for (let i = 0; i < roseCount; i++) {
        const yIndex = i * 3 + 1;
        roseArr[yIndex] += roseSpeeds[i] * 0.08;
        if (roseArr[yIndex] > 25) roseArr[yIndex] = -25;
      }
      roseAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current) return;
      width = mountRef.current.clientWidth;
      height = mountRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (renderer.domElement) {
        renderer.domElement.removeEventListener('click', handleCanvasClick);
      }
      cancelAnimationFrame(animationFrameId);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      goldGeom.dispose();
      goldMaterial.dispose();
      goldTexture.dispose();

      roseGeom.dispose();
      roseMaterial.dispose();
      roseTexture.dispose();

      if (cameraModel) {
        cameraModel.traverse((child) => {
          if (child.isMesh) {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((m) => m.dispose());
              } else {
                child.material.dispose();
              }
            }
          }
        });
      }
    };
  }, [webGLSupported]);

  return (
    <section 
      id="home" 
      className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center bg-[#050505]"
    >
      {/* Background Cinematic Shading */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#050505]/90 pointer-events-none z-10" />

      {/* Screen Shutter Flash Overlay */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="fixed inset-0 bg-white z-[9998] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* THREE JS Particle Canvas / Mobile Fallback */}
      {webGLSupported ? (
        <div ref={mountRef} className="absolute inset-0 w-full h-full z-0 opacity-90" />
      ) : (
        // Mobile fallback - beautiful gradient background with slow floating CSS bokeh
        <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-b from-[#0c0808] via-[#050505] to-[#14100c] opacity-90 overflow-hidden">
          <div className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-gold-leaf/5 blur-3xl animate-[pulse_10s_infinite]" />
          <div className="absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-rose-blush/5 blur-3xl animate-[pulse_15s_infinite_reverse]" />
          {/* Mock floating particles via pure CSS */}
          <div className="absolute w-2 h-2 rounded-full bg-gold-leaf/40 top-[30%] left-[40%] animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute w-3 h-3 rounded-full bg-rose-dusty/30 top-[60%] left-[80%] animate-ping" style={{ animationDuration: '4.5s' }} />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-gold-leaf/50 top-[70%] left-[20%] animate-ping" style={{ animationDuration: '2s' }} />
        </div>
      )}

      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Hero Content Overlay */}
      <div className="relative z-20 text-center px-6 max-w-4xl flex flex-col items-center select-none pointer-events-none">
        
        {/* Decorative thin golden line */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="w-24 h-[1px] bg-gold-leaf mb-6"
        />

        {/* Small Intro Pill */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-nunito text-xs uppercase tracking-[0.25em] text-rose-dusty mb-4 font-light"
        >
          Nellore's Finest Wedding Visual Studio
        </motion.p>

        {/* Studio Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="font-cormorant text-5xl md:text-8xl lg:text-9xl tracking-[0.15em] text-cream-white font-light uppercase leading-none"
        >
          THE KNOT
        </motion.h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.2, delay: 1.0 }}
          className="font-cormorant italic text-lg md:text-2xl text-cream-white/70 tracking-widest mt-6 max-w-xl font-light"
        >
          Where Every Moment Becomes Forever
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 pointer-events-auto"
        >
          <a
            href="#portfolio"
            className="btn-shimmer inline-block font-nunito text-xs uppercase tracking-[0.25em] border border-gold-leaf/60 px-8 py-3.5 text-gold-leaf hover:bg-gold-leaf hover:text-black font-semibold transition-all duration-500 rounded-none shadow-lg shadow-gold-leaf/5 hover:shadow-gold-leaf/10 clickable"
          >
            View Our Work
          </a>
        </motion.div>
      </div>

      {/* Down indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5, delay: 1.8 }}
        className="absolute bottom-10 z-20 text-cream-white/50 flex flex-col items-center pointer-events-none"
      >
        <span className="font-nunito text-[9px] uppercase tracking-[0.3em] mb-1 font-light">Scroll Down</span>
        <ChevronDown size={14} className="text-gold-leaf" />
      </motion.div>
    </section>
  );
}

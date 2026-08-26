// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Zap, RefreshCw, Palette, Layers, Compass } from 'lucide-react';

const THEMES = [
  { name: 'Cyan Neon', hex: 0x00f0ff, css: 'from-cyan-500 to-blue-500', text: 'text-cyan-400', border: 'border-cyan-500/40' },
  { name: 'Cyber Purple', hex: 0xa855f7, css: 'from-purple-500 to-pink-500', text: 'text-purple-400', border: 'border-purple-500/40' },
  { name: 'Matrix Emerald', hex: 0x10b981, css: 'from-emerald-500 to-teal-500', text: 'text-emerald-400', border: 'border-emerald-500/40' },
  { name: 'Golden Amber', hex: 0xf59e0b, css: 'from-amber-500 to-orange-500', text: 'text-amber-400', border: 'border-amber-500/40' },
];

export const Hero3DInteractiveMesh: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const torusMatRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const [wireframe, setWireframe] = useState(true);
  const [themeIdx, setThemeIdx] = useState(0);
  const [turboSpeed, setTurboSpeed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Outer Torus Knot Mesh
    const torusGeo = new THREE.TorusKnotGeometry(1.4, 0.42, 128, 32, 2, 3);
    const torusMat = new THREE.MeshBasicMaterial({
      color: THEMES[themeIdx].hex,
      wireframe: wireframe,
      transparent: true,
      opacity: wireframe ? 0.38 : 0.8,
    });
    torusMatRef.current = torusMat;
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    scene.add(torusMesh);

    // 3. Inner Glowing Core Polyhedron
    const coreGeo = new THREE.IcosahedronGeometry(0.85, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // 4. Orbiting Cyber Particle System
    const particlesCount = 200;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const c1 = new THREE.Color(THEMES[themeIdx].hex);
    const c2 = new THREE.Color(0xa855f7);

    for (let i = 0; i < particlesCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.2 + (Math.random() - 0.5) * 0.5;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const c = Math.random() < 0.5 ? c1 : c2;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // 5. Mouse Drag & Inertia Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch listeners
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;

        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;

        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    domEl.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // 6. Animation Loop (Active only when visible in viewport)
    let animId: number | null = null;
    let isVisible = true;
    const clock = new THREE.Clock();

    const renderFrame = () => {
      if (!isVisible) return;
      const elapsedTime = clock.getElapsedTime();

      const speedFactor = turboSpeed ? 0.015 : 0.004;
      targetRotationY += speedFactor;

      torusMesh.rotation.y += (targetRotationY - torusMesh.rotation.y) * 0.1;
      torusMesh.rotation.x += (targetRotationX - torusMesh.rotation.x) * 0.1;
      torusMesh.rotation.z = Math.sin(elapsedTime * 0.5) * 0.15;

      coreMesh.rotation.y = -elapsedTime * 0.3 + mouseX * 0.5;
      coreMesh.rotation.x = elapsedTime * 0.2 + mouseY * 0.5;

      particleSystem.rotation.y = elapsedTime * 0.08;
      particleSystem.rotation.x = mouseY * 0.2;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(renderFrame);
    };

    const startAnimation = () => {
      if (!animId) {
        animId = requestAnimationFrame(renderFrame);
      }
    };

    const stopAnimation = () => {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };

    // Intersection Observer to completely pause Three.js GPU cycles when user scrolls down
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting;
        if (isVisible) {
          clock.start();
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      stopAnimation();
      observer.disconnect();
      domEl.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domEl.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      torusGeo.dispose();
      torusMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, [themeIdx, wireframe, turboSpeed]);

  const toggleTheme = () => {
    setThemeIdx((prev) => (prev + 1) % THEMES.length);
  };

  return (
    <div className="relative w-full h-[460px] sm:h-[520px] flex flex-col items-center justify-between overflow-visible select-none">
      {/* Background Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,240,255,0.15)_0%,_rgba(168,85,247,0.1)_40%,_transparent_70%)] pointer-events-none" />

      {/* Floating Orbital Tech Badges */}
      <div className="absolute top-2 left-2 z-20 px-3 py-1 rounded-full bg-zinc-900/90 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 backdrop-blur-md shadow-lg flex items-center gap-1.5 pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
        <span>React.js • Node.js</span>
      </div>

      <div className="absolute top-2 right-2 z-20 px-3 py-1 rounded-full bg-zinc-900/90 border border-purple-500/30 text-[11px] font-mono text-purple-300 backdrop-blur-md shadow-lg flex items-center gap-1.5 pointer-events-none">
        <Layers className="w-3.5 h-3.5 text-purple-400" />
        <span>TypeScript • MERN</span>
      </div>

      <div className="absolute bottom-16 left-2 z-20 px-3 py-1 rounded-full bg-zinc-900/90 border border-emerald-500/30 text-[11px] font-mono text-emerald-300 backdrop-blur-md shadow-lg flex items-center gap-1.5 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>React Native • FCM</span>
      </div>

      {/* Main 3D Canvas Mount Container */}
      <div ref={containerRef} className="w-full h-[380px] sm:h-[420px] cursor-grab active:cursor-grabbing z-10" />

      {/* Interactive 3D Developer Control Toolbar */}
      <div className="z-20 w-full px-4 py-2 bg-zinc-950/90 border border-zinc-800/90 rounded-2xl backdrop-blur-xl flex items-center justify-between gap-2 text-xs font-mono text-zinc-300 shadow-2xl">
        <div className="flex items-center gap-2">
          {/* Wireframe / Solid Mode Toggle */}
          <button
            onClick={() => setWireframe(!wireframe)}
            className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
              wireframe ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300' : 'bg-purple-500/10 border-purple-500/30 text-purple-300'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{wireframe ? 'Wireframe' : 'Solid Shaded'}</span>
          </button>

          {/* Theme Color Switcher */}
          <button
            onClick={toggleTheme}
            className={`px-3 py-1.5 rounded-xl border ${THEMES[themeIdx].border} bg-zinc-900 transition-all flex items-center gap-1.5 hover:scale-105`}
          >
            <Palette className={`w-3.5 h-3.5 ${THEMES[themeIdx].text}`} />
            <span className={THEMES[themeIdx].text}>{THEMES[themeIdx].name}</span>
          </button>
        </div>

        {/* Turbo Speed Boost Button */}
        <button
          onClick={() => setTurboSpeed(!turboSpeed)}
          className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
            turboSpeed ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-bold animate-pulse' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>{turboSpeed ? 'Turbo 2.5x' : '1x Speed'}</span>
        </button>
      </div>
    </div>
  );
};

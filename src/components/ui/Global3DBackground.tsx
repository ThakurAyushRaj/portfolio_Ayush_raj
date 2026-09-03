import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Global3DBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    // Dark fog to fade out the horizon and create depth
    scene.fog = new THREE.FogExp2(0x000000, 0.0015);
    
    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 2500);
   
    // Start camera looking slightly down at the wave
    camera.position.set(0, 200, 400);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    // --- Particle Wave Terrain ---
    const SEPARATION = 45;
    const AMOUNTX = 80;
    const AMOUNTY = 80;
    const numParticles = AMOUNTX * AMOUNTY;
    
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);
    
    const color1 = new THREE.Color(0x00f0ff); // Neon Cyan
    const color2 = new THREE.Color(0xa855f7); // Neon Purple
    
    let i = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        // x, y, z
        positions[i * 3] = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
        positions[i * 3 + 1] = 0; // z-axis in math, y-axis in 3D
        positions[i * 3 + 2] = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
        
        // Mix colors based on position
        const mixedColor = color1.clone().lerp(color2, (ix / AMOUNTX));
        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;
        
        scales[i] = 1;
        i++;
      }
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    
    // Custom Shader Material for scaled, glowing points
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        attribute float scale;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          // Size attenuation based on depth
          gl_PointSize = scale * (250.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          // Circular particle
          float r = distance(gl_PointCoord, vec2(0.5));
          if (r > 0.5) discard;
          
          // Glow effect
          float intensity = 1.0 - (r * 2.0);
          gl_FragColor = vec4(vColor, intensity * 0.9);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // --- Interaction State ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = window.scrollY;
    let targetScrollY = scrollY;
    let count = 0;

    // Raycaster for mouse-terrain interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    // Create an invisible plane to raycast against
    const planeGeo = new THREE.PlaneGeometry(5000, 5000);
    // Rotate to match the particle terrain (XZ plane)
    planeGeo.rotateX(-Math.PI / 2);
    const planeMat = new THREE.MeshBasicMaterial({ visible: false });
    const intersectPlane = new THREE.Mesh(planeGeo, planeMat);
    scene.add(intersectPlane);

    const onMouseMove = (event: MouseEvent) => {
      // For camera parallax
      mouseX = event.clientX - width / 2;
      mouseY = event.clientY - height / 2;
      
      // For raycasting
      mouse.x = (event.clientX / width) * 2 - 1;
      mouse.y = -(event.clientY / height) * 2 + 1;
    };

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });

    // --- Animation Loop ---
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Smooth interpolations
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      const scrollDiff = targetScrollY - scrollY;
      scrollY += scrollDiff * 0.1;

      // Make the wave flow faster based on scroll speed!
      const scrollVelocity = Math.abs(scrollDiff);
      count += 0.02 + (scrollVelocity * 0.001); // Count controls wave movement forward

      // --- Camera Parallax & Scroll ---
      // As you scroll down, fly forward through the wave and dip down
      camera.position.x += (targetX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (200 - scrollY * 0.1 - targetY * 0.2 - camera.position.y) * 0.05;
      // Fly forward based on scroll
      camera.position.z += (400 - scrollY * 0.25 - camera.position.z) * 0.05;
      
      camera.lookAt(scene.position);
      
      // --- Update 3D Mouse Position on the terrain ---
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(intersectPlane);
      let hitPoint: THREE.Vector3 | null = null;
      if (intersects.length > 0) {
        hitPoint = intersects[0].point;
      }
      
      // --- Update Particle Waves ---
      const positions = particles.geometry.attributes.position.array as Float32Array;
      const scales = particles.geometry.attributes.scale.array as Float32Array;
      
      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const px = positions[i * 3];
          const pz = positions[i * 3 + 2];
          
          // Base math wave movement (flowing forward)
          let py = (Math.sin((ix + count) * 0.3) * 50) +
                   (Math.sin((iy + count) * 0.5) * 50);
                   
          let pScale = (Math.sin((ix + count) * 0.3) + 1) * 2 +
                       (Math.sin((iy + count) * 0.5) + 1) * 2;

          // Mouse Interaction (Ripple / Repulsion)
          if (hitPoint) {
            const dx = px - hitPoint.x;
            const dz = pz - hitPoint.z;
            const distSq = dx * dx + dz * dz;
            const interactionRadius = 250;
            
            if (distSq < interactionRadius * interactionRadius) {
              const dist = Math.sqrt(distSq);
              const force = (interactionRadius - dist) / interactionRadius;
              
              // Push particles up and make them significantly larger near the mouse
              py += force * 100;
              pScale += force * 15;
            }
          }
          
          positions[i * 3 + 1] = py;
          scales[i] = pScale;
          i++;
        }
      }
      
      particles.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.scale.needsUpdate = true;
      
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      planeGeo.dispose();
      planeMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-black">
      <div ref={containerRef} className="absolute inset-0 w-full h-full block will-change-transform" />
    </div>
  );
};

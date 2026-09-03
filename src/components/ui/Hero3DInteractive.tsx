import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export const Hero3DInteractive: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8); // Centered camera so Y=0 is the middle of the screen

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Realistic Studio Lighting for the 3D Model
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    
    renderer.domElement.style.width = '100vw';
    renderer.domElement.style.height = '100vh';
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Cinematic Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0x00f0ff, 3); // Cyan rim light
    backLight.position.set(-5, 5, -5);
    scene.add(backLight);

    let robotModel: THREE.Group | null = null;
    let mixer: THREE.AnimationMixer | null = null;

    // Load an ACTUAL 3D Robot Model (RobotExpressive from Three.js Examples)
    const loader = new GLTFLoader();
    const modelUrl = 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/models/gltf/RobotExpressive/RobotExpressive.glb';
    
    loader.load(modelUrl, (gltf) => {
        robotModel = gltf.scene;
        
        // Scale and position the robot perfectly (feet at the bottom of the screen)
        robotModel.position.set(2.5, -3.0, 0);
        robotModel.scale.set(1.0, 1.0, 1.0);
        scene.add(robotModel);

        // Play the "Idle" breathing animation if it exists
        if (gltf.animations && gltf.animations.length > 0) {
            mixer = new THREE.AnimationMixer(robotModel);
            // Try to find Idle, otherwise just play the first animation
            const idleAnim = gltf.animations.find((a) => a.name === 'Idle') || gltf.animations[0];
            const action = mixer.clipAction(idleAnim);
            action.play();
        }
    });

    // Interaction State
    let mouseX = 0;
    let mouseY = 0;
    
    const onDocumentMouseMove = (event: MouseEvent) => {
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;
        // Map mouse to rotation angles
        mouseX = (event.clientX - windowHalfX) / windowHalfX;
        mouseY = (event.clientY - windowHalfY) / windowHalfY;
    };
    window.addEventListener('mousemove', onDocumentMouseMove);
    
    let targetScrollY = window.scrollY;
    let scrollY = window.scrollY;
    const onScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
        animationId = requestAnimationFrame(animate);
        const delta = clock.getDelta();
        const time = clock.getElapsedTime();

        // Update the robot's built-in animations (breathing, etc)
        if (mixer) {
            mixer.update(delta);
        }

        scrollY += (targetScrollY - scrollY) * 0.05;
        const scrollPhase = scrollY * 0.002; 

        if (robotModel) {
            // Make the entire robot model track your mouse smoothly
            // Add a base rotation (-0.5) so it naturally looks left towards your text
            const targetRotationY = -0.5 + (mouseX * 0.8); 
            const targetRotationX = mouseY * 0.3;
            
            robotModel.rotation.y += (targetRotationY - robotModel.rotation.y) * 0.1;
            robotModel.rotation.x += (targetRotationX - robotModel.rotation.x) * 0.1;

            // Pan and bob slightly on scroll
            // It starts at X = 2.5 (Right) when scrollY is 0.
            // As you scroll down, it gracefully floats across the screen to the Left side!
            robotModel.position.y = -3.0 + Math.sin(time * 2.0) * 0.1 + Math.sin(scrollPhase) * 1.5;
            robotModel.position.x = Math.cos(scrollPhase * 0.8) * 2.5;
        }

        renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
        if (!containerRef.current) return;
        width = containerRef.current.clientWidth;
        height = containerRef.current.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    };
    
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
        window.removeEventListener('mousemove', onDocumentMouseMove);
        window.removeEventListener('scroll', onScroll);
        resizeObserver.disconnect();
        cancelAnimationFrame(animationId);
        
        if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
        }
        renderer.dispose();
        pmremGenerator.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,240,255,0.05)_0%,_rgba(0,0,0,0)_60%)] pointer-events-none" />
      <div ref={containerRef} className="absolute inset-0 w-full h-full block will-change-transform" />
    </div>
  );
};

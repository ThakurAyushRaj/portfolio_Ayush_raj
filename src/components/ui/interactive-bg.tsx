import { useEffect, useRef } from 'react';

export function InteractiveBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    
    // Full screen grid size: 28 columns, 22 rows
    const cols = 28;
    const rows = 22;
    const focalLength = 400;

    // Handle Resize & DPI Scaling
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse Tracking Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      mouseRef.current.targetX = (e.clientX - width / 2) / (width / 2);
      mouseRef.current.targetY = (e.clientY - height / 2) / (height / 2);
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Clear canvas cleanly
      ctx.clearRect(0, 0, width, height);

      time += 0.35; // Speed of waves

      // Smooth mouse interpolation for parallax lag
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // 3D Parallax Rotation angles based on mouse position
      const cosY = Math.cos(mouse.x * 0.1);
      const sinY = Math.sin(mouse.x * 0.1);
      const cosX = Math.cos(mouse.y * 0.08);
      const sinX = Math.sin(mouse.y * 0.08);

      // Grid dimensions (covers the full screen + margin for rotation skew)
      const gridWidth = width * 1.5;
      const gridHeight = height * 1.5;
      const spacingX = gridWidth / (cols - 1);
      const spacingY = gridHeight / (rows - 1);

      // Calculate projected 2D coordinates for all grid points
      const points: { x: number; y: number; z: number; r: number; g: number; b: number; alpha: number; visible: boolean }[][] = [];

      for (let r = 0; r < rows; r++) {
        points[r] = [];

        for (let c = 0; c < cols; c++) {
          // Centered 3D grid layout spanning the full screen
          const baseX = -gridWidth / 2 + c * spacingX;
          const baseY = -gridHeight / 2 + r * spacingY;
          
          // Double sine wave equation to create a smooth, floating 3D fabric sheet
          const wave1 = Math.sin(baseX * 0.003 + time * 0.02) * Math.cos(baseY * 0.0035 + time * 0.015) * 45;
          const wave2 = Math.sin(baseX * 0.0015 - time * 0.01) * Math.sin(baseY * 0.002 + time * 0.02) * 20;
          const baseZ = wave1 + wave2;

          // Parallax rotations
          // Rotate Y (mouse horizontal)
          const rx1 = baseX * cosY - baseZ * sinY;
          const rz1 = baseZ * cosY + baseX * sinY;
          
          // Rotate X (mouse vertical)
          const ry2 = baseY * cosX - rz1 * sinX;
          const rz2 = rz1 * cosX + baseY * sinX;

          // Perspective Projection
          const scale = focalLength / (focalLength + rz2);
          
          if (scale <= 0) {
            points[r].push({ x: 0, y: 0, z: 0, r: 0, g: 0, b: 0, alpha: 0, visible: false });
            continue;
          }

          // Project to 2D Screen Space
          let screenX = rx1 * scale + width / 2;
          let screenY = ry2 * scale + height / 2;

          // Interactive Space-Time Warping (Magnetic distortion around cursor)
          let alphaBoost = 0;
          if (mouse.active) {
            const mouseX = (mouse.targetX * width / 2) + width / 2;
            const mouseY = (mouse.targetY * height / 2) + height / 2;
            
            const dx = screenX - mouseX;
            const dy = screenY - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 220 && dist > 0) {
              const force = (220 - dist) / 220;
              // Push grid vertices away radially from the cursor to create a bubble/warp effect
              screenX += (dx / dist) * force * 35;
              screenY += (dy / dist) * force * 35;
              
              // Make lines glow brighter around the mouse
              alphaBoost = force * 0.28;
            }
          }

          // Color Gradient: Blends from Cyan (left) to Indigo (right)
          const colorRatio = c / (cols - 1);
          const rColor = Math.round(34 + colorRatio * (99 - 34));
          const gColor = Math.round(211 + colorRatio * (102 - 211));
          const bColor = Math.round(238 + colorRatio * (241 - 238));

          // Depth-based fade (fades grid elements deeper in the background)
          const depthRatio = (rz2 + 100) / 450; // Map expected Z range
          const baseAlpha = Math.min(1.0, Math.max(0.0, 1.0 - depthRatio));
          
          // Calculate opacity: base depth opacity (2% to 15%) + mouse glow boost
          const alpha = baseAlpha * 0.15 + alphaBoost;

          points[r].push({
            x: screenX,
            y: screenY,
            z: rz2,
            r: rColor,
            g: gColor,
            b: bColor,
            alpha: Math.min(0.7, alpha), // Cap max opacity to 70%
            visible: true
          });
        }
      }

      // Draw Grid Lines (Horizontal and Vertical Mesh)
      ctx.lineWidth = 0.85;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p1 = points[r][c];
          if (!p1.visible) continue;

          // Connect Horizontally to the right neighbor
          if (c < cols - 1) {
            const p2 = points[r][c + 1];
            if (p2.visible) {
              const avgAlpha = (p1.alpha + p2.alpha) / 2;
              if (avgAlpha > 0.01) {
                ctx.strokeStyle = `rgba(${p1.r}, ${p1.g}, ${p1.b}, ${avgAlpha})`;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
              }
            }
          }

          // Connect Vertically to the bottom neighbor
          if (r < rows - 1) {
            const p2 = points[r + 1][c];
            if (p2.visible) {
              const avgAlpha = (p1.alpha + p2.alpha) / 2;
              if (avgAlpha > 0.01) {
                ctx.strokeStyle = `rgba(${p1.r}, ${p1.g}, ${p1.b}, ${avgAlpha})`;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
              }
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-transparent"
    />
  );
}

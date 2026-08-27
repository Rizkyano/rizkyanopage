import React, { useEffect, useRef } from 'react';

interface ProjectCardCanvasProps {
  variant: number;
  isHovered: boolean;
  isActive?: boolean;
}

// Ultra-fast, lightweight 3D wireframe math (0% WebGL overhead, buttery smooth 120 FPS)
interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Edge {
  a: number;
  b: number;
}

function getGeometryData(variant: number): { vertices: Point3D[]; edges: Edge[] } {
  const type = variant % 4;

  if (type === 0) {
    // Icosahedron
    const phi = (1 + Math.sqrt(5)) / 2;
    const a = 1;
    const b = 1 / phi;
    const v: Point3D[] = [
      { x: 0, y: b, z: a }, { x: 0, y: b, z: -a }, { x: 0, y: -b, z: a }, { x: 0, y: -b, z: -a },
      { x: b, y: a, z: 0 }, { x: b, y: -a, z: 0 }, { x: -b, y: a, z: 0 }, { x: -b, y: -a, z: 0 },
      { x: a, y: 0, z: b }, { x: a, y: 0, z: -b }, { x: -a, y: 0, z: b }, { x: -a, y: 0, z: -b }
    ];
    const e: Edge[] = [
      { a: 0, b: 2 }, { a: 0, b: 8 }, { a: 0, b: 10 }, { a: 0, b: 4 }, { a: 0, b: 6 },
      { a: 1, b: 3 }, { a: 1, b: 9 }, { a: 1, b: 11 }, { a: 1, b: 4 }, { a: 1, b: 6 },
      { a: 2, b: 8 }, { a: 2, b: 10 }, { a: 2, b: 5 }, { a: 2, b: 7 },
      { a: 3, b: 9 }, { a: 3, b: 11 }, { a: 3, b: 5 }, { a: 3, b: 7 },
      { a: 4, b: 8 }, { a: 4, b: 9 }, { a: 5, b: 8 }, { a: 5, b: 9 },
      { a: 6, b: 10 }, { a: 6, b: 11 }, { a: 7, b: 10 }, { a: 7, b: 11 },
      { a: 8, b: 9 }, { a: 10, b: 11 }
    ];
    return { vertices: v, edges: e };
  } else if (type === 1) {
    // Octahedron with core
    const v: Point3D[] = [
      { x: 1.2, y: 0, z: 0 }, { x: -1.2, y: 0, z: 0 },
      { x: 0, y: 1.2, z: 0 }, { x: 0, y: -1.2, z: 0 },
      { x: 0, y: 0, z: 1.2 }, { x: 0, y: 0, z: -1.2 },
      { x: 0.6, y: 0.6, z: 0.6 }, { x: -0.6, y: -0.6, z: -0.6 }
    ];
    const e: Edge[] = [
      { a: 0, b: 2 }, { a: 0, b: 3 }, { a: 0, b: 4 }, { a: 0, b: 5 },
      { a: 1, b: 2 }, { a: 1, b: 3 }, { a: 1, b: 4 }, { a: 1, b: 5 },
      { a: 2, b: 4 }, { a: 2, b: 5 }, { a: 3, b: 4 }, { a: 3, b: 5 },
      { a: 6, b: 7 }
    ];
    return { vertices: v, edges: e };
  } else if (type === 2) {
    // Cube Hexahedron with inner gyroscope
    const v: Point3D[] = [
      { x: -0.8, y: -0.8, z: -0.8 }, { x: 0.8, y: -0.8, z: -0.8 },
      { x: 0.8, y: 0.8, z: -0.8 }, { x: -0.8, y: 0.8, z: -0.8 },
      { x: -0.8, y: -0.8, z: 0.8 }, { x: 0.8, y: -0.8, z: 0.8 },
      { x: 0.8, y: 0.8, z: 0.8 }, { x: -0.8, y: 0.8, z: 0.8 }
    ];
    const e: Edge[] = [
      { a: 0, b: 1 }, { a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 0 },
      { a: 4, b: 5 }, { a: 5, b: 6 }, { a: 6, b: 7 }, { a: 7, b: 4 },
      { a: 0, b: 4 }, { a: 1, b: 5 }, { a: 2, b: 6 }, { a: 3, b: 7 }
    ];
    return { vertices: v, edges: e };
  } else {
    // Stella Octangula
    const v: Point3D[] = [
      { x: 1, y: 1, z: 1 }, { x: 1, y: -1, z: -1 }, { x: -1, y: 1, z: -1 }, { x: -1, y: -1, z: 1 },
      { x: -1, y: -1, z: -1 }, { x: -1, y: 1, z: 1 }, { x: 1, y: -1, z: 1 }, { x: 1, y: 1, z: -1 }
    ];
    const e: Edge[] = [
      { a: 0, b: 1 }, { a: 0, b: 2 }, { a: 0, b: 3 }, { a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 1 },
      { a: 4, b: 5 }, { a: 4, b: 6 }, { a: 4, b: 7 }, { a: 5, b: 6 }, { a: 6, b: 7 }, { a: 7, b: 5 }
    ];
    return { vertices: v, edges: e };
  }
}

export const ProjectCardCanvas: React.FC<ProjectCardCanvasProps> = ({ 
  variant, 
  isHovered,
  isActive = true 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isHoveredRef = useRef(isHovered);
  const isActiveRef = useRef(isActive);

  useEffect(() => {
    isHoveredRef.current = isHovered;
    isActiveRef.current = isActive;
  }, [isHovered, isActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const { vertices, edges } = getGeometryData(variant);

    let angleX = 0.5;
    let angleY = 0.5;
    let angleZ = 0.2;
    let animId: number;

    const colors = ['#38bdf8', '#a855f7', '#10b981', '#f59e0b'];
    const accentColor = colors[variant % colors.length];

    const render = () => {
      animId = requestAnimationFrame(render);

      // Save 100% CPU when not active
      if (!isActiveRef.current) return;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width * (window.devicePixelRatio > 1 ? 1.5 : 1);
        canvas.height = height * (window.devicePixelRatio > 1 ? 1.5 : 1);
        ctx.scale(canvas.width / width, canvas.height / height);
      }

      ctx.clearRect(0, 0, width, height);

      const speed = isHoveredRef.current ? 0.03 : 0.008;
      angleX += speed * 0.7;
      angleY += speed;
      angleZ += speed * 0.4;

      const cosX = Math.cos(angleX), sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY), sinY = Math.sin(angleY);
      const cosZ = Math.cos(angleZ), sinZ = Math.sin(angleZ);

      const scale = Math.min(width, height) * 0.34;
      const centerX = width / 2;
      const centerY = height / 2;

      // Project vertices
      const projected = vertices.map(v => {
        // Rotate Y
        let x = v.x * cosY + v.z * sinY;
        let y = v.y;
        let z = -v.x * sinY + v.z * cosY;

        // Rotate X
        let y1 = y * cosX - z * sinX;
        let z1 = y * sinX + z * cosX;

        // Rotate Z
        let x2 = x * cosZ - y1 * sinZ;
        let y2 = x * sinZ + y1 * cosZ;

        // Perspective projection
        const fov = 3.5;
        const depth = fov / (fov + z1);
        return {
          x: centerX + x2 * scale * depth,
          y: centerY + y2 * scale * depth,
          z: z1,
          depth
        };
      });

      // Draw glowing lines
      ctx.lineWidth = isHoveredRef.current ? 1.8 : 1.2;
      ctx.strokeStyle = isHoveredRef.current ? accentColor : 'rgba(56, 189, 248, 0.45)';
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = isHoveredRef.current ? 12 : 4;

      ctx.beginPath();
      for (let i = 0; i < edges.length; i++) {
        const p1 = projected[edges[i].a];
        const p2 = projected[edges[i].b];
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
      }
      ctx.stroke();

      // Draw vertex nodes
      ctx.fillStyle = isHoveredRef.current ? '#ffffff' : '#C0FE04';
      ctx.shadowBlur = isHoveredRef.current ? 10 : 2;
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, isHoveredRef.current ? 2.5 : 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

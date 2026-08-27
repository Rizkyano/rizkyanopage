import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface WebGLCanvasProps {
  theme: 'dark' | 'light';
}

export const WebGLCanvas: React.FC<WebGLCanvasProps> = ({ theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      50
    );
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
      precision: 'mediump',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(1.0);
    container.appendChild(renderer.domElement);

    const isLight = theme === 'light';

    // Optimized Clean Holographic Glass Shader (No noisy floating particle dots)
    const glassVertexShader = `
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const glassFragmentShader = `
      uniform float u_time;
      uniform float u_opacity;
      uniform float u_isLight;
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        if (u_opacity < 0.01) discard;

        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);

        float fresnel = pow(1.0 - max(0.0, dot(viewDir, normal)), 2.2);
        
        float t = normal.x * 0.4 + normal.y * 0.4 + u_time * 0.3 + fresnel * 0.7;
        vec3 rainbow = 0.5 + 0.5 * cos(6.28318 * (vec3(1.0, 1.0, 1.0) * t + vec3(0.0, 0.33, 0.67)));

        vec3 neonCyan = u_isLight > 0.5 ? vec3(0.0, 0.65, 0.95) : vec3(0.0, 0.95, 1.0);
        vec3 neonLime = u_isLight > 0.5 ? vec3(0.1, 0.75, 0.35) : vec3(0.75, 1.0, 0.0);
        vec3 glow = mix(neonCyan, neonLime, fresnel);

        vec3 finalColor = rainbow * (u_isLight > 0.5 ? 0.95 : 0.8) + glow * (fresnel * (u_isLight > 0.5 ? 1.8 : 1.5));
        float alpha = (u_isLight > 0.5 ? 0.82 : 0.65 + fresnel * 0.3) * u_opacity;

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    const uniforms = {
      u_time: { value: 0 },
      u_opacity: { value: 1.0 },
      u_isLight: { value: isLight ? 1.0 : 0.0 },
    };

    const glassMaterial = new THREE.ShaderMaterial({
      vertexShader: glassVertexShader,
      fragmentShader: glassFragmentShader,
      uniforms,
      transparent: true,
      side: THREE.DoubleSide
    });

    const group = new THREE.Group();
    scene.add(group);

    // Clean Pristine 3D Torus Knot (No stray particle dots or circles)
    const knotGeometry = new THREE.TorusKnotGeometry(1.2, 0.38, 64, 16, 2, 3);
    const knotMesh = new THREE.Mesh(knotGeometry, glassMaterial);
    group.add(knotMesh);

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    let targetOpacity = 1.0;
    let currentOpacity = 1.0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const fadeThreshold = window.innerHeight * 0.5;
      targetOpacity = Math.max(0, Math.min(1, 1 - currentScroll / fadeThreshold));
    };

    const handleResize = () => {
      if (!renderer || !container) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    let animId: number;

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);

      currentOpacity += (targetOpacity - currentOpacity) * 0.1;
      uniforms.u_opacity.value = currentOpacity;

      if (currentOpacity < 0.005) return;

      const elapsedTime = time * 0.001;
      uniforms.u_time.value = elapsedTime;

      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      const isDesktop = window.innerWidth > 1024;
      const targetX = (isDesktop ? 1.95 : 0.0) + currentMouseX * 0.25;
      const targetY = 0.0 + currentMouseY * 0.25;

      group.position.x = targetX;
      group.position.y = targetY;

      const baseScale = isDesktop ? 1.05 : 0.85;
      const currentScale = baseScale * Math.max(0.01, currentOpacity);
      group.scale.set(currentScale, currentScale, currentScale);

      group.rotation.x = elapsedTime * 0.25 + currentMouseY * 0.4;
      group.rotation.y = elapsedTime * 0.35 + currentMouseX * 0.4;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      knotGeometry.dispose();
      glassMaterial.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.95 }}
    />
  );
};

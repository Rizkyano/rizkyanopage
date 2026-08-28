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

    // Holographic Iridescent Glass Shader (Restored with Vibrantly Shimmering Cyber Colors)
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
      side: THREE.DoubleSide,
    });

    // 2. Crystal-Clear Glossy Glass Material for the Hourglass Bulb (Matching Reference Image)
    const hourglassGlassVertexShader = `
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const hourglassGlassFragmentShader = `
      uniform float u_opacity;
      uniform float u_isLight;
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        if (u_opacity < 0.01) discard;

        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);

        // Sharp glossy crystal specular reflection & edge fresnel
        float fresnel = pow(1.0 - max(0.0, dot(viewDir, normal)), 2.4);
        
        vec3 lightDir = normalize(vec3(0.6, 0.8, 1.0));
        vec3 halfVec = normalize(lightDir + viewDir);
        float spec = pow(max(0.0, dot(normal, halfVec)), 32.0) * 0.9;

        vec3 glassColor = vec3(1.0, 1.0, 1.0) * (fresnel * 0.65 + spec);
        float alpha = (fresnel * 0.50 + spec * 0.8 + 0.08) * u_opacity;

        gl_FragColor = vec4(glassColor, alpha);
      }
    `;

    const hourglassUniforms = {
      u_opacity: { value: 1.0 },
      u_isLight: { value: isLight ? 1.0 : 0.0 },
    };

    const hourglassGlassMaterial = new THREE.ShaderMaterial({
      vertexShader: hourglassGlassVertexShader,
      fragmentShader: hourglassGlassFragmentShader,
      uniforms: hourglassUniforms,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const group = new THREE.Group();
    scene.add(group);

    // Track all geometries and materials for cleanup
    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const materialsToDispose: THREE.Material[] = [glassMaterial, hourglassGlassMaterial];

    // 1. Outer Holographic Iridescent Glass Sphere / Orb with Gyroscope Rings
    const sphereGeom = new THREE.SphereGeometry(1.65, 48, 48);
    geometriesToDispose.push(sphereGeom);
    const sphereMesh = new THREE.Mesh(sphereGeom, glassMaterial);
    group.add(sphereMesh);

    // Outer Celestial Gyroscope Ring 1
    const ring1Geom = new THREE.TorusGeometry(1.85, 0.028, 16, 80);
    geometriesToDispose.push(ring1Geom);
    const ring1Mesh = new THREE.Mesh(ring1Geom, glassMaterial);
    ring1Mesh.rotation.x = Math.PI / 3;
    group.add(ring1Mesh);

    // Outer Celestial Gyroscope Ring 2
    const ring2Geom = new THREE.TorusGeometry(1.95, 0.02, 16, 80);
    geometriesToDispose.push(ring2Geom);
    const ring2Mesh = new THREE.Mesh(ring2Geom, glassMaterial);
    ring2Mesh.rotation.y = Math.PI / 4;
    ring2Mesh.rotation.x = -Math.PI / 6;
    group.add(ring2Mesh);

    // 2. Classical Hourglass Group (Faithful Reproduction of Reference Image)
    const hourglassGroup = new THREE.Group();
    group.add(hourglassGroup);

    // Golden Brass Materials for Pedestals (Matching "FUGIT IRREPARABILE TEMPUS" Brass Caps)
    const brassMainMaterial = new THREE.MeshStandardMaterial({
      color: 0xcda145,
      metalness: 0.85,
      roughness: 0.22,
    });
    materialsToDispose.push(brassMainMaterial);

    const brassBevelMaterial = new THREE.MeshStandardMaterial({
      color: 0x8a621c,
      metalness: 0.75,
      roughness: 0.38,
    });
    materialsToDispose.push(brassBevelMaterial);

    // Natural Amber / Golden Ochre Sand Material (Matching Reference Image)
    const sandMaterial = new THREE.MeshStandardMaterial({
      color: 0xdfa74b,
      emissive: 0xb87e22,
      emissiveIntensity: isLight ? 0.35 : 0.6,
      roughness: 0.65,
      metalness: 0.1,
    });
    materialsToDispose.push(sandMaterial);

    // High-Precision Classical Glass Bulb Contour via LatheGeometry (Smooth Curves)
    const lathePoints: THREE.Vector2[] = [];
    const curveHeights = [
      { y: 0.90, r: 0.64 },
      { y: 0.86, r: 0.70 },
      { y: 0.76, r: 0.78 },
      { y: 0.60, r: 0.76 },
      { y: 0.42, r: 0.62 },
      { y: 0.24, r: 0.38 },
      { y: 0.10, r: 0.17 },
      { y: 0.03, r: 0.09 },
      { y: 0.00, r: 0.075 }, // Pinched neck orifice
      { y: -0.03, r: 0.09 },
      { y: -0.10, r: 0.17 },
      { y: -0.24, r: 0.38 },
      { y: -0.42, r: 0.62 },
      { y: -0.60, r: 0.76 },
      { y: -0.76, r: 0.78 },
      { y: -0.86, r: 0.70 },
      { y: -0.90, r: 0.64 },
    ];

    curveHeights.forEach((pt) => {
      lathePoints.push(new THREE.Vector2(pt.r, pt.y));
    });

    const glassBodyGeom = new THREE.LatheGeometry(lathePoints, 64);
    geometriesToDispose.push(glassBodyGeom);
    const glassBodyMesh = new THREE.Mesh(glassBodyGeom, hourglassGlassMaterial);
    hourglassGroup.add(glassBodyMesh);

    // Top Brass Pedestal Cap (Double-Tiered Circular Brass Plate)
    const topBaseGroup = new THREE.Group();
    topBaseGroup.position.set(0, 0.94, 0);
    hourglassGroup.add(topBaseGroup);

    const plate1Geom = new THREE.CylinderGeometry(0.82, 0.86, 0.09, 48);
    geometriesToDispose.push(plate1Geom);
    const plate1 = new THREE.Mesh(plate1Geom, brassMainMaterial);
    topBaseGroup.add(plate1);

    const plate2Geom = new THREE.CylinderGeometry(0.74, 0.82, 0.05, 48);
    geometriesToDispose.push(plate2Geom);
    const plate2 = new THREE.Mesh(plate2Geom, brassBevelMaterial);
    plate2.position.set(0, -0.06, 0);
    topBaseGroup.add(plate2);

    // Bottom Brass Pedestal Cap (Matching Double-Tiered Base)
    const bottomBaseGroup = new THREE.Group();
    bottomBaseGroup.position.set(0, -0.94, 0);
    hourglassGroup.add(bottomBaseGroup);

    const bPlate1Geom = new THREE.CylinderGeometry(0.86, 0.82, 0.09, 48);
    geometriesToDispose.push(bPlate1Geom);
    const bPlate1 = new THREE.Mesh(bPlate1Geom, brassMainMaterial);
    bottomBaseGroup.add(bPlate1);

    const bPlate2Geom = new THREE.CylinderGeometry(0.82, 0.74, 0.05, 48);
    geometriesToDispose.push(bPlate2Geom);
    const bPlate2 = new THREE.Mesh(bPlate2Geom, brassBevelMaterial);
    bPlate2.position.set(0, 0.06, 0);
    bottomBaseGroup.add(bPlate2);

    // Top Sand (Inside Upper Glass Bulb)
    const topSandGeom = new THREE.ConeGeometry(0.60, 0.44, 36);
    geometriesToDispose.push(topSandGeom);
    const topSandMesh = new THREE.Mesh(topSandGeom, sandMaterial);
    topSandMesh.rotation.x = Math.PI; // Funnel downwards
    topSandMesh.position.set(0, 0.36, 0);
    hourglassGroup.add(topSandMesh);

    // Falling Sand Stream through Narrow Center Neck
    const sandStreamGeom = new THREE.CylinderGeometry(0.015, 0.015, 0.82, 16);
    geometriesToDispose.push(sandStreamGeom);
    const sandStreamMesh = new THREE.Mesh(sandStreamGeom, sandMaterial);
    sandStreamMesh.position.set(0, -0.06, 0);
    hourglassGroup.add(sandStreamMesh);

    // Bottom Sand Pile (Inside Lower Glass Bulb - Conical Dune)
    const bottomSandGeom = new THREE.ConeGeometry(0.68, 0.54, 36);
    geometriesToDispose.push(bottomSandGeom);
    const bottomSandMesh = new THREE.Mesh(bottomSandGeom, sandMaterial);
    bottomSandMesh.position.set(0, -0.62, 0);
    hourglassGroup.add(bottomSandMesh);

    // Realistic Scene Lighting for Brass & Crystal Glass
    const ambientLight = new THREE.AmbientLight(0xffffff, isLight ? 1.4 : 1.0);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight1.position.set(4, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight2.position.set(-4, -2, 3);
    scene.add(dirLight2);

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
      const heroFadeThreshold = window.innerHeight * 0.55;

      // 1. Hero Opacity: 1 at top, fades out past hero
      const heroOpacity = Math.max(0, Math.min(1, 1 - currentScroll / heroFadeThreshold));

      // 2. Contact Footer Opacity: Reappears when user scrolls to Contact section
      const contactEl = document.getElementById('contact');
      let footerOpacity = 0;
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight) {
          const visibleAmount = windowHeight - rect.top;
          footerOpacity = Math.max(0, Math.min(1, visibleAmount / 220));
        }
      }

      targetOpacity = Math.max(heroOpacity, footerOpacity);
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

      currentOpacity += (targetOpacity - currentOpacity) * 0.08;
      uniforms.u_opacity.value = currentOpacity;
      hourglassUniforms.u_opacity.value = currentOpacity;

      if (currentOpacity < 0.005) return;

      const elapsedTime = time * 0.001;
      uniforms.u_time.value = elapsedTime;

      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      const isDesktop = window.innerWidth > 1024;
      const targetX = (isDesktop ? 1.85 : 0.0) + currentMouseX * 0.25;
      const targetY = 0.0 + currentMouseY * 0.25;

      group.position.x = targetX;
      group.position.y = targetY;

      const baseScale = isDesktop ? 1.05 : 0.82;
      const currentScale = baseScale * Math.max(0.01, currentOpacity);
      group.scale.set(currentScale, currentScale, currentScale);

      // Rotating Outer Holographic Sphere & Celestial Rings
      sphereMesh.rotation.y = elapsedTime * 0.2;
      sphereMesh.rotation.x = elapsedTime * 0.12;

      ring1Mesh.rotation.z = elapsedTime * 0.45;
      ring2Mesh.rotation.x = -elapsedTime * 0.35;
      ring2Mesh.rotation.y = elapsedTime * 0.25;

      // Floating & Spinning Inner Classical Hourglass
      hourglassGroup.rotation.y = elapsedTime * 0.55 + currentMouseX * 0.45;
      hourglassGroup.rotation.x = Math.sin(elapsedTime * 0.7) * 0.12 + currentMouseY * 0.35;
      hourglassGroup.rotation.z = Math.cos(elapsedTime * 0.7) * 0.06;

      // Subtle pulse on flowing sand stream
      sandStreamMesh.scale.x = 1.0 + Math.sin(elapsedTime * 9.0) * 0.18;
      sandStreamMesh.scale.z = 1.0 + Math.sin(elapsedTime * 9.0) * 0.18;

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
      geometriesToDispose.forEach((geom) => geom.dispose());
      materialsToDispose.forEach((mat) => mat.dispose());
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

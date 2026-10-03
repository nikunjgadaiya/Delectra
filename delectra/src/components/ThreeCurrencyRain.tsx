import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

interface ThreeCurrencyRainProps {
  scrollVelocityRef: React.MutableRefObject<number>;
  scrollProgressRef: React.MutableRefObject<number>;
}

export default function ThreeCurrencyRain({ scrollVelocityRef, scrollProgressRef }: ThreeCurrencyRainProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const isMobile = window.innerWidth < 768;
    const symbolCount = isMobile ? 14 : 32;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog('#07060b', 3, 11);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 50);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });

    const pixelRatio = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(5, 12, 6);
    scene.add(dirLight);

    const greenPointLight = new THREE.PointLight(new THREE.Color('#2bd96b'), 3.5, 30);
    greenPointLight.position.set(0, 3, 4);
    scene.add(greenPointLight);

    // Material
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2bd96b'),
      metalness: 0.88,
      roughness: 0.2,
      emissive: new THREE.Color('#0d4621'),
      emissiveIntensity: 0.35,
    });

    // Create extruded geometries from SVG paths for $ and ₹
    const loader = new SVGLoader();

    const dollarSvg = `
      <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
        <path d="M43,5 L57,5 L57,18 C72,20 81,30 81,42 L65,42 C65,34 59,29 50,29 C40,29 35,34 35,40 C35,48 42,51 56,55 C73,60 81,68 81,79 C81,91 72,101 57,103 L57,115 L43,115 L43,103 C28,100 19,90 19,76 L35,76 C35,86 42,91 50,91 C60,91 66,86 66,79 C66,71 58,67 44,63 C27,58 19,50 19,39 C19,27 28,18 43,16 Z"/>
      </svg>
    `;

    const rupeeSvg = `
      <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
        <path d="M22,15 L78,15 L78,27 L53,27 C63,32 68,40 68,51 L78,51 L78,63 L67,63 C63,80 48,93 25,96 L25,84 C40,81 51,72 52,63 L22,63 L22,51 L52,51 C51,38 41,27 26,27 L22,27 Z M45,63 L80,115 L62,115 L32,68 Z"/>
      </svg>
    `;

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 6,
      bevelEnabled: true,
      bevelThickness: 1.5,
      bevelSize: 1.2,
      bevelSegments: 3,
      steps: 1,
    };

    const dData = loader.parse(dollarSvg);
    const rData = loader.parse(rupeeSvg);

    const dShapes = SVGLoader.createShapes(dData.paths[0]);
    const rShapes = SVGLoader.createShapes(rData.paths[0]);

    const dGeom = new THREE.ExtrudeGeometry(dShapes, extrudeSettings);
    dGeom.center();
    dGeom.scale(0.012, -0.012, 0.012);
    dGeom.center();

    const rGeom = new THREE.ExtrudeGeometry(rShapes, extrudeSettings);
    rGeom.center();
    rGeom.scale(0.012, -0.012, 0.012);
    rGeom.center();

    // Create raining items
    interface FallingItem {
      mesh: THREE.Mesh;
      baseSpeed: number;
      baseSpin: number;
      tiltX: number;
      tiltZ: number;
      wobbleSpeed: number;
      timeOffset: number;
    }

    const items: FallingItem[] = [];
    const topY = 7.5;
    const bottomY = -7.5;
    const spawnWidth = isMobile ? 6 : 14;

    for (let i = 0; i < symbolCount; i++) {
      const isDollar = i % 2 === 0;
      const geom = isDollar ? dGeom : rGeom;
      const mesh = new THREE.Mesh(geom, material);

      const x = THREE.MathUtils.randFloat(-spawnWidth / 2, spawnWidth / 2);
      const y = THREE.MathUtils.randFloat(bottomY, topY);
      const z = THREE.MathUtils.randFloat(-7, 1);

      mesh.position.set(x, y, z);
      const scale = THREE.MathUtils.randFloat(0.65, 1.1);
      mesh.scale.set(scale, scale, scale);

      scene.add(mesh);

      items.push({
        mesh,
        baseSpeed: THREE.MathUtils.randFloat(0.8, 1.8),
        baseSpin: THREE.MathUtils.randFloat(0.8, 2.2) * (Math.random() > 0.5 ? 1 : -1),
        tiltX: THREE.MathUtils.randFloat(-0.25, 0.25),
        tiltZ: THREE.MathUtils.randFloat(-0.2, 0.2),
        wobbleSpeed: THREE.MathUtils.randFloat(1.5, 3.0),
        timeOffset: Math.random() * Math.PI * 2,
      });
    }

    // Pointer parallax
    let pointerX = 0;
    let pointerY = 0;
    const handlePointerMove = (e: PointerEvent) => {
      pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();
    let currentVelocityBoost = 0;
    let currentOpacity = 0.9;

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const time = now / 1000;

      // Scroll velocity influence
      const rawVelocity = Math.abs(scrollVelocityRef.current || 0);
      const targetBoost = prefersReducedMotion ? 0 : Math.min(rawVelocity * 0.08, 15);
      currentVelocityBoost += (targetBoost - currentVelocityBoost) * 0.1;

      // Global opacity calculation according to scroll position:
      // ~90% in hero (progress 0 to ~0.15)
      // ~45% behind text sections (progress 0.15 to ~0.75)
      // ~85% at contact section (progress 0.75 to 1.0)
      const p = Math.max(0, Math.min(1, scrollProgressRef.current || 0));
      let targetOpacity = 0.9;
      if (p < 0.15) {
        targetOpacity = 0.9 - (p / 0.15) * 0.45; // 0.90 -> 0.45
      } else if (p < 0.75) {
        targetOpacity = 0.45;
      } else {
        const contactP = (p - 0.75) / 0.25;
        targetOpacity = 0.45 + contactP * 0.4; // 0.45 -> 0.85
      }

      currentOpacity += (targetOpacity - currentOpacity) * 0.08;
      if (canvasRef.current) {
        canvasRef.current.style.opacity = currentOpacity.toFixed(3);
      }

      // Parallax camera easing
      const targetCamX = prefersReducedMotion ? 0 : pointerX * 0.45;
      const targetCamY = prefersReducedMotion ? 0 : -pointerY * 0.3;
      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Point light slight oscillation
      greenPointLight.position.x = Math.sin(time * 0.8) * 2;
      greenPointLight.position.y = 2 + Math.cos(time * 0.6) * 1.5;

      // Update symbols
      for (const item of items) {
        const speed = (item.baseSpeed + currentVelocityBoost * 0.45) * dt;
        item.mesh.position.y -= speed;

        const spin = (item.baseSpin + (item.baseSpin > 0 ? 1 : -1) * currentVelocityBoost * 0.3) * dt;
        item.mesh.rotation.y += spin;

        item.mesh.rotation.x = item.tiltX + Math.sin(time * item.wobbleSpeed + item.timeOffset) * 0.12;
        item.mesh.rotation.z = item.tiltZ + Math.cos(time * item.wobbleSpeed * 0.8 + item.timeOffset) * 0.08;

        // Respawn when leaving bottom
        if (item.mesh.position.y < bottomY) {
          item.mesh.position.y = topY + THREE.MathUtils.randFloat(0, 1.5);
          item.mesh.position.x = THREE.MathUtils.randFloat(-spawnWidth / 2, spawnWidth / 2);
          item.mesh.position.z = THREE.MathUtils.randFloat(-7, 1);
        }
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      dGeom.dispose();
      rGeom.dispose();
      material.dispose();
    };
  }, [scrollVelocityRef, scrollProgressRef]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="w-full h-full block transition-opacity duration-300"
        style={{ opacity: 0.9 }}
      />
    </div>
  );
}

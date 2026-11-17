import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RotateCw, RotateCcw, Pause, Sparkles, PenLine, Award } from 'lucide-react';

interface Showcase3DProps {
  onOpenEngraving?: () => void;
  className?: string;
}

export function Showcase3D({ onOpenEngraving, className = '' }: Showcase3DProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const [rotationDeg, setRotationDeg] = useState(0);
  const [isLoadingModel, setIsLoadingModel] = useState(true);

  // References to keep Three.js instances accessible across renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const isAutoSpinningRef = useRef(true);
  isAutoSpinningRef.current = isAutoSpinning;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 450;

    // 1. Scene & Camera setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.25, 5.8);
    camera.lookAt(0, 0.05, 0);
    cameraRef.current = camera;

    // 2. High-Performance PBR WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 3. Studio Specular & Dramatic Lighting
    const ambLight = new THREE.AmbientLight(0xfff8f0, 1.3);
    scene.add(ambLight);

    // Key Light (Warm golden front-right)
    const keyLight = new THREE.DirectionalLight(0xfffaed, 3.8);
    keyLight.position.set(4.5, 5.5, 4.5);
    scene.add(keyLight);

    // Fill Light (Soft cool front-left)
    const fillLight = new THREE.DirectionalLight(0xffffff, 2.2);
    fillLight.position.set(-4.5, 3.0, 3.5);
    scene.add(fillLight);

    // Rim Light (YSL Gala Crimson glow from behind)
    const rimLight = new THREE.DirectionalLight(0xff1744, 3.2);
    rimLight.position.set(-3.5, -1.0, -4.0);
    scene.add(rimLight);

    // Top Specular Point Light (Brilliant gold highlights)
    const topLight = new THREE.PointLight(0xffe680, 4.5, 16);
    topLight.position.set(0, 3.5, 2.2);
    scene.add(topLight);

    // 4. Master 3D Group (rotates on drag & auto-spin)
    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    // 5. Luxury Lacquered Pedestal with Gold Rim
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.y = -1.65;

    // Black lacquer circular base
    const baseGeo = new THREE.CylinderGeometry(1.9, 2.1, 0.18, 48);
    const baseMat = new THREE.MeshPhysicalMaterial({
      color: 0x090103,
      metalness: 0.2,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.9,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    pedestalGroup.add(baseMesh);

    // Outer 24K Gold Beveled Ring
    const goldRingGeo = new THREE.TorusGeometry(1.92, 0.04, 16, 64);
    const imperialGoldMat = new THREE.MeshStandardMaterial({
      color: 0xffdf78,
      metalness: 0.96,
      roughness: 0.15,
      emissive: 0x473200,
    });
    const goldRingMesh = new THREE.Mesh(goldRingGeo, imperialGoldMat);
    goldRingMesh.rotation.x = Math.PI / 2;
    goldRingMesh.position.y = 0.09;
    pedestalGroup.add(goldRingMesh);

    group.add(pedestalGroup);

    // 6. Orbiting Cassandre Halo Ring
    const haloGeo = new THREE.TorusGeometry(2.1, 0.03, 16, 80);
    const haloMesh = new THREE.Mesh(haloGeo, imperialGoldMat);
    haloMesh.rotation.x = 1.15;
    haloMesh.rotation.y = 0.45;
    haloMesh.position.y = 0.1;
    group.add(haloMesh);

    // 7. Floating Golden Particle Stardust
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 5.2;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 4.8;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 4.2;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffd700,
      size: 0.035,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    group.add(particlePoints);

    // 8. Load the Official 3D YSL Model from yves-saint-laurent.glb
    const loader = new GLTFLoader();
    loader.load(
      '/models/yves-saint-laurent.glb',
      (gltf) => {
        const model = gltf.scene;

        // Auto-center and normalize size
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 3.35 / (maxDim || 1);

        model.scale.set(targetScale, targetScale, targetScale);
        model.position.x = -center.x * targetScale;
        model.position.y = -center.y * targetScale + 0.15;
        model.position.z = -center.z * targetScale;

        // Apply luxury 24K Polished Gold PBR Material
        const luxuryGoldMat = new THREE.MeshPhysicalMaterial({
          color: 0xffdf78,
          emissive: 0x3d2800,
          emissiveIntensity: 0.18,
          metalness: 0.96,
          roughness: 0.14,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
          reflectivity: 1.0,
        });

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.material = luxuryGoldMat;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });

        group.add(model);
        setIsLoadingModel(false);
      },
      undefined,
      (error) => {
        console.error('Failed to load yves-saint-laurent.glb:', error);
        setIsLoadingModel(false);
      }
    );

    // 9. Interactive Drag Orbit Handling
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let velX = 0;
    let velY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
      velX = 0;
      velY = 0;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !group) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;

      velX = deltaX * 0.007;
      velY = deltaY * 0.005;

      group.rotation.y += velX;
      group.rotation.x = Math.max(-0.4, Math.min(0.45, group.rotation.x + velY));

      prevMouseX = clientX;
      prevMouseY = clientY;

      const deg = Math.round(((group.rotation.y % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) * (180 / Math.PI));
      setRotationDeg(deg);
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    dom.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // 10. Responsive Canvas Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // 11. Animation Render Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Inertia drag damping
      if (!isDragging) {
        velX *= 0.94;
        velY *= 0.94;
        group.rotation.y += velX;
        group.rotation.x += velY;

        // Auto spin if enabled
        if (isAutoSpinningRef.current && Math.abs(velX) < 0.0005) {
          group.rotation.y += 0.008;
          const deg = Math.round(
            (((group.rotation.y % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) * (180 / Math.PI)
          );
          setRotationDeg(deg);
        }
      }

      // Gentle floating levitation effect
      group.position.y = Math.sin(elapsed * 1.5) * 0.06;

      // Halo ring rotation
      haloMesh.rotation.z = elapsed * 0.25;

      // Gentle stardust sparkle shimmer
      particlePoints.rotation.y = elapsed * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // 12. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      dom.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', handleResize);

      scene.clear();
      renderer.dispose();
      if (dom.parentNode) {
        dom.parentNode.removeChild(dom);
      }
    };
  }, []);

  const handleResetOrbit = () => {
    if (groupRef.current) {
      groupRef.current.rotation.set(0, 0, 0);
    }
    setIsAutoSpinning(true);
    setRotationDeg(0);
  };

  const handleToggleSpin = () => {
    setIsAutoSpinning((prev) => !prev);
  };

  const handleSliderChange = (deg: number) => {
    setIsAutoSpinning(false);
    setRotationDeg(deg);
    if (groupRef.current) {
      groupRef.current.rotation.y = (deg / 180) * Math.PI;
    }
  };

  return (
    <div
      className={`relative w-full h-[380px] sm:h-[430px] lg:h-[470px] rounded-sm overflow-hidden bg-gradient-to-b from-[#180104] via-[#240106] to-[#120103] border border-white/25 shadow-[0_24px_60px_rgba(0,0,0,0.85)] group select-none ${className}`}
    >
      {/* Three.js Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full absolute inset-0 bg-transparent cursor-grab active:cursor-grabbing"
      />

      {/* Loading Indicator */}
      {isLoadingModel && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#100104]/80 backdrop-blur-sm pointer-events-none">
          <Sparkles className="w-8 h-8 text-[#d4af37] animate-spin" style={{ animationDuration: '3s' }} />
          <span className="mt-2 text-xs font-medium tracking-widest text-[#d4af37] uppercase">
            Đang tải mô hình 3D YSL...
          </span>
        </div>
      )}

      {/* Top Left HUD: 3D Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
        <div className="px-3 py-1 bg-[#140103]/90 border border-[#d4af37]/40 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase flex items-center gap-2 rounded-sm shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
          <span>3D YSL CASSANDRE VIEWPORT</span>
        </div>
        <div className="hidden sm:inline-flex px-2.5 py-1 bg-[#3a0208]/80 border border-white/20 backdrop-blur-md text-[#d0c5af] text-[10.5px] font-mono tracking-wider rounded-sm">
          GLB REAL-TIME • 60 FPS
        </div>
      </div>

      {/* Top Right HUD: Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={handleResetOrbit}
          title="Đặt lại góc nhìn mặc định"
          className="px-2.5 sm:px-3 py-1.5 bg-[#140103]/90 hover:bg-[#2b0106] border border-white/30 backdrop-blur-md text-white text-[10.5px] sm:text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-md rounded-sm cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="hidden sm:inline">RESET</span>
        </button>

        <button
          type="button"
          onClick={handleToggleSpin}
          className="px-3 py-1.5 bg-white hover:bg-slate-100 text-[#110103] text-[10.5px] sm:text-[11px] uppercase tracking-wider font-bold flex items-center gap-1.5 transition-colors shadow-md rounded-sm cursor-pointer border border-white/50"
        >
          {isAutoSpinning ? (
            <>
              <Pause className="w-3.5 h-3.5 text-[#110103]" />
              <span>TẠM DỪNG</span>
            </>
          ) : (
            <>
              <RotateCw className="w-3.5 h-3.5 text-[#110103]" />
              <span>XOAY 360°</span>
            </>
          )}
        </button>
      </div>

      {/* Bottom HUD: Rotation Angle & Direct Engraving Link */}
      <div className="absolute bottom-3 left-3 right-3 z-20 p-2.5 sm:p-3 bg-[#1a0104]/90 border border-white/25 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 shadow-xl rounded-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shrink-0 text-[#d4af37]">
            <Award className="w-3.5 h-3.5" />
          </div>
          <div className="hidden sm:block">
            <p className="text-[11px] text-white uppercase font-bold tracking-wider">
              KIỆT TÁC 3D YVES SAINT LAURENT CASSANDRE
            </p>
            <p className="text-[9.5px] text-[#d0c5af]/80">Kéo chuột hoặc vuốt để xoay tương tác 360° mọi góc độ</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-1 sm:flex-initial justify-end">
          <span className="font-mono text-[10.5px] text-white/80 hidden md:inline tabular-nums">
            {rotationDeg}°
          </span>
          <input
            type="range"
            min={0}
            max={360}
            value={rotationDeg}
            onChange={(e) => handleSliderChange(Number(e.target.value))}
            aria-label="Góc xoay 3D"
            className="w-24 sm:w-32 accent-[#d4af37] cursor-pointer bg-white/20 h-1 rounded"
          />

          {onOpenEngraving && (
            <button
              type="button"
              onClick={onOpenEngraving}
              className="px-3 py-1.5 bg-white text-[#110103] hover:bg-slate-100 text-[10px] sm:text-[10.5px] uppercase tracking-wider font-bold transition-colors border border-white/50 rounded-sm flex items-center gap-1.5 cursor-pointer shadow-sm shrink-0"
            >
              <PenLine className="w-3 h-3 text-[#110103]" />
              <span>KHẮC BẠC</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

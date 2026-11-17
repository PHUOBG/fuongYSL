import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Wind, Snowflake, Eye, EyeOff } from 'lucide-react';

export type SnowMode = 'gentle' | 'storm';

interface SnowSettings {
  count: number;
  gravity: number;
  colorAlphaMin: number;
  colorAlphaMax: number;
  sizeMin: number;
  sizeMax: number;
  scaleMin: number;
  scaleMax: number;
  distortionMin: number;
  distortionMax: number;
  brightnessMin: number;
  brightnessMax: number;
  contrastMin: number;
  contrastMax: number;
  wind: {
    force: number;
    target: number;
    min: number;
    max: number;
    easing: number;
  };
  windDirectionChangeFreq: number;
  windDirectionChangeAmount: number;
  speedYMin: number;
  speedYMax: number;
  speedXMin: number;
  speedXMax: number;
  swayMax: number;
}

// Settings directly adapted from rauschermate/react-weather-effects
const GENTLE_SETTINGS: SnowSettings = {
  count: 2400,
  gravity: 18,
  colorAlphaMin: 0.25,
  colorAlphaMax: 0.75,
  sizeMin: 4,
  sizeMax: 13,
  scaleMin: 0.6,
  scaleMax: 1.6,
  distortionMin: 0.1,
  distortionMax: 0.45,
  brightnessMin: -0.05,
  brightnessMax: 0.25,
  contrastMin: 0.85,
  contrastMax: 1.25,
  wind: {
    force: 0.05,
    target: 0.05,
    min: 0.02,
    max: 0.12,
    easing: 0.003,
  },
  windDirectionChangeFreq: 0.97,
  windDirectionChangeAmount: 1.0,
  speedYMin: 0.6,
  speedYMax: 1.2,
  speedXMin: 0.25,
  speedXMax: 0.6,
  swayMax: 6,
};

const STORM_SETTINGS: SnowSettings = {
  count: 4800,
  gravity: 42,
  colorAlphaMin: 0.35,
  colorAlphaMax: 0.9,
  sizeMin: 6,
  sizeMax: 18,
  scaleMin: 0.8,
  scaleMax: 2.2,
  distortionMin: 0.2,
  distortionMax: 0.9,
  brightnessMin: -0.15,
  brightnessMax: 0.35,
  contrastMin: 0.75,
  contrastMax: 1.35,
  wind: {
    force: 0.18,
    target: 0.25,
    min: 0.1,
    max: 0.45,
    easing: 0.012,
  },
  windDirectionChangeFreq: 0.992,
  windDirectionChangeAmount: 0.25,
  speedYMin: 1.3,
  speedYMax: 2.2,
  speedXMin: 0.5,
  speedXMax: 1.2,
  swayMax: 14,
};

// Procedural 6-point dendritic snowflake texture
function createSnowflakeTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const cx = size / 2;
    const cy = size / 2;

    // Soft radial glow in center
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.48);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.25, 'rgba(255, 250, 240, 0.85)');
    grad.addColorStop(0.65, 'rgba(235, 245, 255, 0.3)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // 6 symmetrical dendritic crystal arms
    ctx.strokeStyle = '#ffffff';
    ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(255, 255, 255, 0.85)';
    ctx.shadowBlur = 3;

    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      // Main spine
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -size * 0.44);
      ctx.stroke();

      // Branchlets
      ctx.lineWidth = 1.6;
      for (const dist of [0.18, 0.28, 0.37]) {
        const y = -size * dist;
        const bLen = size * 0.09 * (1 - dist * 0.8);

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(-bLen, y - bLen * 0.7);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(bLen, y - bLen * 0.7);
        ctx.stroke();
      }

      ctx.restore();
    }

    // Center star dot
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  return texture;
}

const vertexShader = `
  precision highp float;
  attribute float size;
  attribute vec3 rotation;
  attribute vec3 speed;
  attribute vec4 a_color;
  attribute float scale;
  attribute float distortion;
  attribute float brightness;
  attribute float contrast;
  attribute float rotationOffset;
  attribute float flipX;
  attribute float flipY;
  attribute float warp;

  varying vec4 v_color;
  varying float v_rotation;
  varying float v_scale;
  varying float v_distortion;
  varying float v_brightness;
  varying float v_contrast;
  varying float v_rotationOffset;
  varying float v_flipX;
  varying float v_flipY;
  varying float v_warp;

  uniform float u_time;
  uniform vec3 u_worldSize;
  uniform float u_gravity;
  uniform float u_wind;

  void main() {
    v_color = a_color;
    v_rotation = rotation.x + u_time * rotation.y;
    v_scale = scale;
    v_distortion = distortion;
    v_brightness = brightness;
    v_contrast = contrast;
    v_rotationOffset = rotationOffset;
    v_flipX = flipX;
    v_flipY = flipY;
    v_warp = warp;

    vec3 pos = position;
    // Seamless infinite modulo wrapping from rauschermate/react-weather-effects
    pos.x = mod(pos.x + u_time * 2.0 + u_wind * speed.x, u_worldSize.x * 2.0) - u_worldSize.x;
    pos.y = mod(pos.y - u_time * speed.y * u_gravity, u_worldSize.y * 2.0) - u_worldSize.y;
    pos.x += sin(u_time * speed.z) * rotation.z;
    pos.z += cos(u_time * speed.z) * rotation.z;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Perspective point attenuation
    gl_PointSize = (size * v_scale / -mvPosition.z) * 125.0;
  }
`;

const fragmentShader = `
  precision highp float;
  uniform sampler2D u_texture;
  uniform float u_time;

  varying vec4 v_color;
  varying float v_rotation;
  varying float v_scale;
  varying float v_distortion;
  varying float v_brightness;
  varying float v_contrast;
  varying float v_rotationOffset;
  varying float v_flipX;
  varying float v_flipY;
  varying float v_warp;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 coord = gl_PointCoord - 0.5;
    coord *= v_scale;

    // Noise distortion
    float distortion_amount = v_distortion * 0.12;
    coord += vec2(
      hash(coord * 10.0 + u_time * 0.08) * distortion_amount,
      hash(coord * 10.0 + u_time * 0.08 + 1.0) * distortion_amount
    );

    // Warp shear
    coord.x += v_warp * coord.y;
    coord.y += v_warp * coord.x;

    // Flip
    if (v_flipX > 0.5) coord.x = -coord.x;
    if (v_flipY > 0.5) coord.y = -coord.y;

    // Snowflake angle rotation
    float angle = v_rotation + v_rotationOffset;
    vec2 rotated = vec2(
      cos(angle) * coord.x + sin(angle) * coord.y,
      cos(angle) * coord.y - sin(angle) * coord.x
    ) + 0.5;

    vec4 tex = texture2D(u_texture, rotated);

    // Color contrast and brightness adjustment
    vec3 color = tex.rgb * v_color.rgb;
    color = (color - 0.5) * v_contrast + 0.5 + v_brightness;
    color = clamp(color, 0.0, 1.0);

    float alpha = tex.a * v_color.a;
    if (alpha < 0.02) discard;

    gl_FragColor = vec4(color, alpha);
  }
`;

export function WeatherSnowEffect() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [snowMode, setSnowMode] = useState<SnowMode>('gentle');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
    const baseSettings = snowMode === 'storm' ? STORM_SETTINGS : GENTLE_SETTINGS;

    const settings: SnowSettings = {
      ...baseSettings,
      count: isMobile ? Math.floor(baseSettings.count * 0.35) : baseSettings.count,
    };

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 160);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';

    container.appendChild(renderer.domElement);

    // 2. Geometry & Attributes
    const worldSize = [130, 130, 90];
    const positions: number[] = [];
    const colors: number[] = [];
    const sizes: number[] = [];
    const rotations: number[] = [];
    const speeds: number[] = [];
    const scales: number[] = [];
    const distortions: number[] = [];
    const brightnesses: number[] = [];
    const contrasts: number[] = [];
    const rotationOffsets: number[] = [];
    const flipXs: number[] = [];
    const flipYs: number[] = [];
    const warps: number[] = [];

    for (let i = 0; i < settings.count; i++) {
      // 3D position
      positions.push(
        -worldSize[0] + Math.random() * worldSize[0] * 2,
        -worldSize[1] + Math.random() * worldSize[1] * 2,
        -worldSize[2] + Math.random() * worldSize[2] * 2
      );

      // Speed [speedX, speedY, sway]
      speeds.push(
        settings.speedXMin + Math.random() * (settings.speedXMax - settings.speedXMin),
        settings.speedYMin + Math.random() * (settings.speedYMax - settings.speedYMin),
        Math.random() * settings.swayMax
      );

      // Rotation [initAngle, speed, swayAmp]
      rotations.push(
        Math.random() * 2 * Math.PI,
        Math.random() * 8,
        Math.random() * 6
      );

      // Color (White with subtle champagne gold tint for YSL)
      const isGoldFlake = Math.random() < 0.22;
      const alpha = settings.colorAlphaMin + Math.random() * (settings.colorAlphaMax - settings.colorAlphaMin);
      if (isGoldFlake) {
        colors.push(1.0, 0.92, 0.72, alpha * 0.9);
      } else {
        colors.push(0.96, 0.98, 1.0, alpha);
      }

      sizes.push(settings.sizeMin + Math.random() * (settings.sizeMax - settings.sizeMin));
      scales.push(settings.scaleMin + Math.random() * (settings.scaleMax - settings.scaleMin));
      distortions.push(settings.distortionMin + Math.random() * (settings.distortionMax - settings.distortionMin));
      brightnesses.push(settings.brightnessMin + Math.random() * (settings.brightnessMax - settings.brightnessMin));
      contrasts.push(settings.contrastMin + Math.random() * (settings.contrastMax - settings.contrastMin));
      rotationOffsets.push(Math.random() * Math.PI * 2);
      flipXs.push(Math.random() > 0.5 ? 1 : 0);
      flipYs.push(Math.random() > 0.5 ? 1 : 0);
      warps.push(-0.25 + Math.random() * 0.5);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('a_color', new THREE.Float32BufferAttribute(colors, 4));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    geometry.setAttribute('rotation', new THREE.Float32BufferAttribute(rotations, 3));
    geometry.setAttribute('speed', new THREE.Float32BufferAttribute(speeds, 3));
    geometry.setAttribute('scale', new THREE.Float32BufferAttribute(scales, 1));
    geometry.setAttribute('distortion', new THREE.Float32BufferAttribute(distortions, 1));
    geometry.setAttribute('brightness', new THREE.Float32BufferAttribute(brightnesses, 1));
    geometry.setAttribute('contrast', new THREE.Float32BufferAttribute(contrasts, 1));
    geometry.setAttribute('rotationOffset', new THREE.Float32BufferAttribute(rotationOffsets, 1));
    geometry.setAttribute('flipX', new THREE.Float32BufferAttribute(flipXs, 1));
    geometry.setAttribute('flipY', new THREE.Float32BufferAttribute(flipYs, 1));
    geometry.setAttribute('warp', new THREE.Float32BufferAttribute(warps, 1));

    // 3. Texture & Shader Material
    const texture = createSnowflakeTexture();

    const uniforms = {
      u_time: { value: 0 },
      u_texture: { value: texture },
      u_worldSize: { value: new THREE.Vector3(...worldSize) },
      u_gravity: { value: settings.gravity },
      u_wind: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // 4. Dynamic Wind Physics (adapted from rauschermate/react-weather-effects)
    const windState = {
      current: 0,
      force: settings.wind.force,
      target: settings.wind.target,
      min: settings.wind.min,
      max: settings.wind.max,
      easing: settings.wind.easing,
      angle: 0,
    };

    // Mouse interaction for interactive gentle gusts
    const handleMouseMove = (e: MouseEvent) => {
      const mouseXRatio = (e.clientX / window.innerWidth - 0.5) * 2;
      windState.target = THREE.MathUtils.clamp(
        windState.target + mouseXRatio * 0.05,
        -settings.wind.max * 1.5,
        settings.wind.max * 1.5
      );
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 5. Render Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Wind easing logic
      windState.force += (windState.target - windState.force) * windState.easing;
      windState.current += windState.force * (delta * 0.25);

      // Wind angle nudging
      if (Math.random() > settings.windDirectionChangeFreq) {
        const nudge = (Math.random() - 0.5) * settings.windDirectionChangeAmount;
        windState.angle += nudge;
        if (windState.angle > Math.PI) windState.angle -= 2 * Math.PI;
        if (windState.angle < -Math.PI) windState.angle += 2 * Math.PI;
      }

      const windX = Math.cos(windState.angle);
      uniforms.u_wind.value = windState.current * windX;

      // Occasional natural breeze shifts
      if (Math.random() > 0.985) {
        windState.target += (Math.random() - 0.5) * 0.015;
        windState.target = THREE.MathUtils.clamp(windState.target, windState.min, windState.max);
      }
      if (Math.random() > 0.996) {
        windState.target =
          (windState.min + Math.random() * (windState.max - windState.min)) *
          (Math.random() > 0.5 ? -1 : 1);
      }

      uniforms.u_time.value = elapsed;
      renderer.render(scene, camera);
    };

    animate();

    // 6. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      scene.remove(points);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [snowMode]);

  return (
    <>
      {/* Three.js Snow Layer */}
      <div
        ref={mountRef}
        className={`fixed inset-0 pointer-events-none z-20 transition-opacity duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Floating Weather Control Widget */}
      <div className="fixed bottom-5 left-5 z-40 hidden sm:flex items-center gap-1.5 p-1 rounded-full bg-[#0a0104]/80 border border-[#d4af37]/40 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.7)] text-[10.5px] select-none text-white/90">
        <button
          type="button"
          onClick={() => setSnowMode(snowMode === 'gentle' ? 'storm' : 'gentle')}
          title={snowMode === 'gentle' ? 'Chuyển sang Bão Tuyết Noël' : 'Chuyển sang Tuyết Rơi Dịu Êm'}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer hover:bg-white/10 active:scale-95"
        >
          {snowMode === 'gentle' ? (
            <>
              <Snowflake className="w-3.5 h-3.5 text-[#d4af37] animate-spin" style={{ animationDuration: '10s' }} />
              <span className="font-medium tracking-wide">Tuyết Dịu Êm</span>
            </>
          ) : (
            <>
              <Wind className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              <span className="font-bold tracking-wide text-cyan-200">Bão Tuyết Noël</span>
            </>
          )}
        </button>

        <span className="w-px h-3.5 bg-white/20" />

        <button
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          title={isVisible ? 'Tạm ẩn hiệu ứng tuyết' : 'Bật lại hiệu ứng tuyết'}
          className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white cursor-pointer"
        >
          {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-red-400" />}
        </button>
      </div>
    </>
  );
}


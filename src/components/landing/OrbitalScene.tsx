"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float } from "@react-three/drei";
import { Suspense, useMemo, useRef, type MutableRefObject } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

type Pointer = { x: number; y: number };

function Debris({ count = 14 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const data = useMemo(() => {
    const out: { pos: THREE.Vector3; speed: number; phase: number; scale: number; color: THREE.Color }[] = [];
    const colors = ["#faf6ed", "#fdb913", "#8fd3f4", "#9b1b67", "#9c5e7f"];
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const r = 1.55 + (i % 4) * 0.22;
      out.push({
        pos: new THREE.Vector3(Math.cos(a) * r, Math.sin(a * 1.7) * 0.35, Math.sin(a) * r),
        speed: 0.15 + (i % 5) * 0.05,
        phase: i * 0.7,
        scale: 0.035 + (i % 3) * 0.018,
        color: new THREE.Color(colors[i % colors.length]),
      });
    }
    return out;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    data.forEach((d, i) => {
      const spin = t * d.speed + d.phase;
      dummy.position.set(
        Math.cos(spin) * d.pos.length(),
        d.pos.y + Math.sin(t * 0.8 + d.phase) * 0.12,
        Math.sin(spin) * d.pos.length(),
      );
      dummy.scale.setScalar(d.scale);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
      mesh.current!.setColorAt(i, d.color);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial toneMapped metalness={0.55} roughness={0.35} />
    </instancedMesh>
  );
}

function Sculpture({ pointer, reduce }: { pointer: MutableRefObject<Pointer>; reduce: boolean }) {
  const root = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    if (!root.current) return;
    if (!reduce) {
      root.current.rotation.y += dt * 0.18;
      const tx = pointer.current.y * 0.35;
      const tz = pointer.current.x * 0.28;
      root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, tx, 0.06);
      root.current.rotation.z = THREE.MathUtils.lerp(root.current.rotation.z, tz, 0.06);
      if (ringA.current) ringA.current.rotation.z += dt * 0.55;
      if (ringB.current) ringB.current.rotation.x -= dt * 0.4;
      if (ringC.current) ringC.current.rotation.y += dt * 0.7;
    }
  });

  return (
    <Float speed={reduce ? 0 : 1.2} rotationIntensity={reduce ? 0 : 0.25} floatIntensity={reduce ? 0 : 0.45}>
      <group ref={root}>
        {/* core */}
        <mesh>
          <sphereGeometry args={[0.52, 64, 64]} />
          <meshPhysicalMaterial
            color="#7a1552"
            metalness={0.15}
            roughness={0.12}
            transmission={0.55}
            thickness={0.85}
            ior={1.4}
            envMapIntensity={1.4}
            clearcoat={1}
            clearcoatRoughness={0.15}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.28, 32, 32]} />
          <meshStandardMaterial color="#faf6ed" emissive="#9b1b67" emissiveIntensity={0.35} roughness={0.4} />
        </mesh>

        {/* rings */}
        <mesh ref={ringA} rotation={[Math.PI / 2.15, 0.15, 0.1]}>
          <torusGeometry args={[1.28, 0.028, 20, 160]} />
          <meshStandardMaterial color="#fdb913" metalness={0.95} roughness={0.18} envMapIntensity={1.6} />
        </mesh>
        <mesh ref={ringB} rotation={[0.55, 0.9, 0.35]}>
          <torusGeometry args={[1.05, 0.022, 16, 140]} />
          <meshStandardMaterial color="#f3ecdc" metalness={0.9} roughness={0.22} envMapIntensity={1.3} />
        </mesh>
        <mesh ref={ringC} rotation={[-0.7, 0.25, 1.1]}>
          <torusGeometry args={[0.78, 0.016, 14, 120]} />
          <meshStandardMaterial color="#8fd3f4" metalness={0.88} roughness={0.2} envMapIntensity={1.4} />
        </mesh>

        {/* outer halo ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.55, 0.006, 8, 100]} />
          <meshBasicMaterial color="#faf6ed" transparent opacity={0.22} />
        </mesh>

        {!reduce && <Debris />}
      </group>
    </Float>
  );
}

function Scene({ pointer, reduce }: { pointer: MutableRefObject<Pointer>; reduce: boolean }) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 3]} intensity={1.35} color="#fff6e8" />
      <directionalLight position={[-4, -2, -3]} intensity={0.45} color="#8fd3f4" />
      <pointLight position={[0, 0, 2.2]} intensity={0.55} color="#9b1b67" />
      <Suspense fallback={null}>
        <Sculpture pointer={pointer} reduce={reduce} />
        <Environment preset="city" environmentIntensity={0.55} />
        <ContactShadows position={[0, -1.65, 0]} opacity={0.35} scale={7} blur={2.8} far={3.2} />
      </Suspense>
    </>
  );
}

export function OrbitalScene({
  className = "",
  fill = false,
  pointerRef,
}: {
  className?: string;
  fill?: boolean;
  pointerRef?: MutableRefObject<Pointer>;
}) {
  const reduce = useReducedMotion();
  const localPointer = useRef<Pointer>({ x: 0, y: 0 });
  const pointer = pointerRef ?? localPointer;

  return (
    <div
      className={fill ? `absolute inset-0 ${className}` : `relative aspect-square w-full ${className}`}
      onPointerMove={(e) => {
        if (reduce || pointerRef) return;
        const rect = e.currentTarget.getBoundingClientRect();
        pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      }}
      onPointerLeave={() => {
        if (pointerRef) return;
        pointer.current.x = 0;
        pointer.current.y = 0;
      }}
    >
      <Canvas
        dpr={[1, 1.15]}
        camera={{ position: [0, 0.2, 5.1], fov: 36 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Scene pointer={pointer} reduce={!!reduce} />
      </Canvas>
    </div>
  );
}

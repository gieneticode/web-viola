import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { useGLTF, useTexture, Environment, Lightformer } from "@react-three/drei";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";

extend({ MeshLineGeometry, MeshLineMaterial });

const GLTF_PATH = "/assets/kartu.glb";
const BAND_TEXTURE_PATH = "/assets/bandd.png";
useGLTF.preload(GLTF_PATH);
useTexture.preload(BAND_TEXTURE_PATH);

/* ===== 3D Lanyard / ID card (physics-based) =====
   Hanging card swinging on a rope — adapted from DexVanScientia/Portofolio
   (originally fattahmaulana/3D_CARD). Card face = client's business card. */
export default function Lanyard({ photoSrc = "/assets/card-face.jpg" }) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <Canvas camera={{ position: [isMobile ? 0 : 2.35, 0, 11], fov: isMobile ? 32 : 26 }} gl={{ alpha: true }} dpr={[1, 2]}>
      <ambientLight intensity={Math.PI} />
      <Physics key={isMobile ? "mobile" : "desktop"} interpolate={false} gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Band photoSrc={photoSrc} isMobile={isMobile} />
      </Physics>
      <Environment blur={0.75}>
        <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
      </Environment>
    </Canvas>
  );
}

function Band({ maxSpeed = 50, minSpeed = 10, photoSrc, isMobile }) {
  const fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef(), band = useRef(), cardMesh = useRef(), clipMesh = useRef(); // prettier-ignore
  const cardTopY = useRef(1.1);
  const clipTopY = useRef(1.3);
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3(), _v = new THREE.Vector3(); // prettier-ignore
  const segmentProps = { type: "dynamic", canSleep: true, colliders: false, angularDamping: 1.5, linearDamping: 1.5 };
  const { nodes, materials } = useGLTF(GLTF_PATH);
  const photoTexture = useTexture(photoSrc);
  const bandTexture = useTexture(BAND_TEXTURE_PATH);
  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);

  /* Catmull-Rom curve for the hanging lanyard strap (mesh line geometry).
     Points are driven from the rigid-body joints every frame in useFrame. */
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );

  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);



  // The stage is pulled up behind the sticky navbar on all breakpoints
  // (see CSS: .idcard-stage margin-top:calc(-1 * var(--nav-h) - 60px)).
  // The rope is lengthened by the same amount (in world units) so the card
  // keeps its on-screen position; the strap top then tucks behind the navbar
  // (navbar z-80 > stage z-1, navbar background fully opaque) so the lanyard
  // looks like it emerges from inside the navbar.
  const ropeLen = 1.35;

  photoTexture.colorSpace = THREE.SRGBColorSpace;
  photoTexture.minFilter = THREE.LinearFilter;
  photoTexture.magFilter = THREE.LinearFilter;
  photoTexture.generateMipmaps = true;

  bandTexture.wrapS = bandTexture.wrapT = THREE.RepeatWrapping;
  bandTexture.anisotropy = 8;
  bandTexture.minFilter = THREE.LinearMipmapLinearFilter;
  bandTexture.magFilter = THREE.LinearFilter;
  bandTexture.generateMipmaps = true;
  curve.curveType = "chordal";

  const cardGeo = useMemo(() => {
    const geo = nodes.card.geometry.clone();
    geo.computeVertexNormals();
    const bb = geo.boundingBox;
    const pos = geo.attributes.position;
    const norm = geo.attributes.normal;
    const uv = new Float32Array(pos.count * 2);
    for (let i = 0; i < pos.count; i++) {
      const x = (pos.getX(i) - bb.min.x) / (bb.max.x - bb.min.x);
      const y = (pos.getY(i) - bb.min.y) / (bb.max.y - bb.min.y);
      const nz = norm.getZ(i);
      if (nz < -0.1) uv[i * 2] = 1 - x;
      else uv[i * 2] = x;
      uv[i * 2 + 1] = y;
    }
    geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    cardTopY.current = bb.max.y;
    const cbb = new THREE.Box3().setFromBufferAttribute(nodes.clip.geometry.getAttribute("position"));
    clipTopY.current = cbb.max.y;
    return geo;
  }, [nodes.card.geometry]);

  // Realistic hanger ring at the card's top-center (like a real ID card lanyard).
  useEffect(() => {
    // Hide the tiny GLB clip; the ring is the visible hanger now.
    // clip visible (original 3D_CARD style)
  }, [nodes.card.geometry]);


  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], ropeLen]); // prettier-ignore
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], ropeLen]); // prettier-ignore
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], ropeLen]); // prettier-ignore
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.8, 0]]); // prettier-ignore

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => void (document.body.style.cursor = "auto");
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        const t = Math.min(1, delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))); // clamp: a large first-frame delta must not overshoot to Infinity
        ref.current.lerped.lerp(ref.current.translation(), t);
      });
      // Drive the 3D strap ribbon: anchor top at fixed, follow joints,
      // and anchor bottom DIRECTLY to the card's clip top in world space
      // so strap moves, swings and rotates with the card in real-time.
      const cardTrans = card.current.translation();
      const cardRot = card.current.rotation();
      const cardEuler = new THREE.Euler().setFromQuaternion(new THREE.Quaternion(cardRot.x, cardRot.y, cardRot.z, cardRot.w));
      const clipOffset = new THREE.Vector3(0, 1.8, 0).applyEuler(cardEuler);
      const cardClipPos = new THREE.Vector3().copy(cardTrans).add(clipOffset);

      // sedikit turun dari clip top — ujung tali 'terbenam' di lubang ring
      curve.points[0].copy(cardClipPos).y -= 0.12;
      curve.points[1].copy(j3.current.translation());
      curve.points[2].copy(j2.current.translation());
      curve.points[3].copy(j1.current.translation());
      curve.points[4].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  return (
    <>
      <group position={[isMobile ? 0 : 0.2, isMobile ? 5.2 : 5.6, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[isMobile ? 0 : 0.5, 0, 0]} ref={j1} {...segmentProps} gravityScale={1}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[isMobile ? 0 : 1, 0, 0]} ref={j2} {...segmentProps} gravityScale={1}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[isMobile ? 0 : 1.5, 0, 0]} ref={j3} {...segmentProps} gravityScale={1}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[isMobile ? 0.9 : 2, -0.3, 0]}
          rotation={[0, 0, 0.6]}
          ref={card} gravityScale={1}
          angularDamping={0.8} linearDamping={0.8}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.9, 1.125, 0.01]} />
          <group
            scale={isMobile ? 2.0 : 2.9}
            position={[0, isMobile ? -0.75 : -1.74, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e) =>
              (e.target.setPointerCapture(e.pointerId),
                drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))
            }
          >
            <mesh ref={cardMesh} geometry={cardGeo} scale={[1.125, 1, 1]}>
              <meshPhysicalMaterial
                map={photoTexture}
                map-anisotropy={16}
                clearcoat={0.6}
                clearcoatRoughness={0.25}
                roughness={0.55}
                metalness={0.15}
                envMapIntensity={0.9}
                reflectivity={0.35}
              />
            </mesh>
            <mesh ref={clipMesh} geometry={nodes.clip.geometry} material={materials.metal || materials.card} material-roughness={0.3} />
            {/* Visible hanger ring the strap threads through */}
            <mesh geometry={nodes.clamp.geometry} material={materials.metal || materials.card} material-color="#444" />
          </group>
        </RigidBody>
      </group>
        {/* Lanyard strap: camera-facing ribbon textured with the VIO CREW band,
            following the rope joints through the Catmull-Rom curve.
            NOTE: this mesh lives OUTSIDE the offset group below because the
            curve points are physics world coordinates. */}
        <mesh ref={band} frustumCulled={false}>
          <meshLineGeometry />
          <meshLineMaterial
            color="white"
            depthTest={true}
            resolution={[width, height]}
            useMap
            map={bandTexture}
            repeat={[-4, 1]}
            lineWidth={0.5}
          />
        </mesh>
    </>
  );
}

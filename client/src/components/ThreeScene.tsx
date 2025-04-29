import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeSceneProps {
  type: 'hero' | 'contact';
}

const ThreeScene = ({ type }: ThreeSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create different 3D elements based on type
    if (type === 'hero') {
      // For hero section: floating particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 500;

      const posArray = new Float32Array(particlesCount * 3);
      for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x02ecd1,
        transparent: true,
        opacity: 0.8
      });

      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);

      // Animation function for hero particles
      const animateHero = () => {
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;

        renderer.render(scene, camera);
        return requestAnimationFrame(animateHero);
      };

      const animationId = animateHero();

      return () => {
        cancelAnimationFrame(animationId);
        scene.remove(particlesMesh);
        particlesGeometry.dispose();
        particlesMaterial.dispose();
      };

    } else if (type === 'contact') {
      // For contact section: wavy grid
      const gridSize = 20;
      const gridDivisions = 20;
      const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x02ECD1, 0x02ECD1);
      gridHelper.position.y = -2;
      scene.add(gridHelper);

      // Add wavy animation to grid
      const animate = () => {
        if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

        const time = Date.now() * 0.001;
        gridHelper.position.y = -2 + Math.sin(time) * 0.2;
        gridHelper.rotation.x = Math.sin(time * 0.5) * 0.1;
        gridHelper.rotation.z = Math.cos(time * 0.5) * 0.1;

        rendererRef.current.render(sceneRef.current, cameraRef.current);
        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animate();
    }

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current || !containerRef.current) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();

      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, [type]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${type === 'contact' ? 'opacity-50' : 'opacity-30'}`}
      style={{ background: 'transparent' }}
    />
  );
};

export default ThreeScene;

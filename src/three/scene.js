
import * as THREE from 'three';

export function createScene() {

  // 1. Create the scene
  const scene = new THREE.Scene();

  scene.background = new THREE.Color(0x080711);
  scene.fog = new THREE.Fog(0x080711, 8, 20);

  // 2. Create the camera
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );

  camera.position.set(0, 2.5, 7);
  camera.lookAt(0, 0.6, 0);

  // 3. Create the renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.5;

  document.querySelector('#app').appendChild(renderer.domElement);

  // 4. Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);

  const diyaLight = new THREE.PointLight(0xffa52f, 35, 6);
  diyaLight.position.set(0, 1, 0);
  diyaLight.castShadow = true;
  scene.add(diyaLight);

  const topLight = new THREE.DirectionalLight(0xffdca0, 2);
  topLight.position.set(3, 5, 4);
  scene.add(topLight);

  // 5. Create the floor
  const floorGeometry = new THREE.PlaneGeometry(200, 200);

  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x15101d,
    roughness: 0.35,
    metalness: 0.2
  });

  const floor = new THREE.Mesh(floorGeometry, floorMaterial);

  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.02;
  floor.receiveShadow = true;

  scene.add(floor);

  // 6. Create the diya bowl
  const diyaGroup = new THREE.Group();

  const bowlPoints = [
    new THREE.Vector2(0, 0.08),
    new THREE.Vector2(0.3, 0.08),
    new THREE.Vector2(0.55, 0.12),
    new THREE.Vector2(0.7, 0.23),
    new THREE.Vector2(0.73, 0.29),
    new THREE.Vector2(0.68, 0.32),
    new THREE.Vector2(0.58, 0.25),
    new THREE.Vector2(0.35, 0.18),
    new THREE.Vector2(0, 0.18)
  ];

  const bowlGeometry = new THREE.LatheGeometry(bowlPoints, 64);

  const bowlMaterial = new THREE.MeshStandardMaterial({
    color: 0xb66b26,
    metalness: 0.75,
    roughness: 0.25
  });

  const bowl = new THREE.Mesh(bowlGeometry, bowlMaterial);

  bowl.castShadow = true;
  bowl.receiveShadow = true;

  diyaGroup.add(bowl);

  // 7. Create the diya flame
  const flameGeometry = new THREE.SphereGeometry(1, 32, 32);

  const flameMaterial = new THREE.MeshStandardMaterial({
    color: 0xff8c00,
    emissive: 0xff6500,
    emissiveIntensity: 2
  });

  const flame = new THREE.Mesh(flameGeometry, flameMaterial);

  flame.scale.set(0.13, 0.42, 0.13);
  flame.position.set(0, 0.67, 0);

  diyaGroup.add(flame);

  // Inner golden flame
  const innerFlame = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xffed9a })
  );

  innerFlame.scale.set(0.07, 0.25, 0.07);
  innerFlame.position.set(0, 0.62, 0.01);

  diyaGroup.add(innerFlame);

  scene.add(diyaGroup);

  // 8. Create floating golden particles
  const particleCount = 500;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = Math.random() * 5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }

  const particleGeometry = new THREE.BufferGeometry();

  particleGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
  );

  const particleMaterial = new THREE.PointsMaterial({
    color: 0xffcf70,
    size: 0.035,
    transparent: true,
    opacity: 0.8
  });

  const particles = new THREE.Points(
    particleGeometry,
    particleMaterial
  );

  scene.add(particles);

  // 9. Animation loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // Flickering flame
    flame.scale.y = 0.42 + Math.sin(time * 9) * 0.04;
    flame.rotation.z = Math.sin(time * 5) * 0.08;

    innerFlame.scale.y = 0.25 + Math.sin(time * 9) * 0.025;

    // Changing diya light
    diyaLight.intensity = 35 + Math.sin(time * 10) * 3;

    // Floating particles
    particles.rotation.y = time * 0.025;

    renderer.render(scene, camera);
  }

  animate();

  // 10. Responsive window
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return { scene, camera, renderer };
}

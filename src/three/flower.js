
import * as THREE from 'three';

export function createFlower() {

  const flower = new THREE.Group();

  // Pink petal material
  const petalMaterial = new THREE.MeshStandardMaterial({
    color: 0xff69b4,
    roughness: 0.35,
    emissive: 0x8a174c,
    emissiveIntensity: 0.2,
    side: THREE.DoubleSide
  });

  // Create a rounded petal
  const petalGeometry = new THREE.SphereGeometry(
    1, 32, 24
  );

  // Arrange 8 petals in a circle
  const petalCount = 8;

  for (let i = 0; i < petalCount; i++) {

    const angle = (i / petalCount) * Math.PI * 2;

    const petal = new THREE.Mesh(
      petalGeometry,
      petalMaterial
    );

    // Make petal long and narrow
    petal.scale.set(0.17, 0.32, 0.07);

    // Spread petals around the centre
    petal.position.set(
      Math.cos(angle) * 0.20,
      Math.sin(angle) * 0.20,
      0
    );

    // Rotate each petal outwards
    petal.rotation.z = angle - Math.PI / 2;

    flower.add(petal);
  }

  // Golden flower centre
  const centre = new THREE.Mesh(
    new THREE.SphereGeometry(0.13, 32, 32),
    new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xffaa00,
      emissiveIntensity: 0.6,
      metalness: 0.5,
      roughness: 0.3
    })
  );

  centre.position.z = 0.08;
  flower.add(centre);

  // Make the complete flower larger
  flower.scale.setScalar(1.6);

  return flower;
}

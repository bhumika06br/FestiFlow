
import * as THREE from 'three';

export function createMandala() {
  const mandala = new THREE.Group();

  const goldMaterial = new THREE.MeshBasicMaterial({
    color: 0xffd700,
    transparent: true,
    opacity: 0.9
  });

  // Create circular rings
  for (let i = 0; i < 3; i++) {
    const radius = 0.35 + i * 0.18;

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.015, 8, 80),
      goldMaterial
    );

    mandala.add(ring);
  }

  // Add golden decorative dots
  const dotGeometry = new THREE.SphereGeometry(0.035, 12, 12);

  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    const dot = new THREE.Mesh(dotGeometry, goldMaterial);

    dot.position.set(
      Math.cos(angle) * 0.85,
      Math.sin(angle) * 0.85,
      0
    );

    mandala.add(dot);
  }

  return mandala;
}

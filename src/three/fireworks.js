
import * as THREE from 'three';

export function createFireworks(scene) {

  let lastLaunchTime = 0;

  function launchFireworks() {

    // Prevent continuous firing while gesture is held
    const now = performance.now();

    if (now - lastLaunchTime < 1800) return;

    lastLaunchTime = now;

    const particleCount = 140;

    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    // Create particles at the burst centre
    for (let i = 0; i < particleCount; i++) {

      positions[i * 3] = 0;
      positions[i * 3 + 1] = 2;
      positions[i * 3 + 2] = 0;

      // Random direction
      const direction = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ).normalize();

      direction.multiplyScalar(
        Math.random() * 2.5 + 1
      );

      velocities.push(direction);
    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
      color: 0xffc857,
      size: 0.075,
      transparent: true,
      opacity: 1,
      depthWrite: false
    });

    const sparks = new THREE.Points(geometry, material);

    scene.add(sparks);

    const startTime = performance.now();
    let previousTime = startTime;

    function animateSparks() {

      const currentTime = performance.now();
      const elapsed = currentTime - startTime;
      const delta = Math.min(
        (currentTime - previousTime) / 1000,
        0.05
      );

      previousTime = currentTime;

      for (let i = 0; i < particleCount; i++) {

        const index = i * 3;
        const velocity = velocities[i];

        positions[index] += velocity.x * delta;
        positions[index + 1] += velocity.y * delta;
        positions[index + 2] += velocity.z * delta;

        // Gravity
        velocity.y -= 2 * delta;
      }

      geometry.attributes.position.needsUpdate = true;

      // Fade away
      material.opacity = Math.max(0, 1 - elapsed / 1800);

      if (elapsed < 1800) {
        requestAnimationFrame(animateSparks);
      } else {
        scene.remove(sparks);
        geometry.dispose();
        material.dispose();
      }
    }

    animateSparks();
  }

  return launchFireworks;
}

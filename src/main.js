
import './style.css';

import * as THREE from 'three';

import { createScene } from './three/scene.js';
import { createFlower } from './three/flower.js';
import { createFireworks } from './three/fireworks.js';
import { createMandala } from './three/mandala.js';
import { startHandTracking } from './vision/handTracking.js';

const diwaliGreeting = document.getElementById('diwali-greeting');

// Start 3D environment
const { scene, camera, renderer } = createScene();
const launchFireworks = createFireworks(scene);
const handMandala = createMandala();
scene.add(handMandala);
handMandala.visible = false;

// Flower reference
let handFlower = null;

// Convert hand coordinates to 3D position
function getHandWorldPosition(landmark) {

  const vector = new THREE.Vector3(
    (1 - landmark.x) * 2 - 1,
    -(landmark.y * 2 - 1),
    0.5
  );

  vector.unproject(camera);

  const direction = vector
    .sub(camera.position)
    .normalize();

  const distance = -camera.position.z / direction.z;

  return camera.position.clone().add(
    direction.multiplyScalar(distance)
  );
}

// Start hand tracking
startHandTracking((gesture, landmarks) => {
  diwaliGreeting.classList.remove('active');
  if (gesture === 'Open_Palm') {

    if (!handFlower) {
      handFlower = createFlower();
      scene.add(handFlower);
    }

    const position = getHandWorldPosition(landmarks[9]);
    handFlower.position.lerp(position, 0.8);
    handFlower.visible = true;
    handMandala.visible = false;

  }

  else if (gesture === 'Victory') {

    if (handFlower) {
      handFlower.visible = false;
    }
    handMandala.visible = false;
    launchFireworks();

  }

  else if (gesture === 'Closed_Fist') {

    if (handFlower) {
      handFlower.visible = false;
    }

    const position = getHandWorldPosition(landmarks[9]);

    handMandala.position.lerp(position, 0.3);
    handMandala.visible = true;

    handMandala.rotation.z += 0.02;

  }

  else if (gesture === 'Namaste') {

    handFlower && (handFlower.visible = false);
    handMandala.visible = false;

    diwaliGreeting.classList.add('active');

  }
  
  else {

    if (handFlower) {
      handFlower.visible = false;
    }
    handMandala.visible = false;
  }

});

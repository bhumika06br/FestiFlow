
import {
  FilesetResolver,
  GestureRecognizer
} from '@mediapipe/tasks-vision';

export async function startHandTracking(onGesture) {

  const video = document.getElementById('webcam');
  const cameraStatus = document.getElementById('camera-status');

  let recognizer = null;

  try {

    // 1. Start webcam
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true
    });

    video.srcObject = stream;
    await video.play();

    cameraStatus.textContent = 'Camera connected!';

    // 2. Load MediaPipe
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    );

    recognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task'
      },
      runningMode: 'VIDEO',
      numHands: 2
    });

    console.log('MediaPipe model loaded!');

    // 3. Detect gestures
    let lastVideoTime = -1;

    function detectHands() {

      if (
        recognizer &&
        video.readyState >= 2 &&
        video.currentTime !== lastVideoTime
      ) {

        const results = recognizer.recognizeForVideo(
          video,
          performance.now()
        );

        lastVideoTime = video.currentTime;


        if (results.landmarks.length > 0) {

          const hands = results.landmarks;

          // Check whether both palms are close together
          let isNamaste = false;

          if (hands.length === 2) {

            const palm1 = hands[0][9];
            const palm2 = hands[1][9];

            const distance = Math.hypot(
              palm1.x - palm2.x,
              palm1.y - palm2.y
            );

            if (distance < 0.18) {
              isNamaste = true;
            }
          }

          if (isNamaste) {

            cameraStatus.textContent = 'Namaste detected! 🙏';

            onGesture('Namaste', hands);

          } else {

            const gesture = results.gestures[0]?.[0]?.categoryName;

            cameraStatus.textContent = gesture
              ? `Gesture: ${gesture}`
              : 'Hand detected!';

            if (gesture) {
              onGesture(gesture, hands[0]);
            }
          }

        } else {

          cameraStatus.textContent = 'Show your hand...';
          onGesture('None', null);
        }

      }

      requestAnimationFrame(detectHands);
    }

    detectHands();

  } catch (error) {

    console.error('Hand tracking error:', error);
    cameraStatus.textContent = 'Camera or model error!';

  }
}

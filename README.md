
# ✨ FestiFlow – Celebrate. Create. Experience.
An interactive 3D Diwali experience where your hand gestures bring festive art to life!
## 🌐 Live Demo

🚀 **Experience FestiFlow here:**

[Visit FestiFlow](https://festi-flow-three.vercel.app/)



FestiFlow combines **Three.js, JavaScript, and MediaPipe** to create a virtual Diwali celebration controlled through real-time hand gestures.

## 🌟 Features

- 🌸 **Flower Magic:** Show an open palm to create a beautiful flower that follows your hand.
- 🎆 **Golden Fireworks:** Make a victory sign to launch a golden fireworks animation.
- 🪷 **3D Mandala:** Make a closed fist to display a rotating golden mandala.
- 🙏 **Namaste Greeting:** Bring both hands together to display a special Diwali greeting.
- 🪔 **3D Environment:** Experience a festive 3D scene with a traditional diya.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML | Web page structure |
| CSS | Styling and animations |
| JavaScript | Application logic |
| Three.js | 3D graphics and animations |
| MediaPipe | Real-time hand gesture recognition |
| Vite | Development server and build tool |

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git
- A webcam
- A modern web browser

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/bhumika06br/FestiFlow.git
   ```

2. Navigate to the project folder:

   ```bash
   cd FestiFlow
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal.

6. Allow camera access when prompted.

## 🎮 Gesture Controls

| Hand Gesture | Action |
|---|---|
| Open Palm 🖐️ | Creates a flower |
| Victory ✌️ | Launches golden fireworks |
| Closed Fist ✊ | Displays a golden mandala |
| Namaste 🙏 | Displays a Diwali greeting |

## 📁 Project Structure

```text
FestiFlow/
│
├── public/
├── src/
│   ├── assets/
│   ├── three/
│   │   ├── scene.js
│   │   ├── flower.js
│   │   ├── fireworks.js
│   │   └── mandala.js
│   │
│   ├── vision/
│   │   └── handTracking.js
│   │
│   ├── main.js
│   └── style.css
│
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

## 💡 How It Works

1. MediaPipe detects and tracks hand landmarks through the webcam.
2. Hand gestures are recognized in real time.
3. JavaScript identifies the detected gesture.
4. Three.js displays the corresponding 3D animation.
5. The experience responds interactively to hand movements.

## 🎯 Project Goal

The goal of FestiFlow is to bring together festive celebration and interactive technology, creating a fun and immersive way to experience Diwali without traditional input devices.

## 🔮 Future Enhancements

- More festive objects and hand gestures.
- Interactive rangoli creation.
- Customizable festive backgrounds.
- Improved animations and visual effects.
- Mobile-friendly experience.

## 👩‍💻 Developer

**Bhumika B R**

Built with ❤️ and a little festive magic! 🪔

---

⭐ If you like this project, consider giving the repository a star!

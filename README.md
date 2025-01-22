# 3D Carousel Gallery

A beautiful and interactive 3D carousel gallery built with Next.js, featuring image and video support with an integrated music player.

## Features

- 🎠 Smooth 3D carousel animation
- 🖼️ Support for images and videos
- 🎵 Integrated SoundCloud music player
- 🎮 Interactive controls (drag, zoom, auto-rotate)
- 📱 Fully responsive design
- 🎨 Beautiful hover effects and transitions

## Getting Started

### Prerequisites

- Node.js 15.x or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd carousel-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

### Adding Media

To add new images or videos to the carousel, modify the `pages/index.js` file:

```jsx
<div id="spin-container">
  <img src="your-image-url.jpg" alt="description" />
  <video controls autoPlay loop>
    <source src="your-video-url.mp4" type="video/mp4" />
  </video>
</div>
```

### Customization

You can customize various aspects of the carousel by modifying the following variables in `pages/index.js`:

```javascript
var radius = 240; // Distance of items from center
var autoRotate = true; // Enable/disable auto-rotation
var rotateSpeed = -60; // Rotation speed (negative for clockwise)
var imgWidth = 120; // Width of items
var imgHeight = 170; // Height of items
```

## Controls

- **Drag**: Click and drag to rotate the carousel
- **Scroll**: Use mouse wheel to zoom in/out
- **Auto-rotate**: Carousel automatically rotates (can be disabled)
- **Music**: Control music playback using the top bar player

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [SoundCloud Widget API](https://developers.soundcloud.com/docs/api/html5-widget) - Music integration
- CSS3 3D Transforms
- Modern JavaScript

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is licensed under the MIT License.

## Acknowledgments

- Inspired by modern 3D carousel implementations
- SoundCloud for music integration capabilities
- Next.js team for the amazing framework
// components/Carousel3D.js
import { useEffect, useRef, useState } from 'react';
import styles from './Carousel3D.module.css';

const Carousel3D = () => {
  const dragContainer = useRef(null);
  const spinContainer = useRef(null);
  const [radius, setRadius] = useState(240);
  
  const config = {
    autoRotate: true,
    rotateSpeed: -60,
    imgWidth: 120,
    imgHeight: 170,
    bgMusicURL: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1312206532&color=ff5500"',
    bgMusicControls: true
  };

  const images = [
    'https://iili.io/HTjH72V.jpg',
    'https://iili.io/HTjHCk7.jpg',
    'https://iili.io/HTjH3Bf.jpg',
    'https://iili.io/HTjHKrl.jpg',
    'https://iili.io/HTjHRrQ.jpg',
    'https://iili.io/HTjHAEx.jpg',
    'https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
  ];

  const videoSrc = "https://player.vimeo.com/external/322244668.sd.mp4?s=338c48ac2dfcb1d4c0689968b5baf94eee6ca0c1&profile_id=165&oauth2_token_id=57447761";

  useEffect(() => {
    let tX = 0, tY = 10;
    let desX = 0, desY = 0;

    const init = (delayTime) => {
      const aEle = [...spinContainer.current.getElementsByTagName('img'), 
                    ...spinContainer.current.getElementsByTagName('video')];
      
      aEle.forEach((ele, i) => {
        ele.style.transform = `rotateY(${i * (360 / aEle.length)}deg) translateZ(${radius}px)`;
        ele.style.transition = "transform 1s";
        ele.style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
      });
    };

    const applyTransform = (obj) => {
      if(tY > 180) tY = 180;
      if(tY < 0) tY = 0;
      obj.style.transform = `rotateX(${-tY}deg) rotateY(${tX}deg)`;
    };

    const playSpin = (yes) => {
      if (spinContainer.current) {
        spinContainer.current.style.animationPlayState = yes ? 'running' : 'paused';
      }
    };

    // Initialize
    setTimeout(() => init(), 1000);

    // Auto rotate
    if (config.autoRotate && spinContainer.current) {
      const animationName = config.rotateSpeed > 0 ? 'spin' : 'spinRevert';
      spinContainer.current.style.animation = `${animationName} ${Math.abs(config.rotateSpeed)}s infinite linear`;
    }

    // Event handlers
    const handlePointerDown = (e) => {
      if (dragContainer.current.timer) clearInterval(dragContainer.current.timer);
      
      const sX = e.clientX;
      const sY = e.clientY;

      const handlePointerMove = (e) => {
        const nX = e.clientX;
        const nY = e.clientY;
        desX = nX - sX;
        desY = nY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTransform(dragContainer.current);
        sX = nX;
        sY = nY;
      };

      const handlePointerUp = () => {
        dragContainer.current.timer = setInterval(() => {
          desX *= 0.95;
          desY *= 0.95;
          tX += desX * 0.1;
          tY += desY * 0.1;
          applyTransform(dragContainer.current);
          playSpin(false);
          if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
            clearInterval(dragContainer.current.timer);
            playSpin(true);
          }
        }, 17);
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
      };

      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    };

    const handleWheel = (e) => {
      const d = e.wheelDelta / 20 || -e.detail;
      setRadius(prev => prev + d);
      init(1);
    };

    if (dragContainer.current) {
      dragContainer.current.addEventListener('pointerdown', handlePointerDown);
      document.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (dragContainer.current) {
        dragContainer.current.removeEventListener('pointerdown', handlePointerDown);
        document.removeEventListener('wheel', handleWheel);
      }
    };
  }, [radius]);

  return (
    <div ref={dragContainer} id="drag-container">
      <div ref={spinContainer} id="spin-container" style={{ width: config.imgWidth, height: config.imgHeight }}>
        {images.map((src, index) => (
          <img key={index} src={src} alt="" />
        ))}
        <video controls autoPlay loop>
          <source src={videoSrc} type="video/mp4" />
        </video>
        <p>Love from Prasenjit ♥</p>
      </div>
      <div id="ground" style={{ width: radius * 3, height: radius * 3 }} />
      {config.bgMusicURL && (
        <div id="music-container">
          <audio 
            src={config.bgMusicURL} 
            controls={config.bgMusicControls} 
            autoPlay 
            loop
          />
        </div>
      )}
    </div>
  );
};

export default Carousel3D;
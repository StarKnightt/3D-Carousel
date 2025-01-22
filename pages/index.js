// I'll be making clean code later

import { useEffect } from 'react';
import Head from 'next/head';
import Music from '@/components/Music';
import styles from '@/styles/Carousel.module.css';

export default function Home() {
  useEffect(() => {
    // Original JavaScript code
    var radius = 240;
    var autoRotate = true;
    var rotateSpeed = -60;
    var imgWidth = 120;
    var imgHeight = 170;

    setTimeout(init, 1000);

    var odrag = document.getElementById('drag-container');
    var ospin = document.getElementById('spin-container');
    var aImg = ospin.getElementsByTagName('img');
    var aVid = ospin.getElementsByTagName('video');
    var aEle = [...aImg, ...aVid];

    // Size of images
    ospin.style.width = imgWidth + "px";
    ospin.style.height = imgHeight + "px";

    // Size of ground - depend on radius
    var ground = document.getElementById('ground');
    ground.style.width = radius * 3 + "px";
    ground.style.height = radius * 3 + "px";

    function init(delayTime) {
      for (var i = 0; i < aEle.length; i++) {
        aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
        aEle[i].style.transition = "transform 1s";
        aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
      }
    }

    function applyTranform(obj) {
      if(tY > 180) tY = 180;
      if(tY < 0) tY = 0;
      obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
    }

    function playSpin(yes) {
      ospin.style.animationPlayState = (yes?'running':'paused');
    }

    var sX, sY, nX, nY, desX = 0,
        desY = 0,
        tX = 0,
        tY = 10;

    // auto spin
    if (autoRotate) {
      var animationName = (rotateSpeed > 0 ? styles.spin : styles.spinRevert);
      ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
    }

    // setup events
    document.onpointerdown = function (e) {
      clearInterval(odrag.timer);
      e = e || window.event;
      var sX = e.clientX,
          sY = e.clientY;

      this.onpointermove = function (e) {
        e = e || window.event;
        var nX = e.clientX,
            nY = e.clientY;
        desX = nX - sX;
        desY = nY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTranform(odrag);
        sX = nX;
        sY = nY;
      };

      this.onpointerup = function (e) {
        odrag.timer = setInterval(function () {
          desX *= 0.95;
          desY *= 0.95;
          tX += desX * 0.1;
          tY += desY * 0.1;
          applyTranform(odrag);
          playSpin(false);
          if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
            clearInterval(odrag.timer);
            playSpin(true);
          }
        }, 17);
        this.onpointermove = this.onpointerup = null;
      };

      return false;
    };

    document.onmousewheel = function(e) {
      e = e || window.event;
      var d = e.wheelDelta / 20 || -e.detail;
      radius += d;
      init(1);
    };
  }, []);

  return (
    <>
      <Head>
        <title>3D carousel Gallery</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.main}>
        <Music />
        <div id="drag-container" className={styles['drag-container']}>
          <div id="spin-container" className={styles['spin-container']}>
            <img src="https://iili.io/2Pi5qZX.md.jpg" alt="" />
            <img src="https://iili.io/2PiXRgS.th.jpg" alt="" />
            <img src="https://iili.io/2PikXne.th.jpg" alt="" />
            <img src="https://iili.io/HTjHKrl.jpg" alt="" />
            <img src="https://iili.io/2Pirx8G.th.jpg" alt="" />
            <img src="https://iili.io/2PiilsV.th.jpg" alt="" />
            <img src="https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
            
            <video 
              autoPlay 
              loop 
              playsInline
              controls
              className={styles['carousel-video']}
              onClick={(e) => {
                e.target.paused ? e.target.play() : e.target.pause();
              }}
            >
              <source src="https://video.gumlet.io/6745e593080b60408ca085f7/678d3af1f9807bdad9fd105d/download.mp4" type="video/mp4" />
            </video>

            <p>Love from Prasenjit 🔥</p>
          </div>
          <div id="ground" className={styles.ground}></div>
        </div>
        
        <a 
          href="https://github.com/StarKnightt/3D-Carousel" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles['github-button']}
        >
          Star on GitHub ⭐
        </a>
      </main>
    </>
  );
}
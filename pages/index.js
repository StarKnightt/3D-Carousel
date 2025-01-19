import { useEffect } from 'react';
import Head from 'next/head';
import Music from '@/components/Music';
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
      var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
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

    <main>
      <Music />
      <div id="drag-container">
        <div id="spin-container">
          <img src="https://iili.io/2Pi5qZX.md.jpg"/>
          <img src="https://iili.io/2PiXRgS.th.jpg" alt="" />
          <img src="https://iili.io/2PikXne.th.jpg" alt="" />
          <img src="https://iili.io/HTjHKrl.jpg" alt="" />
          <img src="https://iili.io/2Pirx8G.th.jpg" alt="" />
          <img src="https://iili.io/2PiilsV.th.jpg" alt="" />

          <a target="_blank" href="https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg">
            <img src="https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
          </a>

          <video 
            autoPlay 
            loop 
            playsInline
            controls
            className="carousel-video"
            onClick={(e) => {
              if (e.target.paused) {
                e.target.play();
              } else {
                e.target.pause();
              }
            }}
          >
            <source src="https://video.gumlet.io/6745e593080b60408ca085f7/678d3af1f9807bdad9fd105d/download.mp4" type="video/mp4" />
          </video>

          <p> Love from Prasenjit 🔥</p>
        </div>
        <div id="ground"></div>
      </div>
      
      <a 
        href="https://github.com/StarKnightt/3D-Carousel" 
        target="_blank" 
        rel="noopener noreferrer"
        className="github-button"
      >
        Star on GitHub ⭐
      </a>
    </main>

    <style jsx global>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html,
      body {
        height: 100vh;
        width: 100vw;
        touch-action: none;
      }

      main {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #111;
        -webkit-perspective: 1000px;
        perspective: 1000px;
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
      }

      #drag-container {
        position: relative;
        display: flex;
        margin: auto;
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
        -webkit-transform: rotateX(-10deg);
        transform: rotateX(-10deg);
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
      }

      #spin-container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
      }

      #drag-container img, #drag-container video {
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        line-height: 200px;
        font-size: 50px;
        text-align: center;
        -webkit-box-shadow: 0 0 8px #fff;
        box-shadow: 0 0 8px #fff;
        -webkit-box-reflect: below 10px linear-gradient(transparent, transparent, #0005);
        cursor: pointer;
      }

      #drag-container img:hover, #drag-container video:hover {
        -webkit-box-shadow: 0 0 15px #fffd;
        box-shadow: 0 0 15px #fffd;
        -webkit-box-reflect: below 10px linear-gradient(transparent, transparent, #0007);
      }

      #drag-container p {
        font-family: Serif;
        position: absolute;
        top: 100%;
        left: 50%;
        -webkit-transform: translate(-50%,-50%) rotateX(90deg);
        transform: translate(-50%,-50%) rotateX(90deg);
        color: #fff;
      }

      #ground {
        width: 900px;
        height: 900px;
        position: absolute;
        top: 100%;
        left: 50%;
        -webkit-transform: translate(-50%,-50%) rotateX(90deg);
        transform: translate(-50%,-50%) rotateX(90deg);
        background: -webkit-radial-gradient(center center, farthest-side , #9993, transparent);
      }

      #music-container {
        position: fixed;
        top: 0;
        left: 0;
        width: auto;
        height: auto;
      }

      @-webkit-keyframes spin {
        from{
          -webkit-transform: rotateY(0deg);
          transform: rotateY(0deg);
        } to{
          -webkit-transform: rotateY(360deg);
          transform: rotateY(360deg);
        }
      }

      @keyframes spin {
        from{
          -webkit-transform: rotateY(0deg);
          transform: rotateY(0deg);
        } to{
          -webkit-transform: rotateY(360deg);
          transform: rotateY(360deg);
        }
      }

      @-webkit-keyframes spinRevert {
        from{
          -webkit-transform: rotateY(360deg);
          transform: rotateY(360deg);
        } to{
          -webkit-transform: rotateY(0deg);
          transform: rotateY(0deg);
        }
      }

      @keyframes spinRevert {
        from{
          -webkit-transform: rotateY(360deg);
          transform: rotateY(360deg);
        } to{
          -webkit-transform: rotateY(0deg);
          transform: rotateY(0deg);
        }
      }

      #drag-container video {
        cursor: pointer;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      #drag-container video:hover {
        transform: scale(1.05) translateZ(20px);
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
      }

      .carousel-video {
        border-radius: 8px;
        object-fit: cover;
        filter: brightness(1.2) contrast(1.1);
        animation: fadeIn 0.5s ease;
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .carousel-video::-webkit-media-controls {
        background-color: rgba(0, 0, 0, 0.4);
        border-radius: 0 0 8px 8px;
      }

      .carousel-video::-webkit-media-controls-panel {
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .carousel-video:hover::-webkit-media-controls-panel {
        opacity: 1;
      }

      .carousel-video::-webkit-media-controls-timeline,
      .carousel-video::-webkit-media-controls-volume-slider {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 25px;
        height: 4px;
      }

      .github-button {
        position: fixed;
        bottom: 30px;
        padding: 12px 30px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        text-decoration: none;
        border-radius: 25px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-weight: 500;
        font-size: 16px;
        letter-spacing: 0.5px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        z-index: 1000;
      }

      .github-button:hover {
        background: rgba(255, 255, 255, 0.15);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
      }

      .github-button:active {
        transform: translateY(0);
        background: rgba(255, 255, 255, 0.2);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
    `}</style>
  </>
);
}
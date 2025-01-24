// components/Music.js
import { useState, useEffect, useRef } from 'react';
import styles from '@/styles/Carousel.module.css';

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isLoading, setIsLoading] = useState(true);
  const [trackInfo, setTrackInfo] = useState('');
  const [progress, setProgress] = useState(0);
  const playerRef = useRef(null);
  const widgetRef = useRef(null);

  useEffect(() => {
    const loadSoundCloudAPI = () => {
      return new Promise((resolve, reject) => {
        if (window.SC) {
          resolve(window.SC);
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://w.soundcloud.com/player/api.js';
        script.onload = () => resolve(window.SC);
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const initializeWidget = async () => {
      try {
        const SC = await loadSoundCloudAPI();
        if (playerRef.current) {
          widgetRef.current = SC.Widget(playerRef.current);
          
          widgetRef.current.bind(SC.Widget.Events.READY, () => {
            setIsLoading(false);
            widgetRef.current.getCurrentSound(sound => {
              setTrackInfo(sound.title);
            });
          });

          widgetRef.current.bind(SC.Widget.Events.PLAY, () => {
            setIsPlaying(true);
          });

          widgetRef.current.bind(SC.Widget.Events.PAUSE, () => {
            setIsPlaying(false);
          });

          widgetRef.current.bind(SC.Widget.Events.PLAY_PROGRESS, (data) => {
            setProgress(data.relativePosition * 100);
          });
        }
      } catch (error) {
        console.error('Failed to initialize SoundCloud Widget:', error);
        setIsLoading(false);
      }
    };

    initializeWidget();

    return () => {
      if (widgetRef.current) {
        widgetRef.current.unbind(SC.Widget.Events.READY);
        widgetRef.current.unbind(SC.Widget.Events.PLAY);
        widgetRef.current.unbind(SC.Widget.Events.PAUSE);
      }
    };
  }, []);

  const togglePlay = () => {
    if (!widgetRef.current) return;
    if (isPlaying) {
      widgetRef.current.pause();
    } else {
      widgetRef.current.play();
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (widgetRef.current) {
      widgetRef.current.setVolume(newVolume);
    }
  };

  return (
    <div className="music-player">
      <div className="controls">
        <button onClick={togglePlay} className="play-button">
          {isLoading ? 
            <span className="loading">⏳</span> : 
            isPlaying ? '⏸️' : '▶️'
          }
        </button>
        <div className="track-info">
          <div className="track-title">{trackInfo || 'Loading...'}</div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className="volume-control">
          <span>🔊</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
      </div>
      <iframe
        ref={playerRef}
        id="soundcloud-player"
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1763465181&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false"
      />
      <style jsx>{`
        .music-player {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 50px;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(5px);
          z-index: 1000;
          display: flex;
          align-items: center;
          padding: 0 20px;
        }

        .controls {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 15px;
        }

        .play-button {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 1.5rem;
          padding: 5px;
          transition: transform 0.2s;
        }

        .play-button:hover {
          transform: scale(1.1);
        }

        .track-info {
          flex: 1;
          margin: 0 15px;
        }

        .track-title {
          color: white;
          font-size: 0.9rem;
          margin-bottom: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .progress-bar {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }

        .progress {
          height: 100%;
          background: #ff5500;
          border-radius: 2px;
          transition: width 0.2s;
        }

        .volume-control {
          display: flex;
          align-items: center;
          gap: 8px;
          color: white;
        }

        .volume-slider {
          width: 80px;
          height: 4px;
        }

        .loading {
          animation: spin 1s infinite linear;
          display: inline-block;
        }

        iframe {
          display: none;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 600px) {
          .music-player {
            height: 40px;
          }
          .volume-slider {
            width: 60px;
          }
          .track-title {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Music;
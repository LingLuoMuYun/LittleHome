import { useEffect, useState } from 'react';
import { useMusic } from './MusicProvider';

const formatTime = (time: number): string => {
  if (!time || isNaN(time)) return "00:00";
  const m = Math.floor(time / 60).toString().padStart(2, '0');
  const s = Math.floor(time % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

export default function CloudPlayer({ href = '/music' }: { href?: string }) {
  const { playlist, currentSong, isPlaying, progress, currentTime, duration, currentLyric, isLoading, togglePlay, nextSong, prevSong, handleSeek } = useMusic();
  const [displayedLyric, setDisplayedLyric] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayedLyric("");
    const target = currentLyric || "";
    if (!target) return;

    const typingInterval = setInterval(() => {
      if (i <= target.length) {
        setDisplayedLyric(target.slice(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [currentLyric]);

  const safeTogglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    togglePlay();
  };

  const safePrevSong = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    prevSong();
  };

  const safeNextSong = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    nextSong();
  };

  const safeHandleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    handleSeek(e);
  };

  return (
    <>
      <style>{`
        .cp-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--accent);
          cursor: pointer;
          transition: transform 0.1s;
        }
        .cp-range::-webkit-slider-thumb:hover {
          transform: scale(1.3);
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .cp-disc {
          animation: spin-slow 6s linear infinite;
          animation-play-state: paused;
        }
        .cp-disc.playing {
          animation-play-state: running;
        }
      `}</style>

      <div className="cloud-player card">
        {isLoading ? (
          <div className="cp-loading">
            <div className="cp-spinner"></div>
            <span>连接中...</span>
          </div>
        ) : !currentSong || playlist.length === 0 ? (
          <div className="cp-empty">
            <span>暂无音乐</span>
          </div>
        ) : (
          <>
            <div className={`cp-glow ${isPlaying ? 'active' : ''}`}></div>

            <div className="cp-header">
              <div className={`cp-disc ${isPlaying ? 'playing' : ''}`}>
                <img src={currentSong.cover} alt="cover" referrerPolicy="no-referrer" />
                <div className="cp-disc-center"></div>
              </div>
              <div className="cp-info">
                <span className="cp-badge">CLOUD MUSIC</span>
                <h3 className="cp-title">{currentSong.title}</h3>
                <p className="cp-artist">{currentSong.artist}</p>
              </div>
            </div>

            <div className="cp-lyric">
              <p>{displayedLyric}</p>
            </div>

            <div className="cp-controls">
              <div className="cp-progress-row" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} onPointerDown={(e) => { e.stopPropagation(); }}>
                <span className="cp-time">{formatTime(currentTime)}</span>
                <input
                  type="range" min="0" max="100"
                  value={progress}
                  onChange={safeHandleSeek}
                  className="cp-range"
                  style={{ background: `linear-gradient(to right, var(--accent) ${progress}%, var(--border) ${progress}%)` }}
                />
                <span className="cp-time">{formatTime(duration)}</span>
              </div>

              <div className="cp-buttons">
                <button onClick={safePrevSong} className="cp-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
                </button>

                <button onClick={safeTogglePlay} className="cp-btn cp-play">
                  {isPlaying ? <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> : <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>}
                </button>

                <button onClick={safeNextSong} className="cp-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

CloudPlayer.styles = `
.cloud-player {
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  transition: var(--transition-theme);
}

.cp-loading, .cp-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  gap: 0.75rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.cp-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--accent);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.cp-glow {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 120px;
  height: 120px;
  background: var(--accent);
  opacity: 0.15;
  filter: blur(40px);
  border-radius: 50%;
  transition: opacity 0.5s;
}

.cp-glow.active {
  opacity: 0.3;
}

.cp-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cp-disc {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%);
  border: 2px solid rgba(255,255,255,0.3);
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
}

.cp-disc img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cp-disc-center {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(4px);
}

.cp-info {
  flex: 1;
  overflow: hidden;
}

.cp-badge {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--accent);
  background: var(--accent-light);
  padding: 0.2em 0.6em;
  border-radius: 6px;
  display: inline-block;
}

.cp-title {
  font-size: 1rem;
  font-weight: 700;
  margin: 0.4rem 0 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cp-artist {
  font-size: 0.82rem;
  color: var(--text-secondary);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cp-lyric {
  height: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cp-lyric p {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--accent);
  margin: 0;
  white-space: nowrap;
}

.cp-controls {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cp-progress-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  color: var(--text-secondary);
  font-weight: 600;
}

.cp-time {
  min-width: 36px;
  text-align: center;
}

.cp-range {
  flex: 1;
  height: 4px;
  border-radius: 2px;
  appearance: none;
  outline: none;
  cursor: pointer;
}

.cp-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
}

.cp-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.cp-btn:hover {
  color: var(--accent);
  background: var(--accent-light);
}

.cp-play {
  width: 48px;
  height: 48px;
  background: var(--accent);
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.cp-play:hover {
  background: var(--accent-dark);
  color: white;
  transform: scale(1.05);
}
`;
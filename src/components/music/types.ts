// 类型定义
export interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  src: string;
  lyrics: { time: number; text: string }[];
}

export type PlayMode = 'loop' | 'single' | 'random';

export interface MusicContextType {
  playlist: Song[];
  currentIndex: number;
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  currentLyric: string;
  isLoading: boolean;
  volume: number;
  isMuted: boolean;
  playMode: PlayMode;

  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  playSong: (index: number) => void;
  setVolume: (value: number) => void;
  toggleMute: () => void;
  togglePlayMode: () => void;
}
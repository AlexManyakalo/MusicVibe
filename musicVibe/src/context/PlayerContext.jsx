import { createContext, useRef, useState, useEffect, useCallback } from "react";

export const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // Инициализация аудио
  useEffect(() => {
    const audio = audioRef.current;

    function handleLoadedMetadata() {
      setDuration(audio.duration);
    }

    function handleTimeUpdate() {
      setCurrentTime(audio.currentTime);
    }

    function handleEnded() {
      setIsPlaying(false);
      setCurrentTime(0);
      nextTrack();
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Воспроизведение нового трека
  const playTrack = useCallback(
    (track, tracks = []) => {
      const audio = audioRef.current;

      if (currentTrack?.id === track.id) {
        togglePlayPause();
        return;
      }

      setCurrentTrack(track);
      setQueue(tracks);
      setCurrentIndex(tracks.findIndex(t => t.id === track.id));
      audio.src = track.audioUrl;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    },
    [currentTrack],
  );

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;

    if (!currentTrack) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  }, [isPlaying, currentTrack]);

  const seek = useCallback(time => {
    const audio = audioRef.current;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  }, []);

  const nextTrack = useCallback(() => {
    if (queue.length === 0 || currentIndex === -1) return;

    const nextIndex = (currentIndex + 1) % queue.length;
    const nextTrack = queue[nextIndex];

    setCurrentIndex(nextIndex);
    setCurrentTrack(nextTrack);
    audioRef.current.src = nextTrack.audioUrl;
    audioRef.current.play().catch(console.error);
  }, [queue, currentIndex]);

  const previousTrack = useCallback(() => {
    if (queue.length === 0 || currentIndex === -1) return;

    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    const prevTrack = queue[prevIndex];

    setCurrentIndex(prevIndex);
    setCurrentTrack(prevTrack);
    audioRef.current.src = prevTrack.audioUrl;
    audioRef.current.play().catch(console.error);
  }, [queue, currentIndex]);

  return (
    <PlayerContext.Provider
      value={{
        audio: audioRef.current,
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        isMuted,
        playTrack,
        togglePlayPause,
        seek,
        toggleMute,
        nextTrack,
        previousTrack,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

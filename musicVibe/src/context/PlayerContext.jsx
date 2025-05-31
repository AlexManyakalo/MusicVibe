import { createContext, useRef, useState, useEffect, useCallback } from "react";

export const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());

  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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
      // Здесь можно вызвать nextTrack() если будет очередь
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
    track => {
      const audio = audioRef.current;

      if (currentTrack?.id === track.id) {
        togglePlayPause();
        return;
      }

      setCurrentTrack(track);
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

  const nextTrack = useCallback(() => {
    // можно подключить очередь треков
    console.log("nextTrack() — заглушка");
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        audio: audioRef.current,
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        playTrack,
        togglePlayPause,
        seek,
        nextTrack,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

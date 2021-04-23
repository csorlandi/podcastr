import { createContext, ReactNode, useContext, useState } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  hasPrevious: boolean;
  hasNext: boolean;
  play: (episodes: Episode) => void;
  playList: (list: Episode[], episodeIndex: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
}

type PlayerContextProviderProps = {
  children: ReactNode;
}

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episodes: Episode) {
    setEpisodeList([episodes]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], episodeIndex: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(episodeIndex);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = (currentEpisodeIndex + 1) < episodeList.length;

  function playNext() {
    if (!hasNext) return;
    setCurrentEpisodeIndex(currentEpisodeIndex + 1);
  }

  function playPrevious() {
    if (!hasPrevious) return;
    setCurrentEpisodeIndex(currentEpisodeIndex - 1);
  }

  return (
    <PlayerContext.Provider value={{
      episodeList,
      currentEpisodeIndex,
      isPlaying,
      hasNext,
      hasPrevious,
      play,
      playList,
      playNext,
      playPrevious,
      togglePlay,
      setPlayingState,
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  return useContext(PlayerContext);
}
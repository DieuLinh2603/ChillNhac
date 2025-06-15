import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const preSongRef = useRef<string | null>(null);

  const { currentSong, isPlaying, playNext} = usePlayerStore();

  //Phát/ dừng
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  //Tự động chuyển bài tiếp theo sau khi bài hiện tại hết
  useEffect(() => {
    const audio = audioRef.current;

    const hanldeEnded = () => {
      playNext()
    }
    audio?.addEventListener("ended", hanldeEnded)

    return() => audio?.removeEventListener("ended", hanldeEnded);
  },[playNext])

  //Chọn bài đó thì phát tại đọan đã nghe trước đó
  useEffect(() => {
    if(!audioRef.current || !currentSong) return;
    const audio = audioRef.current;
    //check if this is actually a new song
    const isSongChange = preSongRef.current !== currentSong?.audioUrl;
    if(isSongChange){
      audio.src = currentSong?.audioUrl;
      //reset lại thời gian phát về 0
      audio.currentTime = 0;

      preSongRef.current = currentSong?.audioUrl;
      if(isPlaying) audio.play();
    }

  },[currentSong, isPlaying])
  return <audio ref={audioRef}/>;
};

export default AudioPlayer;

import type { Song } from "@/types";
import {create} from "zustand"
import { useChatStore } from "./useChatStore";


interface PlayStore {
    currentSong: Song | null;
    isPlaying: boolean;
    queue: Song[];
    currentIndex: number;

    initializeQueue: (song: Song[]) => void;

    // Phát bài hát được chọn trong album
    playAlbum: (song: Song[], startIndex?: number) => void;

    setCurrentSong: (song: Song | null) => void

    // bắt đầu or dừng lại
    togglePlay: () => void;
    //Phát bài tiếp
    playNext: () => void;
    // Phát bài trước
    playPrevious: () => void
}

export const usePlayerStore = create<PlayStore>((set,get) => ({
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIndex: -1,

    
    initializeQueue: (songs: Song[]) => {
        set({
            queue: songs, 
            currentSong: get().currentSong || songs[0],
            currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex
        })
    },

// Phát bài hát được chọn trong album
    playAlbum: (songs: Song[], startIndex = 0) => {
        if(songs.length == 0) return;
        
        const song = songs[startIndex];

        const socket = useChatStore.getState().socket;
		if (socket.auth) {
			socket.emit("update_activity", {
				userId: socket.auth.userId,
				activity: `Playing ${song.tieuDe} by ${song.ngheSi}`,
			});
		}

        set({
            queue: songs, 
            currentSong: song,
            currentIndex: startIndex,
            isPlaying: true
        })
    },
    setCurrentSong: (song: Song | null) => {
        if(!song) return;
        const songIndex = get().queue.findIndex(s => s._id === song._id);

        const socket = useChatStore.getState().socket;
		if (socket.auth) {
			socket.emit("update_activity", {
				userId: socket.auth.userId,
				activity: `Playing ${song.tieuDe} by ${song.ngheSi}`,
			});
		}

        set({
            currentSong: song,
            isPlaying: true,
            currentIndex: songIndex !== -1 ? songIndex: get().currentIndex,
        })
    },

 // bắt đầu or dừng lại
    togglePlay: () => {
        const willStartPlaying = !get().isPlaying;

        //Lấy bài hát hiện tại đang phát từ store - Zustand 
        //thông báo cho server biết rằng người dùng đang làm gì
        const currentSong = get().currentSong;
		const socket = useChatStore.getState().socket;
		if (socket.auth) {
			socket.emit("update_activity", {
				userId: socket.auth.userId,
				activity:
					willStartPlaying && currentSong ? `Playing ${currentSong.tieuDe} by ${currentSong.ngheSi}` : "Không nghe nhạc",
			});
		}
        set({
            isPlaying: willStartPlaying
        }) 
    },

//Phát bài tiếp theo     
    playNext: () => {

        const {currentIndex, queue} = get();
        const nextIndex = currentIndex + 1;

        //if there is a next song to pkay, let's play it
        if(nextIndex < queue.length){
            const nextSong = queue[nextIndex];

            const socket = useChatStore.getState().socket;
			if (socket.auth) {
				socket.emit("update_activity", {
					userId: socket.auth.userId,
					activity: `Playing ${nextSong.tieuDe} by ${nextSong.ngheSi}`,
				});
			}
            set({
                currentSong: nextSong,
                currentIndex: nextIndex,
                isPlaying: true,
            });
        } else {
            //không có bài tiếp theo
            set({isPlaying: false});

            const socket = useChatStore.getState().socket;
			if (socket.auth) {
				socket.emit("update_activity", {
					userId: socket.auth.userId,
					activity: `Không nghe nhạc`,
				});
			}
        }
    },

//Phát bài trước đó
    playPrevious: () => {
        const {currentIndex, queue} = get();
        const prevIndex = currentIndex - 1;

        if(prevIndex >= 0)
        {
            const preSong = queue[prevIndex];

            const socket = useChatStore.getState().socket;
			if (socket.auth) {
				socket.emit("update_activity", {
					userId: socket.auth.userId,
					activity: `Playing ${preSong.tieuDe} by ${preSong.ngheSi}`,
				});
			}
            set({
                currentSong: preSong,
                currentIndex: prevIndex,
                isPlaying: true
            })
        } else{
            set({isPlaying: false});

            const socket = useChatStore.getState().socket;
			if (socket.auth) {
				socket.emit("update_activity", {
					userId: socket.auth.userId,
					activity: `Không nghe nhạc`,
				});
			}
        }
    },

}))
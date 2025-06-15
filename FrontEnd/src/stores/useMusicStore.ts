import { axiosInstance } from "@/lib/axios";
import type { Album, Song, ThongKe } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";

interface MusicStore {
  songs: Song[];
  albums: Album[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  featuredSongs: Song[];
  madeForYouSongs: Song[];
  trendingSongs: Song[];
  thongke: ThongKe;
  searchResults: {
    songs: Song[];
    albums: Album[];
    
  };
  query: string | null;

  setQuery: (query : string) => void;
  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  fetchThongKe: () => Promise<void>;
  fetchSongs: () => Promise<void>;
  deleteSong: (id: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
  searchSongs: (is: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  madeForYouSongs: [],
  featuredSongs: [],
  trendingSongs: [],
  //bên index.ts
  thongke: {
    tongBaiHat: 0,
    tongAlbum: 0,
    tongNgheSi: 0,
    tongNguoiDung: 0,
  },

  searchResults: {
    songs: [],
    albums: [],
  },

  query: null,

  setQuery: (query : string) => set({ query: query }),

  fetchAlbums: async () => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      const response = await axiosInstance.get("/albums");
      set({ albums: response.data });
      //console.log(response)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAlbumById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/albums/${id}`);
      set({ currentAlbum: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFeaturedSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/songs/dac-sac`);
      set({ featuredSongs: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchMadeForYouSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/songs/danh-cho-ban`);
      set({ madeForYouSongs: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchTrendingSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/songs/thinh-hanh`);
      set({ trendingSongs: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchThongKe: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/thongke");
      set({ thongke: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs");
      set({ songs: response.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteSong: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/songs/${id}`);
      set((state) => ({
        songs: state.songs.filter((song) => song._id !== id),
      }));
      toast.success("Xóa bài hát thành công!");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Xóa bài hát không thành công!");
    } finally {
      set({ isLoading: false });
    }
  },

  deleteAlbum: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // Gửi yêu cầu xóa album
      await axiosInstance.delete(`/admin/album/${id}`);

      // Cập nhật lại state albums và songs
      set((state) => ({
        albums: state.albums.filter((album) => album._id !== id),
        songs: state.songs.map((song) =>
          song.albumId === id ? { ...song, album: null } : song
        ),
      }));
      toast.success("Xóa album thành công!");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Xóa album không thành công!");
    } finally {
      set({ isLoading: false });
    }
  },

  searchSongs: async (query: string) => {
    console.log(query);
    set({
      isLoading: true,
      error: null,
      searchResults: { songs: [], albums: [] },
    });
    try {
      const response = await axiosInstance.get(`/search?q=${query}`);
      console.log(response);
      set({ searchResults: response.data });
      
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Lỗi khi tìm kiếm" });
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
    
  },
}));

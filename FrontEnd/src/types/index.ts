export interface Song {
    _id: string;
    tieuDe: string;
    ngheSi: string;
    albumId: string | null;
    imageUrl: string;
    audioUrl: string;
    thoiGian: number;
    createdAt: string;
    updatedAt: string;
}

export interface Album {
    _id: string;
    tieuDe: string;
    ngheSi: string;
    imageUrl: string,
    namPhatHanh: number;
    songs: Song[];

}

export interface ThongKe {
    tongBaiHat: number;
    tongAlbum: number;
    tongNgheSi : number;
    tongNguoiDung: number;

}


export interface Message {
    _id: string,
    id_NguoiGui: string,
    id_NguoiNhan: string,
    noiDung: string,
    createdAt: string,
    updateAt: string,

}

export interface User {
    _id: string,
    clerkId: string,
    fullName: string,
    imageUrl: string,

}
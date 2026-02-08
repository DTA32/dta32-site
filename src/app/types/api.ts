export interface ResponseTemplate<T>{
    status: string;
    data: T;
    message: string | null;
}

export interface PlayingData {
    is_playing: boolean;
    playing_data: {
        timestamp: number;
        progress: number;
        type: string;
        item: {
            album: {
                href: string;
                imageUrl: string;
                name: string;
            };
            artist: {
                href: string;
                name: string;
            };
            duration: number;
            href: string;
            name: string;
        } | null;
    } | null;
}

export interface TopTracksResponse {
    period: string;
    tracks: TrackItem[];
}

export interface TrackItem {
    rank: number;
    imageUrl: string;
    title: string;
    artist: string;
    link: string;
}
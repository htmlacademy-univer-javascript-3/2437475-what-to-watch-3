export type Detail = {
    filmId: string;
    director: string;
    actors: string[];
    duration: {
        hours: number;
        minutes: number;
    };
    genre: string;
    year: number;
    poster: string;
    bigImage: string;
    description: string;
    rating: number;
    ratingDescription: string;
    votes: number;
    video: string;
    isFavorite: boolean;
}

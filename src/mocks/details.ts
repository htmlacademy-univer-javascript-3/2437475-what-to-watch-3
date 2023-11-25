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
    bigImage: string;
}

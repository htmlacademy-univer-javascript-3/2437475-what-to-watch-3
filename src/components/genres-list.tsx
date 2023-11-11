import { Film } from "../mocks/films";
import { Detail } from '../mocks/details';


type GenreListProps = {
 details: Detail[];
 activeGenre: string;
 onGenreChange: (genre: string) => void;
}

export function GenreList ({ details, activeGenre, onGenreChange }: GenreListProps) {
    const genres = Array.from(new Set(details.map(detail => detail.genre)));
    genres.unshift('All genres');
   
    return (
       <ul className="catalog__genres-list">
       {genres.map(genre => (
         <li key={genre} className={`catalog__genres-item ${genre === activeGenre ? 'catalog__genres-item--active' : ''}`}>
           <button className="catalog__genres-link" onClick={() => onGenreChange(genre)}>
             {genre}
           </button>
         </li>
       ))}
     </ul>
    );
}

export const getMoviesByGenre = (films: Film[], details: Detail[], genre: string) => {
    if (genre === 'All genres') {
     return films;
    }
   
    const detailIds = details
     .filter(detail => detail.genre === genre)
     .map(detail => detail.filmId);
   
    return films.filter(film => detailIds.includes(film.id));
   };
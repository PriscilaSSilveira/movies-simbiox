import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import './Search.css';

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;
const imagesURL = import.meta.env.VITE_IMG;

const Search = (showLink = true) => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const [topMovies, setTopMovies] = useState([] as any[]);
    const [expandedMovieId, setExpandedMovieId] = useState(null);

    const getSearchedMovies = async (url: any) => {
        const res = await fetch(url);
        const data = await res.json();
        setTopMovies(data.results);
    };

    useEffect(() => {
        const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`;
        getSearchedMovies(searchWithQueryURL);
    }, [query]);

    const toggleMovieDetails = (movieId: any) => {
        setExpandedMovieId(expandedMovieId === movieId ? null : movieId);
    };

    return (
        <div className="container">
            <h2 className="title">
                Resultados para: <span className="query-text">{query}</span>
            </h2>
            <div className="movies-container">
                {topMovies.length > 0 &&
                    topMovies.map((movie) => (
                        <div key={movie.id} className="movie-container">
                            <div className={`movie-image ${expandedMovieId === movie.id ? 'expanded' : ''}`}>
                                <img
                                    src={imagesURL + movie.poster_path}
                                    alt={movie.title}
                                    onMouseEnter={() => toggleMovieDetails(movie.id)}
                                    onMouseLeave={() => toggleMovieDetails(null)}
                                />
                                <div className="movie-details">
                                    <p>{movie.overview}</p>
                                </div>
                            </div>
                            <div className="movie-info">
                                <p className="info">{movie.title}</p>
                                <p className="info">
                                    <FaStar /> {movie.vote_average}
                                </p>
                                {showLink && (
                                    <div className="button-container">
                                        <Link to={`/movie/${movie.id}`} className="saiba-mais-button">
                                            Informações
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Search;

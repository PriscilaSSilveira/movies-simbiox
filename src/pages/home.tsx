import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import './home.css'
import CustomPagination from "../components/Pagination";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const imagesURL = import.meta.env.VITE_IMG;
const Home = (showLink = true) => {
    const [topMovies, setTopMovies] = useState([] as any[]);
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedMovieId, setExpandedMovieId] = useState(null);

    const getTopRatedMovies = async (url: any) => {
        const res = await fetch(url);
        const data = await res.json();
        setTopMovies(data.results);
    };

    useEffect(() => {
        const topRatedUrl = `${moviesURL}top_rated?${apiKey}`;
        console.log(topRatedUrl);
        getTopRatedMovies(topRatedUrl);
    }, []);

    const handlePageChange = (page: any) => {
        setCurrentPage(page);
        setExpandedMovieId(null);
    };

    const toggleMovieDetails = (movieId: any) => {
        setExpandedMovieId(expandedMovieId === movieId ? null : movieId);
    };

    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMovies = topMovies.slice(startIndex, endIndex);

    return (
        <div className="container">
            <h2 className="title">Melhores filmes:</h2>
            <div className="movies-container">
                {currentMovies.length > 0 &&
                    currentMovies.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            <img
                                src={imagesURL + movie.poster_path}
                                alt={movie.title}
                                onMouseEnter={() => toggleMovieDetails(movie.id)}
                                onMouseLeave={() => toggleMovieDetails(null)}
                            />
                            <div className={`movie-details ${expandedMovieId === movie.id ? 'expanded' : ''}`}>
                                <p>{movie.overview}</p>
                            </div>
                            <p className="info">{movie.title}</p>
                            <p className="info">
                                <FaStar /> {movie.vote_average}
                            </p>
                            <div className="button-container">
                                <button className="saiba-mais-button">
                                    {showLink && <Link to={`/movie/${movie.id}`}>Informações</Link>}
                                </button>
                            </div>
                        </div>
                    ))}
                <div className="CustomPagination">
                    <CustomPagination
                        count={Math.ceil(topMovies.length / itemsPerPage)}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;

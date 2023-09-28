import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BsWallet2,
  BsGraphUp,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";
import "./movies.css";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const imagesURL = import.meta.env.VITE_IMG;

const Movies = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);

  const getMovie = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovie(data);
  };

  const formatCurrency = (number: number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?${apiKey}`;
    getMovie(movieUrl);
  }, [id]);

  return (
    <div className="container">
      <h2 className="title">Filme:</h2>
      {movie && (
        <div className="movie-info">
          <div className="movie-image">
            <img className="movie-img" src={imagesURL + movie.poster_path} alt={movie.title} />
          </div>
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">
                <BsWallet2 />
              </div>
              <div className="info-text">
                <h3>Orçamento</h3>
                <p>{formatCurrency(movie.budget)}</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <BsGraphUp />
              </div>
              <div className="info-text">
                <h3>Receita</h3>
                <p>{formatCurrency(movie.revenue)}</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <BsHourglassSplit />
              </div>
              <div className="info-text">
                <h3>Duração</h3>
                <p>{movie.runtime} minutos</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <BsFillFileEarmarkTextFill />
              </div>
              <div className="info-text">
                <h3>Descrição</h3>
                <p>{movie.overview}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;

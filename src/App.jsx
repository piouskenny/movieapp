import { useState, useEffect } from "react";
import SearchIcon from "./search.svg";
import MovieCard from "./components/movieCard";

const API_URL = "https://www.omdbapi.com/?apikey=ca21ac3d";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);

    const data = await response.json();

    if (data.Response === "True") {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  useEffect(() => {
    searchMovies("new");
  }, []);

  const seacrhButton = () => {
    searchMovies(`${searchTerm}`);
  };

  return (
    <div className="app">
      <h1>PiousMovies</h1>
      <div className="search">
        <input
          type="text"
          placeholder="search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="Search icon"
          onClick={() => seacrhButton()}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;

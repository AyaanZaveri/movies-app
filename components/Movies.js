import React, { useState, useEffect } from "react";
import axios from "axios";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  const [query, setQuery] = useState("");

  const TOP_API =
    "https://api.themoviedb.org/4/discover/movie?api_key=cbf7e1167c533eaa4ed56af5cd8aeb85&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";
  const SEARCH_API =
    "https://api.themoviedb.org/4/search/movie?api_key=cbf7e1167c533eaa4ed56af5cd8aeb85&query=";

  const getMovies = (API) => {
    axios.get(API).then((response) => setMovies(response.data.results));
  };

  useEffect(() => {
    getMovies(TOP_API);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      getMovies(SEARCH_API + query);
    } else {
      getMovies(TOP_API);
    }
  };

  const dateString = (dateNum) => {
    const date = new Date(dateNum).toString();
    return `${date.slice(4, 15)}`;
  };

  return (
    <div>
      <div className="flex flex-row justify-start font-bold p-5 border-b text-slate-700 bg-slate-50">
        <form onSubmit={handleSubmit} className="w-full">
          <input
            value={query}
            placeholder="Search..."
            className="flex items-center justify-center p-2 w-80 rounded-lg border shadow-sm outline-none"
            onChange={(e) => setQuery(e.target.value)}
          ></input>
        </form>
      </div>

      <h1 className="flex items-center justify-center text-3xl font-bold text-slate-700 mt-5">
        Top Movies
      </h1>

      <div className="flex flex-row flex-wrap justify-center gap-y-5 gap-x-8 mt-5">
        {movies.map((movie) => {
          return (
            <div
              className={`flex flex-row md:w-[26rem] w-80 font-semibold text-left border bg-slate-50 hover:bg-slate-100 rounded-lg shadow-sm transition-colors cursor-pointer`}
              onClick={() => {location.href = `/movie/${movie.id}`}}
            >
              <img
                className="w-32 h-auto rounded-l-lg shadow-sm"
                src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
              ></img>
              <div className="flex flex-col p-2 ml-1">
                <span className="font-bold text-slate-700 hover:text-slate-800 hover:underline transition-colors">
                  {movie.original_title}
                </span>
                <span className="font-normal text-slate-500">
                  {dateString(movie.release_date)}
                </span>
                <div className="mt-1">
                  <span className="font-normal text-slate-500 py-0.5 px-1.5 bg-slate-100 ring-1 ring-gray-200 rounded dark:ring-gray-600">
                    {movie.vote_average}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Movies;
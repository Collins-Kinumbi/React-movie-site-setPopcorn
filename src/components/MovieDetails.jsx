import { useState, useEffect, useRef } from "react";
import Loader from "./Loader";
import StarRating from "./StarRating";
import { KEY } from "../App";

function MovieDetails({
  selectedId,
  handleCloseMovie,
  handleAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const count = useRef(0);
  useEffect(() => {
    if (userRating) count.current = count.current + 1;
  }, [userRating]);

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Year: year,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await response.json();
      // console.log(data);
      setMovie(data);
      setIsLoading(false);
    };
    getMovieDetails();
  }, [selectedId]);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: count.current,
    };
    handleAddWatched(newWatchedMovie);
    handleCloseMovie();
  }

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  useEffect(() => {
    function func(e) {
      // console.log(e);
      if (e.code === "Escape") {
        handleCloseMovie();
      }
    }
    document.addEventListener("keydown", func);

    return function () {
      document.removeEventListener("keydown", func);
    };
  }, [handleCloseMovie]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleCloseMovie}>
              ⬅
            </button>

            <img src={poster} alt={`poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <p
                  style={{
                    // alignContent: "center",
                    fontWeight: "bold",
                    fontSize: "18px",
                    letterSpacing: "1px",
                  }}
                >
                  You rated this movie a {watchedUserRating}🌟
                </p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      +Add to list
                    </button>
                  )}
                </>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <br />
            <p>Directed by {director}</p>
          </section>
        </>
      )}

      {/* {selectedId} */}
    </div>
  );
}

export default MovieDetails;

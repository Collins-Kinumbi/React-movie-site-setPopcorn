import Movie from "./components/Movie";

function MovieList({ movies, handleSelectMovie }) {
  return (
    <>
      <ul className="list list-movies">
        {movies?.map((movie) => (
          <Movie
            movie={movie}
            key={movie.imdbID}
            handleSelectMovie={handleSelectMovie}
          />
        ))}
      </ul>
    </>
  );
}

export default MovieList;

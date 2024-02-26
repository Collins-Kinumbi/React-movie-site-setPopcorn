import { useEffect, useState } from "react";

export const KEY = "712040f4";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    callback?.();

    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!response.ok) throw new Error("Something went wrong ☹");

        const data = await response.json();
        if (data.Response === "False") throw new Error("No movie found!");

        // console.log(data);
        setMovies(data.Search);
        setIsLoading(false);
        setError("");
      } catch (error) {
        // console.error(error.message);
        if (error.name !== "AbortError") {
          setError(error.message, "😐");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchData();

    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}

import { useEffect, useRef } from "react";

function Search({ query, setQuery }) {
  const inputElement = useRef(null);

  useEffect(() => {
    const enter = (e) => {
      if (document.activeElement === inputElement.current) return;

      if (e.code === "Enter") {
        inputElement.current.focus();
        setQuery("");
      }
    };
    document.addEventListener("keydown", enter);
    return () => document.addEventListener("keydown", enter);
  }, [setQuery]);

  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
        ref={inputElement}
      />
    </>
  );
}

export default Search;

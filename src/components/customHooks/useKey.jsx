import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(() => {
    function func(e) {
      // console.log(e);
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }
    document.addEventListener("keydown", func);

    return function () {
      document.removeEventListener("keydown", func);
    };
  }, [action, key]);
}

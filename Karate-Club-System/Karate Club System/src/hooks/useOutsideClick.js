import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

export function useOutesideClick(handler, listenCapturing = true) {
  const [searchParams, setSearchParams] = useSearchParams();

  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
          searchParams.set("page2", 1);
          setSearchParams(searchParams);
        }
      }
      document.addEventListener("click", handleClick, true);

      return () => document.removeEventListener("click", handleClick);
    },
    [handler, listenCapturing]
  );
  return ref;
}

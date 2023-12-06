import { useEffect } from "react";

const useSlide = (
  dependency: boolean,
  ref: React.MutableRefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    if (dependency === true && ref.current) {
      ref.current.scroll({
        left: ref.current.offsetWidth,
        behavior: "smooth",
      });
    }
  }, [dependency]);

  return useSlide;
};

export default useSlide

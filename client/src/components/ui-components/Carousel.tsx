import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Flex, Image } from "@chakra-ui/react";

interface iCarousel {
  imgs: string[];
}

const Carousel = ({ imgs }: iCarousel) => {

    const [infiniteImgs, setInfiniteImgs] = useState([...imgs])
  const [showImg, setShowImg] = useState(0);
  const imgSliderRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (imgSliderRef.current) {
      imgSliderRef.current.scroll({
        left: imgSliderRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [showImg, imgs]);

  useEffect(() => {
      const timeoutId = setTimeout(() => {
        setInfiniteImgs([...infiniteImgs, infiniteImgs[showImg]])
      setShowImg((prevShowImg) => prevShowImg + 1);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [showImg]);

  return (
    <Flex width={"100%"} overflowX={"hidden"} ref={imgSliderRef}>
      {infiniteImgs.map((img, i) => (
        <Flex key={i} minWidth={"100%"}>
          <Image src={img} width={"100%"} />
        </Flex>
      ))}
    </Flex>
  );
};

export default Carousel;


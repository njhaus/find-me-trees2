import { useEffect, useState, useRef } from "react";

import { Box } from "@chakra-ui/react";

import LandingArticle from "./LandingArticle";
import ArticleImgScroll from "./ArticleImgScroll";

import { articles } from "./data/articleData";

import '../styles/landing.css'

const LandingArticlesAll = () => {
  const [visibleImg, setVisibleImg] = useState(0);

  const imgs: string[] = articles.map((a) => a.imgUrl);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    const articleContainer = scrollRef.current;
    if (articleContainer) {
      const nextArticle = (visibleImg * window.innerHeight + window.innerHeight / 2) * -1;
      const lastArticle =
        ((visibleImg - 1) * window.innerHeight + window.innerHeight / 2) * -1;
      const position = articleContainer.getBoundingClientRect();
      if (position.top < 0) {
        if (visibleImg + 1 < imgs.length && position.top < nextArticle) {
          setVisibleImg(visibleImg + 1);
        } else if (visibleImg - 1 >= 0 && position.top > lastArticle) {
          setVisibleImg(visibleImg - 1);
        } 
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window?.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]); 

  return (
    <Box
      className="landing-articles"
      ref={scrollRef}
      width={"100%"}
      position={"relative"}
      bg={"secondary.100"}
    >
      {articles.map((a) => (
        <LandingArticle
          key={a.id}
          title={a.title}
          description={a.description}
          imgUrl={a.imgUrl}
          cta={a.cta}
          link={a.link}
        >
          {a.children &&
            a.children.map((child, i) => <Box key={i}>{child}</Box>)}
        </LandingArticle>
      ))}
      <ArticleImgScroll imgs={imgs} visibleImg={visibleImg} />
    </Box>
  );
};

export default LandingArticlesAll;

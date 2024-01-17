import {
  Flex,
} from "@chakra-ui/react";
import ArticleImage from "./ArticleImage";
import ArticleContent from "./ArticleContent";

export interface LandingArticleProps {
  title: string;
  description: string;
  imgUrl: string;
  cta: string;
  link: string;
  children?: JSX.Element[];
}

const LandingArticle = ({
  title,
  description,
  imgUrl,
  cta,
  link,
  children,
}: LandingArticleProps) => {
  return (
    <Flex
      as="article"
      width={"100%"}
      minHeight={"95vh"}
      justifyContent={"space-around"}
      flexWrap={"wrap"}
      
    >
      <ArticleContent
        title={title}
        description={description}
        cta={cta}
        link={link}
        children={children}
      />
      <ArticleImage imgUrl={imgUrl} />
    </Flex>
  );
};

export default LandingArticle;

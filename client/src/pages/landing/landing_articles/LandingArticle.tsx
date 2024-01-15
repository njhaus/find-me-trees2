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
  children?: JSX.Element[];
}

const LandingArticle = ({
  title,
  description,
  imgUrl,
  cta,
  children,
}: LandingArticleProps) => {
  return (
    <Flex
      as="article"
      width={"100%"}
      height={"95vh"}
      justifyContent={"space-around"}
      flexWrap={"wrap"}
      
    >
      <ArticleContent
        title={title}
        description={description}
        cta={cta}
        children={children}
      />
      <ArticleImage imgUrl={imgUrl} />
    </Flex>
  );
};

export default LandingArticle;

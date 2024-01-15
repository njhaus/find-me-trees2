import { v4 as uuidv4 } from "uuid";

import FindTreesArticle from "../article_children/FindTreesArticle";

export class Article {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
  cta: string;
  children?: JSX.Element[];
  constructor(
    id: string,
    title: string,
    description: string,
    imgUrl: string,
    cta: string,
    children?: JSX.Element[]
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imgUrl = imgUrl;
    this.cta = cta;
    this.children = children;
  }
}

const findTreesChildren: JSX.Element[] = [<FindTreesArticle />];

// const mapArticles: JSX.Element[] = [<MapArticle />];

const findTreesArticle = new Article(
  uuidv4(),
  "Find Trees Anywhere",
  "Search for trees by their physical traits, location, or both.",
  "../../../public/find-trees.png",
  "Find Trees!",
  findTreesChildren
);
const mapArticle = new Article(
  uuidv4(),
  "Map Your Finds",
  "Plot your finds on a map to keep track of the trees you find.",
  "../../../public/tree-map.png",
  "Log in to begin"
);
const favoriteArticle = new Article(
  uuidv4(),
  "Save Your Favorite Trees",
  "Remember your favorite trees and visit them again!",
  "../../../public/tree-hug.png",
  "Log in to begin"
);

export const articles: Article[] = [
  findTreesArticle,
  mapArticle,
  favoriteArticle,
];

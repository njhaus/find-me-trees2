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
  "Search for trees by physical traits, location, or both.",
  "../../../src/assets/placeholder-1.jpeg",
  "Find Trees!",
  findTreesChildren
);
const mapArticle = new Article(
  uuidv4(),
  "Map Your Finds",
  "Plot your finds on a map to keep track of your find.",
  "../../../src/assets/placeholder-2.jpeg",
  "Log in to begin"
);
const favoriteArticle = new Article(
  uuidv4(),
  "Save Your Favorite Trees",
  "Keep track of your favorites and visit them again!",
  "../../../src/assets/placeholder-3.jpeg",
  "Log in to begin"
);

export const articles: Article[] = [
  findTreesArticle,
  mapArticle,
  favoriteArticle,
];

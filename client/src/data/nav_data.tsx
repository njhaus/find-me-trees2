import About from "../pages/about/About";
import Browse from "../pages/browse/Browse";

interface Link {
  text: string;
  to: string;
}

const links: Link[] = [
  {
    text: "Find Trees",
    to: "/browse",
  },
  {
    text: "My Trees",
    to: "/user/test",
  },
  {
    text: "Tree Test",
    to: "/tree/test",
  },
  {
    text: "About",
    to: "/about",
  },
];

export default links;

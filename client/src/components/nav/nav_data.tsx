
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
    to: "/user",
  },
  {
    text: "About",
    to: "/about",
  },
];

export default links;

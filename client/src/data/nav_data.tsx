
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
  // {
  //   text: "Tree Test",
  //   to: "/tree/656f7f726bf52aa3c8cb540d",
  // },
  {
    text: "About",
    to: "/about",
  },
];

export default links;

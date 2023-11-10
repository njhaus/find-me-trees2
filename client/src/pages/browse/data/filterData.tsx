import { GiTreeBranch, GiOakLeaf, GiShinyApple } from "react-icons/gi";
import { BsFlower1 } from "react-icons/bs";
import { ReactNode } from "react";
import LeafFilter from "../search_filters/LeafFilter";
import BarkFilter from "../search_filters/BarkFilter";
import FruitFilter from "../search_filters/FruitFilter";
import FlowerFilter from "../search_filters/FlowerFilter";
import MapFilter from "../search_filters/MapFilter";

const iconStyles = {
  size: "2rem",
};

// NEED TO REFACTOR THIS-- CODE SMELLS WHEN HARDCODING THE COLOR IN TWO PLACES< BUT I AM HAVING TROUBLE ACCESSING THE COLOR FROM WITHIN THE OBJECT
// I would prefer to define the styles in one object, and then stick the object into the component, but I don't know how with chakra

interface Filter {
  color: string;
  dropDown: ReactNode;
  icon?: ReactNode;
}

export const filters: Filter[] = [
  {
    color: "green",
    icon: (
      <GiOakLeaf size={iconStyles.size} color={"green"} cursor={"pointer"} />
    ),
    dropDown: <LeafFilter />,
  },
  {
    icon: (
      <GiTreeBranch size={iconStyles.size} color={"brown"} cursor={"pointer"} />
    ),
    color: "brown",
    dropDown: <BarkFilter />,
  },
  {
    icon: (
      <GiShinyApple size={iconStyles.size} color={"red"} cursor={"pointer"} />
    ),
    color: "red",
    dropDown: <FruitFilter />,
  },
  {
    icon: (
      <BsFlower1 size={iconStyles.size} color={"pink"} cursor={"pointer"} />
    ),
    color: "pink",
    dropDown: <FlowerFilter />,
  },
];

export const mapFilter = {
  dropDown: <MapFilter />,
};

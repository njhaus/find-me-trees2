import { useImg } from "../../../hooks/useImg";

type LeafType = "simple" | "compound";
type LeafShape = "needle" | "smooth" | "toothed" | "lobed";
type Bark = "smooth" | "rough" | "peeling" | undefined;
type Branches = "drooping" | "spiral" | undefined;
type Fruit =
  | "fleshy"
  | "berry"
  | "nut"
  | "acorn"
  | "ball"
  | "key"
  | "cone"
  | "catkin"
  | "other"
  | undefined;
type Flower =
  | "red"
  | "pink"
  | "purple/blue"
  | "orange/yellow"
  | "white"
  | "green"
  | "other"
  | undefined;
export type UsState =
  | "AL"
  | "AK"
  | "AZ"
  | "AR"
  | "CA"
  | "CO"
  | "CT"
  | "DE"
  | "FL"
  | "GA"
  | "HI"
  | "ID"
  | "IL"
  | "IN"
  | "IA"
  | "KS"
  | "KY"
  | "LA"
  | "ME"
  | "MD"
  | "MA"
  | "MI"
  | "MN"
  | "MS"
  | "MO"
  | "MT"
  | "NE"
  | "NV"
  | "NH"
  | "NJ"
  | "NM"
  | "NY"
  | "NC"
  | "ND"
  | "OH"
  | "OK"
  | "OR"
  | "PA"
  | "RI"
  | "SC"
  | "SD"
  | "TN"
  | "TX"
  | "UT"
  | "VT"
  | "VA"
  | "WA"
  | "WV"
  | "WI"
  | "WY";

// Need to complete
export interface iSciInfo {
  scientificName: string;
  commonNames: string;
  family: string;
  hardinessZone: string;
  origin: string;
  availability: string;
}

interface iLeaf {
  leafType: LeafType;
  leafShape: LeafShape;
  leafSize: number;
}

export interface iTreeTraitsData {
  leafType: LeafType;
  leafShape: LeafShape;
  leafSize: number;
  bark: Bark;
  branches: Branches;
  fruit: Fruit;
  flower: Flower;
  location: UsState[];
}

export interface iTreeData {
  _id: string;
  title: string;
  imgSrc: string[];
  sciName: string;
  intro: string;
  sciInfo: iSciInfo;
  traits: iTreeTraitsData;
  uses: string;
}

export const tempTreeData: iTreeData = {
  _id: "testID123",
  title: "Big Tree",
  imgSrc: [],
  sciName: "treeus maximus",
  intro:
    "TREE INTRO: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore laborum, voluptas fugiat quo quas sint iusto debitis optio dolorum ipsa mollitia ex. Voluptas perspiciatis pariatur, magni eius tempore veniam illum animi quisquam fugiat assumenda rem! Velit ipsam ut iusto? Incidunt totam voluptatem libero molestias inventore ipsam rem est vero quas rerum odit enim, nisi nihil laboriosam cupiditate repellendus amet? Nihil quas sed consequuntur deserunt mollitia illum voluptatum minus temporibus, error quam vero delectus magni quisquam vitae labore veniam aliquid dolore sunt architecto id molestias praesentium ipsum ea. Sint consequuntur, magnam harum dolorum, odio quae maxime recusandae facere eum eligendi asperiores provident reprehenderit unde assumenda quo non aspernatur accusantium magni blanditiis dolor?",
  sciInfo: {
    scientificName: "tempinfo",
    commonNames: "tempinfo",
    family: "tempinfo",
    hardinessZone: "tempinfo",
    origin: "tempinfo",
    availability: "tempinfo",
  },
  traits: {
    leafType: "simple" as LeafType,
    leafShape: "compound" as LeafShape,
    leafSize: 3,
    bark: "smooth" as Bark,
    branches: "spiral" as Branches,
    fruit: "fleshy" as Fruit,
    flower: "green" as Flower,
    location: ["CA" as UsState, "WA" as UsState, "OR" as UsState],
  },
  uses: "tempinfo",
};


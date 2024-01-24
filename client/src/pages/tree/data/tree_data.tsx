
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
  | "WY"
  //Refactor -- this is a Hacky way to make sure real states are loaded before loading map...The map was loading the temp data and not reloading the real data. I have to make a cleanup function on the map.
  | 'TE';

// Need to complete
export interface iSciInfo {
  scientificName: string;
  commonNames: string;
  family: string;
  hardinessZone: string;
  origin: string;
}

export interface iTreeTraitsData {
  leafType: LeafType;
  leafShape: LeafShape;
  leafSize: number[];
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
  _id: "",
  title: "",
  imgSrc: [],
  sciName: "",
  intro:
    "",
  sciInfo: {
    scientificName: "",
    commonNames: "",
    family: "",
    hardinessZone: "",
    origin: "",
  },
  traits: {
    leafType: "simple" as LeafType,
    leafShape: "compound" as LeafShape,
    leafSize: [3, 5],
    bark: "smooth" as Bark,
    branches: "spiral" as Branches,
    fruit: "fleshy" as Fruit,
    flower: "green" as Flower,
    location: ["TE" as UsState],
  },
  uses: "",
};


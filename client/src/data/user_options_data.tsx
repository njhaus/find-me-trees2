import { BsHeart, BsSave, BsSearch } from "react-icons/bs";

import { iUserData } from "./user_data/userData";

type GeoCode = {
    type: string;
    coordinates: [number, number]
}

export type userOptionsKey = 'saved' | 'found' | 'favorites';

type DataFormatWithCollections = {
  _id: string;
  collections: string[];
  notes?: string;
  location?: GeoCode;
};

type DataFormatWithNotes = {
  _id: string;
  collections?: string[];
  notes: string;
  location?: GeoCode;
};

type DataFormatWithlocation = {
  _id: string;
  collections?: string[];
  notes?: string;
  location: GeoCode;
};

export type DataFormat =
  | DataFormatWithCollections
  | DataFormatWithNotes
  | DataFormatWithlocation;

export const options: {
  text: string;
  successText: string;
  userDataKey: keyof iUserData;
  dataFormat: DataFormat;
  color: string;
  icon: React.ReactElement;
  hoverMsg?: string;
}[] = [
  {
    text: "Save",
    successText: "Saved!",
    userDataKey: "saved" as keyof iUserData,
    dataFormat: {
      _id: "",
      collections: [],
    },
    color: "blue.100",
    icon: <BsSave />,
  },
  {
    text: "Favorite",
    successText: "Added!",
    userDataKey: "favorites" as keyof iUserData,
    dataFormat: {
      _id: "",
      notes: "",
    },
    color: "green.100",
    icon: <BsHeart />,
  },
  {
    text: "Found it",
    successText: "Nice",
    userDataKey: "found" as keyof iUserData,
    dataFormat: {
      _id: "",
        location: {
            type: 'point',
            coordinates: [-74.360846, 40.45940210000001]
        },
    },
    color: "red.100",
    icon: <BsSearch />,
    hoverMsg: 'Enable location services or use the map to save your find!'
  },
];

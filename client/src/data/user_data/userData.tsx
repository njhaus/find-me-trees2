import { iTreeData, tempTreeData } from "../../pages/tree/data/tree_data";

export interface iUserData {
  username: string;
  email: string;
  collections: string[];
  saved: iUserSaved[];
  found: iUserFound[];
  favorites: iUserFavorites[];
  accessToken: string;
}

export const initialUserData: iUserData = {
  username: "",
  email: "",
  collections: [],
  saved: [],
  found: [],
  favorites: [],
  accessToken: "",
};

export interface iLocationData {
  type: string;
  coordinates: Number[];
}

export interface iUserSaved {
  _id: iTreeData;
  collections: string[];
}

export interface iUserFound {
  _id: iTreeData;
  location: iLocationData;
}

export interface iUserFavorites {
  _id: iTreeData;
  notes: string;
}

export const tempUserData = {
  userName: "bobby",
  email: "bobby@fake.com",
  collections: ["maples", "oaks", "other"],
  saved: [
    {
      _id: tempTreeData,
      collections: ["none"],
    },
    {
      _id: tempTreeData,
      collections: ["none"],
    },
    {
      _id: tempTreeData,
      collections: ["none"],
    },
    {
      _id: tempTreeData,
      collections: ["none"],
    },
    {
      _id: tempTreeData,
      collections: ["none"],
    },
    {
      _id: tempTreeData,
      collections: ["none"],
    },
  ],
  found: [
    {
      _id: tempTreeData,
      location: { type: "point", coordinates: [-73.360846, 41.45940210000001] },
    },
    {
      _id: tempTreeData,
      location: { type: "point", coordinates: [-72.360846, 41.45940210000001] },
    },
    {
      _id: tempTreeData,
      location: { type: "point", coordinates: [-74.360846, 41.45940210000001] },
    },
    {
      _id: tempTreeData,
      location: { type: "point", coordinates: [-75.360846, 41.45940210000001] },
    },
    {
      _id: tempTreeData,
      location: { type: "point", coordinates: [-76.360846, 41.45940210000001] },
    },
    {
      _id: tempTreeData,
      location: { type: "point", coordinates: [-72.360846, 40.45940210000001] },
    },
    {
      _id: tempTreeData,
      location: { type: "point", coordinates: [-72.360846, 39.45940210000001] },
    },
    {
      _id: tempTreeData,
      location: { type: "point", coordinates: [-72.360846, 38.45940210000001] },
    },
    {
      _id: tempTreeData,
      location: { type: "point", coordinates: [-72.360846, 37.45940210000001] },
    },
  ],
  favorites: [
    {
      _id: tempTreeData,
      notes: "temp note",
    },
    {
      _id: tempTreeData,
      notes: "temp note",
    },
    {
      _id: tempTreeData,
      notes: "temp note",
    },
    {
      _id: tempTreeData,
      notes: "temp note",
    },
    {
      _id: tempTreeData,
      notes: "temp note",
    },
    {
      _id: tempTreeData,
      notes: "temp note",
    },
    {
      _id: tempTreeData,
      notes: "temp note",
    },
    {
      _id: tempTreeData,
      notes: "temp note",
    },
    {
      _id: tempTreeData,
      notes: "temp note",
    },
  ],
};

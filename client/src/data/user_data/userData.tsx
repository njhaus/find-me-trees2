import { iTreeData, tempTreeData } from "../tree_data";


 export interface iLocationData{
   type: string,
   coordinates: Number[],
 }


export interface iUserSaved {
    tree: iTreeData;
  collections: string[];
}

export interface iUserFound {
  tree: iTreeData;
  location: iLocationData;
}

export interface iUserFavorites {
  tree: iTreeData;
  notes: String
}

export const tempUserData = {
  userName: "bobby",
  email: 'bobby@fake.com',
  collections: ["maples", "oaks", "other"],
  saved: [
    {
      tree: tempTreeData,
      collections: ["none"],
    },
    {
      tree: tempTreeData,
      collections: ["none"],
    },
    {
      tree: tempTreeData,
      collections: ["none"],
    },
    {
      tree: tempTreeData,
      collections: ["none"],
    },
    {
      tree: tempTreeData,
      collections: ["none"],
    },
    {
      tree: tempTreeData,
      collections: ["none"],
    },
  ],
  found: [
    {
      tree: tempTreeData,
      location: { type: 'point', coordinates: [ -73.360846, 41.45940210000001 ]},
    },
    {
      tree: tempTreeData,
      location: { type: 'point', coordinates: [ -72.360846, 41.45940210000001 ]},
    },
    {
      tree: tempTreeData,
      location: { type: 'point', coordinates: [ -74.360846, 41.45940210000001 ]},
    },
    {
      tree: tempTreeData,
      location: { type: 'point', coordinates: [ -75.360846, 41.45940210000001 ]},
    },
    {
      tree: tempTreeData,
      location: { type: 'point', coordinates: [ -76.360846, 41.45940210000001 ]},
    },
    {
      tree: tempTreeData,
      location: { type: 'point', coordinates: [ -72.360846, 40.45940210000001 ]},
    },
    {
      tree: tempTreeData,
      location: { type: 'point', coordinates: [ -72.360846, 39.45940210000001 ]},
    },
    {
      tree: tempTreeData,
      location: { type: 'point', coordinates: [ -72.360846, 38.45940210000001 ]},
    },
    {
      tree: tempTreeData,
      location: { type: 'point', coordinates: [ -72.360846, 37.45940210000001 ]},
    },
  ],
  favorites: [
    {
      tree: tempTreeData,
      notes: 'temp note'
    },
    {
      tree: tempTreeData,
      notes: 'temp note'
    },
    {
      tree: tempTreeData,
      notes: 'temp note'
    },
    {
      tree: tempTreeData,
      notes: 'temp note'
    },
    {
      tree: tempTreeData,
      notes: 'temp note'
    },
    {
      tree: tempTreeData,
      notes: 'temp note'
    },
    {
      tree: tempTreeData,
      notes: 'temp note'
    },
    {
      tree: tempTreeData,
      notes: 'temp note'
    },
    {
      tree: tempTreeData,
      notes: 'temp note'
    },
  ],
};
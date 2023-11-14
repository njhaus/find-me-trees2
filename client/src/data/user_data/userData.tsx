import { iTreeData, tempTreeData } from "../tree_data";

export interface iUserSaved {
    tree: iTreeData;
  collection: string;
}

export const tempUserData = {
  userName: "bobby",
  collections: ["maples", "oaks", "other"],
  saved: [
    {
      tree: tempTreeData,
      collection: "none",
    },
    {
      tree: tempTreeData,
      collection: "none",
    },
    {
      tree: tempTreeData,
      collection: "none",
    },
    {
      tree: tempTreeData,
      collection: "none",
    },
    {
      tree: tempTreeData,
      collection: "none",
    },
    {
      tree: tempTreeData,
      collection: "none",
    },
  ],
  found: [
    tempTreeData,
    tempTreeData,
    tempTreeData,
    tempTreeData,
    tempTreeData,
    tempTreeData,
    tempTreeData,
    tempTreeData,
    tempTreeData,
  ],
  favorites: [
    tempTreeData,
    tempTreeData,
    tempTreeData,
    tempTreeData,
    tempTreeData,
    tempTreeData,
    tempTreeData,
    tempTreeData,
    tempTreeData,
  ],
};
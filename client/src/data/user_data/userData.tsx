import { iTreeData, tempTreeData } from "../tree_data";

export interface iUserSaved {
    tree: iTreeData;
    collection: string;
}

export const tempUserData = {
    userName: 'bobby',
    collections: ['maples', 'oaks', 'other'],
    saved: [
        {
            tree: tempTreeData,
            collection: 'none'
        }
    ]
}
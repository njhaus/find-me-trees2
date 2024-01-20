import { Button } from "@chakra-ui/react"

import useUpdateUser from "../../../../../hooks/useUpdateUser"
 

interface iRemoveFromColButton {
    collection: string;
    id: string;
}

const RemoveFromColButton = ({collection, id }: iRemoveFromColButton) => {

      const { userData, handleUpdateUser } = useUpdateUser();

    const handleAddToCol = (collection: string) => {
        const updatedTree = userData.saved.find((tree) => tree._id._id === id);
        console.log(updatedTree);
    if (updatedTree) {
      // Only push collection if it doesn't already exist
        if (updatedTree.collections.includes(collection))
        {
            updatedTree?.collections.splice(
              updatedTree.collections.indexOf(collection),
              1
            );
            console.log(updatedTree);
            // remove old version of tree
            const filteredKey = userData.saved.filter(
              (tree) => !(tree._id._id === id)
            );
            // Put new version in
            const updatedKey = [...filteredKey, updatedTree];
            handleUpdateUser("saved", updatedKey); 
          }
    }
  };

  return (
    <Button
      variant={"outlineAccent"}
      size={"teeny"}
      w={"45%"}
      onClick={() => handleAddToCol(collection)}
    >
      Remove from {collection}
    </Button>
  );
}

export default RemoveFromColButton

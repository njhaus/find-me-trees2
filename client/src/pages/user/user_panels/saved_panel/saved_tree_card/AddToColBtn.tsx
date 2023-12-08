import { useRef, useState } from "react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  useDisclosure,
  Text,
  Box
} from "@chakra-ui/react";

import RadioInput from "../../../../../components/inputs/BrowseRadioInput";
import { iTreeData } from "../../../../../data/tree_data";
import useUpdateUser from "../../../../../hooks/useUpdateUser";

interface iAddToColBtn {
  collections: string[];
  id: string;
  // onAdd: (collecition: string) => void;
}

const AddToColBtn = ({
  collections,
  id,
}: iAddToColBtn) => {
  const { userData, handleUpdateUser } = useUpdateUser();
  const [selectedCol, setSelectedCol] = useState("none");
  const currentTree = userData.saved.find((tree) => tree._id._id === id);

  const collectionsTreeIsIn = currentTree?.collections;

  const { onOpen, onClose, isOpen } = useDisclosure();
  const addRef = useRef(null);

  const handleSelectCol = (form: null, col: string) => {
    setSelectedCol(col);
  };

  const handleAddToCol = (collection: string) => {
    if (currentTree) {
      // Only push collection if it doesn't already exist
      if (!currentTree.collections.includes(collection)) {
        currentTree?.collections.push(collection);
        // remove old version of tree
        const filteredKey = userData.saved.filter(
          (tree) => !(tree._id._id === id)
        );
        // Put new version in
        const updatedKey = [...filteredKey, currentTree];
        handleUpdateUser("saved", updatedKey);
      }
    }
   };

  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={addRef}
      onOpen={onOpen}
      onClose={onClose}
      placement="right"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button>Add to a collection</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Box>
            <Text>{currentTree?._id.title} is in the collections:</Text>
            <ul>
              {collections.map(
                (col) => collectionsTreeIsIn?.includes(col) && <li key={col }>{col}</li>
              )}
            </ul>
          </Box>
          <Box>
            <Text>Add {currentTree?._id.title} to collection:</Text>
            <form>
              <RadioInput
                formVal={""}
                label={""}
                values={collections.filter(
                  (col) => !collectionsTreeIsIn?.includes(col)
                )}
                formName={"addToCollection"}
                onChange={handleSelectCol}
              />
            </form>
          </Box>
        </PopoverBody>
        <PopoverFooter>
          <Button
            ref={addRef}
            onClick={() => {
              handleAddToCol(selectedCol);
              onClose();
            }}
          >
            Add
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default AddToColBtn;

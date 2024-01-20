import { useRef, useState } from "react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,  
  Button,
  useDisclosure,
  Text,
  Box,
  List,
  ListItem
} from "@chakra-ui/react";

import RadioInput from "../../../../../components/inputs/BrowseRadioInput";
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
        <Button variant={"outlineDark"} size={"teeny"} w={'45%'}>
          Add to a collection
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Box>
            {collections.filter(
                  (col) => collectionsTreeIsIn?.includes(col)
          ).length > 0 && <Text>{currentTree?._id.title} is in the collections:</Text>}
            <List>
              {collections.map(
                (col) =>
                  collectionsTreeIsIn?.includes(col) && <ListItem key={col}>-{col}</ListItem>
              )}
            </List>
          </Box>
         {collections.filter(
                  (col) => !collectionsTreeIsIn?.includes(col)
          ).length > 0 &&
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
          </Box>}
        </PopoverBody>
        <PopoverFooter>
          {collections.filter(
                  (col) => !collectionsTreeIsIn?.includes(col)
          ).length > 0 && <Button
            ref={addRef}
            onClick={() => {
              handleAddToCol(selectedCol);
              onClose();
            }}
          >
            Add
          </Button>}
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default AddToColBtn;

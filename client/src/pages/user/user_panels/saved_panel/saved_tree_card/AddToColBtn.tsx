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
  // onAdd
}: iAddToColBtn) => {
  const { userData, handleUpdateUser } = useUpdateUser();
  const [selectedCol, setSelectedCol] = useState("none");

  const { onOpen, onClose, isOpen } = useDisclosure();
  const addRef = useRef(null);

  const handleSelectCol = (form: null, col: string) => {
    setSelectedCol(col);
  };

  const handleAddToCol = (collection: string) => {
    const updatedTree = userData.saved.find(tree => tree._id._id === id);
    if (updatedTree) {
      updatedTree?.collections.push(collection);
      // remove old version of tree
      const filteredKey = userData.saved.filter(tree => !(tree._id._id === id))
      // Put new version in
      const updatedKey = [...filteredKey, updatedTree];
      console.log('second try??')
      console.log(updatedTree);
      console.log(updatedKey);
       handleUpdateUser('saved', updatedKey);
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
        <Button>Add to collection</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Text>Choose a Collection: </Text>
          <form>
            <RadioInput
              formVal={""}
              label={""}
              values={collections}
              formName={"addToCollection"}
              onChange={handleSelectCol}
            />
          </form>
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

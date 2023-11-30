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

interface iAddToColBtn {
  collections: string[];
  onAdd: (collecition: string) => void;
}

const AddToColBtn = ({ collections, onAdd }: iAddToColBtn) => {
  const [selectedCol, setSelectedCol] = useState("none");

  const { onOpen, onClose, isOpen } = useDisclosure();
  const addRef = useRef(null);

  const handleSelectCol = (form: null, col: string) => {
    setSelectedCol(col);
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
              onAdd(selectedCol);
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

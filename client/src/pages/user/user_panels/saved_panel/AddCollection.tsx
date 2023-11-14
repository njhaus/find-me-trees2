
import { FormEvent, useState, useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";

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
} from "@chakra-ui/react";
import TextInput from "../../../../components/inputs/TextInput";
import RadioInput from "../../../../components/inputs/RadioInput";

interface iAddCollection {
  collections: string[];
}

type colFormLabel = "addCollection" | "deleteCollection";

interface iColFormData {
  addCollection: string;
  deleteCollection: string[];
}

const initialColFormData: iColFormData = {
  addCollection: "",
  deleteCollection: [],
};



const AddCollection = ({collections}: iAddCollection) => {

  const [colFormData, setColFormData] = useState(initialColFormData);

  const handleFormData = (formName: keyof iColFormData, data: string | string[]) => {
    setColFormData((prevFormData) => ({ ...prevFormData, [formName]: data }));
  }

  // This will probably need to be moved into an effect
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(colFormData);
  }

  // Popover Controls
  const { onOpen, onClose, isOpen } = useDisclosure();
  const initialFocusRef = useRef(null)

    return (
      <Popover
        initialFocusRef={initialFocusRef}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <Button>Manage Collections</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <PopoverHeader>Add Collection</PopoverHeader>
            <form>
              <TextInput
                formVal={""}
                label={"Name your collection:"}
                formName={"addCollection"}
                onChange={handleFormData}
                ref={initialFocusRef}
              />
              <PopoverHeader>Edit Collections</PopoverHeader>
              <RadioInput
                formVal={""}
                label={""}
                values={collections}
                formName={"deleteCollection"}
                onChange={handleFormData}
              />
              <Button onClick={(e) => {
                handleSubmit(e);
                onClose();
              }}>Save</Button>
            </form>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
};

export default AddCollection;

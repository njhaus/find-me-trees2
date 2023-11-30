
import { FormEvent, useState, useRef, useEffect } from "react";

import {
  useDisclosure,
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
  CheckboxGroup,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  HStack,
} from "@chakra-ui/react";
import { iUserData } from "../../../../data/user_data/userData";
import GenTextInput from "../../../../components/inputs/GenTextInput";

interface iAddCollection {
  collections: string[];
  updateCollections: (dataType: keyof iUserData, data: any) => void;
}

interface iAmSoSickOfTypescript {
  addCollection: string;
  deleteCollections: string[];
}

const initialEditCollections = {
  addCollection: "",
  deleteCollections: [],
};

const AddCollection = ({ collections, updateCollections }: iAddCollection) => {

  console.log('INITIAL COLLECTIONS');
  console.log(collections);

  const [editCollections, setEditCollections] = useState<iAmSoSickOfTypescript>(initialEditCollections);

  const handleAddCollection = (val: string) => {
    console.log(editCollections)
    if (!collections.includes(val) && val !== '') {
      setEditCollections({ ...editCollections, addCollection: val })
    }
  }

  const handleDeleteCollections = (val: string) => {
    let deleteCols
    if (editCollections.deleteCollections.includes(val)) {
      deleteCols = editCollections.deleteCollections.filter(col => col !== val)
    }
    else {
      deleteCols = [...editCollections.deleteCollections, val];
    }
    setEditCollections({ ...editCollections, deleteCollections: deleteCols });
  } 
  

  // This will probably need to be moved into an effect
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newCollections =
      collections
        .filter(col => !editCollections.deleteCollections.includes(col));
      if(editCollections.addCollection !== '') newCollections.push(editCollections.addCollection);
    console.log('newcollections');
    console.log(newCollections);
    updateCollections('collections', newCollections);
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
          <PopoverCloseButton
            onClick={() => {
              onClose();
              setEditCollections(initialEditCollections);
            }}
          />
          <PopoverBody>
            <PopoverHeader>Add Collection</PopoverHeader>
            <form>
              <GenTextInput
                formVal=""
                label="New Collection:"
                formName="new-collection"
                onChange={handleAddCollection}
                ref={initialFocusRef}
              />
              <PopoverHeader>Edit Collections</PopoverHeader>
              <FormControl as="fieldset">
                <FormLabel as="legend">
                  Delete Collections: 
                </FormLabel>
                <CheckboxGroup>
                  <HStack spacing="24px">
                    {collections.map((col, i) => (
                      <Checkbox
                        key={i}
                        value={col}
                        isChecked={true}
                        onChange={() => {handleDeleteCollections(col)
                        }}
                      >
                        {col}
                      </Checkbox>
                    ))}
                  </HStack>
                </CheckboxGroup>
              </FormControl>
              <Button
                onClick={(e) => {
                  handleSubmit(e);
                  setEditCollections(initialEditCollections);
                  onClose();
                }}
              >
                Save
              </Button>
            </form>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
};

export default AddCollection;

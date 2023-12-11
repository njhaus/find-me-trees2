
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
import useUpdateUser from "../../../../hooks/useUpdateUser";
import useAuth from "../../../../hooks/useAuth";

interface iAddCollection {
  collections: string[];
}

interface iEditCollections {
  addCollection: string;
  deleteCollections: string[];
}

const initialEditCollections = {
  addCollection: "",
  deleteCollections: [],
};

const AddCollection = ({ collections }: iAddCollection) => {

  const [editCollections, setEditCollections] = useState<iEditCollections>(initialEditCollections);

  const { userData, handleUpdateUser } = useUpdateUser();

  const handleAddCollection = (val: string) => {
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

  //I had to move the second call into an effect. There is probably a better way to make 2 calls since the collections need to be updated, then the trees (must delete the deleted collection) beacuse this won't actually update the tree array until the next render...But the user will never notice, so this works for now.
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Set Update collections
    const newCollections =
      collections
        .filter(col => !editCollections.deleteCollections.includes(col));
    if (editCollections.addCollection !== '') newCollections.push(editCollections.addCollection);
        handleUpdateUser("collections", newCollections);
      // Handle errors if any during the update process
  }

  useEffect(() => {
    console.log('effect Running');
     // Set update trees
        const updateSavedTrees = userData.saved.map((tree) => ({
          ...tree,
          collections: tree.collections.filter((col) =>
            collections.includes(col)
          ),
        }));
        // Second update operation (Delete collections from trees that were in the collection)
        handleUpdateUser("saved", updateSavedTrees);
  }, [])


  const handleClose = () => {
    onClose();
    setEditCollections(initialEditCollections);
  }

  // Popover Controls
  const { onOpen, onClose, isOpen } = useDisclosure();
  const initialFocusRef = useRef<HTMLInputElement>(null)

    return (
      <Popover
        initialFocusRef={initialFocusRef}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={handleClose}
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <Button>Manage Collections</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton
            onClick={() => {
              handleClose()
            }}
          />
          <PopoverBody>
            <PopoverHeader>Add Collection</PopoverHeader>
            <form>
              <GenTextInput
                formVal={editCollections.addCollection}
                label="New Collection:"
                formName="new-collection"
                onSubmit={handleAddCollection}
                
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

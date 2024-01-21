import { useState } from "react";

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
  Text,
  useDisclosure,
  VStack,
  HStack
} from "@chakra-ui/react";

import { GiNotebook } from "react-icons/gi";
import GenTextInput from "../../../../components/inputs/GenTextInput";
import useUpdateUser from "../../../../hooks/useUpdateUser";
import { iUserFavorites } from "../../../../data/user_data/userData";

interface iFavoriteNotes {
  data: iUserFavorites[];
  id: string;
}

const FavoriteNotes = ({ data, id }: iFavoriteNotes) => {

  const { onOpen, onClose, isOpen } = useDisclosure();

  const [isEditing, setIsEditing] = useState(false);
  const [favorites, setFavorites] = useState(data);
  const { handleUpdateUser } = useUpdateUser();
  const thisTree = favorites.find((tree) => tree._id._id === id);

  const handleEditedNote = (val: string) => {
    if (thisTree) {
      const editedTree = { _id: thisTree._id, notes: val };
    if (editedTree) {
      const unEditedFavorites = favorites.filter(
        (tree) => tree._id._id !== thisTree._id._id
      );
      setFavorites([...unEditedFavorites, editedTree]);
    }
    }
  }

  const saveEditedNote = () => {
    setIsEditing(false);
    handleUpdateUser('favorites', favorites);
  }

  return (
    <Popover
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
    >
      <PopoverTrigger>
        <Button variant="solidDark">
          <GiNotebook />
          Notes
        </Button>
      </PopoverTrigger>
      <PopoverContent p={"0.5rem"}>
        <PopoverArrow />
        <PopoverCloseButton />
        {!isEditing && (
          <PopoverBody>
            {thisTree?.notes ? (
              <Text>{thisTree.notes}</Text>
            ) : (
              <Text fontStyle={"italic"} color={"grey"}>
                No notes yet
              </Text>
            )}
          </PopoverBody>
        )}
        {isEditing ? (
          <VStack mt={"1.5rem"} gap="0.5rem" alignItems={"center"}>
            <GenTextInput
              formName="notes"
              formVal={thisTree?.notes}
              label="New Note:"
              onSubmit={handleEditedNote}
            />
            <HStack w={'100%'}>
              <Button w={"50%"} onClick={() => saveEditedNote()}>
                Save
              </Button>
              <Button
                w={"50%"}
                onClick={() => {
                  setFavorites(data);
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            </HStack>
          </VStack>
        ) : (
          <Button onClick={() => setIsEditing(true)}>
            {thisTree?.notes ? "Edit" : "Add"} Note
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default FavoriteNotes;

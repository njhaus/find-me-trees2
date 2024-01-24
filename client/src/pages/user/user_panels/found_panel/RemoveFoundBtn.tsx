import { useRef } from "react";

import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  useDisclosure
} from "@chakra-ui/react";

import { iLocationData } from "../../../../data/user_data/userData";
import useUpdateUser from "../../../../hooks/useUpdateUser";

interface iRemoveFoundBtn {
  title: string;
  id: string;
  locationFound: iLocationData
}

const RemoveFoundBtn = ({ title, id, locationFound }: iRemoveFoundBtn) => {
  const { userData, handleUpdateUser } = useUpdateUser();
  const currentTree = userData.found.find(
    (tree) =>
      tree._id._id === id &&
      tree.location.coordinates[0] === locationFound.coordinates[0] &&
      tree.location.coordinates[1] === locationFound.coordinates[1]
  );

  const { onOpen, onClose, isOpen } = useDisclosure();
  const removeRef = useRef(null);

  const handleRemoveTree = () => {
    if (currentTree) {
      const updatedKey = userData.found.filter(
        (tree) => !(
          tree._id._id === id &&
          tree.location.coordinates[0] === locationFound.coordinates[0] &&
              tree.location.coordinates[1] === locationFound.coordinates[1]
        ));
      handleUpdateUser('found', updatedKey);
    }
    else {
        console.log('could not find tree at that location.')
      }
  };

  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={removeRef}
      onOpen={onOpen}
      onClose={onClose}
      placement="auto-start"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button variant="outlineAccent" size="sm">
          Remove from found
        </Button>
      </PopoverTrigger>
      <PopoverContent zIndex={4} maxWidth={"15rem"}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>Are you sure you want to remove {title}?</PopoverBody>
        <PopoverFooter>
          <Button
            ref={removeRef}
            variant="solidLight"
            size="sm"
            onClick={() => {
              handleRemoveTree();
              onClose();
            }}
          >
            Yes, Remove
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default RemoveFoundBtn;

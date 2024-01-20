import { useRef } from "react";

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
  useDisclosure
} from "@chakra-ui/react";
  
import useUpdateUser from "../../../../../hooks/useUpdateUser";
import { iUserData } from "../../../../../data/user_data/userData";
import { userOptionsKey } from "../../../../../data/user_options_data";


interface iRemoveBtn {
  title: string;
  id: string;
  dataKey: userOptionsKey;

}

const RemoveBtn = ({title, id, dataKey}: iRemoveBtn) => {

  const { userData, handleUpdateUser } = useUpdateUser();
  const currentTree = userData[dataKey].find((tree) => tree._id._id === id);

  const { onOpen, onClose, isOpen } = useDisclosure();
  const removeRef = useRef(null);


  const handleRemoveTree = () => {
    if (currentTree) {
      const updatedKey = userData[dataKey].filter(tree => tree._id._id !== id);
      handleUpdateUser(dataKey, updatedKey);
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
        <Button variant={"outlineAccent"} size={"teeny"} w={"45%"}>
          Remove from {dataKey}
        </Button>
      </PopoverTrigger>
      <PopoverContent zIndex={4} maxWidth={"15rem"}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>Are you sure you want to remove {title}?</PopoverBody>
        <PopoverFooter>
          <Button
            ref={removeRef}
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
}

export default RemoveBtn

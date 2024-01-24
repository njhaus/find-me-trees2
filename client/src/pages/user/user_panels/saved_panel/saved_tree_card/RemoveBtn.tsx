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
  
import { userOptionsKey } from "../../../../../data/user_options_data";
import useUpdateUser from "../../../../../hooks/useUpdateUser";


interface iRemoveBtn {
  title: string;
  id: string;
  dataKey: userOptionsKey;
  width?: string;
  size?: string
}

const RemoveBtn = ({title, id, dataKey, width , size}: iRemoveBtn) => {

  const { userData, handleUpdateUser } = useUpdateUser();
  const currentTree = userData[dataKey].find((tree) => tree._id._id === id);

  const { onOpen, onClose, isOpen } = useDisclosure();
  const removeRef = useRef(null);

  const w = width ? width : '100%'
  const sz = size ? size : 'teeny'

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
        <Button variant={"outlineAccent"} size={sz} w={w}>
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

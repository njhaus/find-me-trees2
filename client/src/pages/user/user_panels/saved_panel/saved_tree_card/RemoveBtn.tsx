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
  useDisclosure } from "@chakra-ui/react";


interface iRemoveBtn {
    title: string;
    onRemove: () => void;
}

const RemoveBtn = ({title, onRemove}: iRemoveBtn) => {

    const { onOpen, onClose, isOpen } = useDisclosure();
    const removeRef = useRef(null);

  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={removeRef}
      onOpen={onOpen}
      onClose={onClose}
      placement="right"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button>Remove</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>Are you sure you want to remove {title}?</PopoverBody>
        <PopoverFooter>
                  <Button ref={removeRef} onClick={() => {
                      onRemove()
                      onClose();
                  }}>
            Yes, Remove
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export default RemoveBtn

import { useRef, useEffect } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    Button,
} from "@chakra-ui/react";

interface iNavDialog {
    message: string;
}

const NavDialog = ({ message }: iNavDialog) => {
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const closeRef = useRef(null);

    useEffect(() => {
        if (message) {
        onOpen();   
        }
    }, [message])

    return (
      <>
        {/* <Button colorScheme="red" onClick={onOpen}>
          Delete Customer
        </Button> */}

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={closeRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              {/* <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Customer
              </AlertDialogHeader> */}

              <AlertDialogBody>{message}</AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  colorScheme="red"
                  ref={closeRef}
                   onClick={onClose
    }              ml={3
                }>
                  Close
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    );
  };

export default NavDialog;

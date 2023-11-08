import { useDisclosure, Button, Modal, ModalHeader, ModalContent, ModalCloseButton, ModalOverlay, ModalBody, ModalFooter, Flex, Heading } from "@chakra-ui/react";

import { useRef } from "react";
import LogoImgOnly from "../logo/LogoImgOnly";
import IconInput from "../inputs/IconInput";
import { FaSadCry, FaGoogle, FaSmile, FaTree,  } from "react-icons/fa";

interface LoginProps {
    isOpenLogin: boolean
    onCloseLogin: () => void
}

function Login({ isOpenLogin, onCloseLogin }: LoginProps) {

  const initialRef = useRef(null);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpenLogin}
        onClose={onCloseLogin}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader marginTop={"1rem"}>
            <Flex
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"end"}
              borderBottom={"2px"}
              borderBottomColor={"gray"}
              paddingBottom={"0.5rem"}
              marginX={"0.5rem"}
            >
              <Heading as={"h4"}>Login</Heading>
              <LogoImgOnly />
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <IconInput
              icon={<FaSadCry />}
              labelText="Username:"
              labelFor="username"
              inputPlaceholder="username"
              inputType="text"
              ref={initialRef}
            ></IconInput>

            <IconInput
              icon={<FaSadCry />}
              labelText="Password:"
              labelFor="password"
              inputPlaceholder="password"
              inputType="password"
            ></IconInput>
            <Button leftIcon={<FaSmile />} display={'block'} width={'85%'} margin={"1rem auto"} variant="solid">
              Login
            </Button>
            <Button leftIcon={<FaGoogle />} display={'block'} width={'85%'} margin={"1rem auto"} variant="solid">
              Login with Google
            </Button>
            <Button leftIcon={<FaTree />} display={'block'} width={'85%'} margin={"1rem auto"} variant="solid">
              Register
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCloseLogin}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Login;
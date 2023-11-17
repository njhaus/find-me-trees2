import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ZodError, z } from 'zod';

import {
  useDisclosure,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  Flex,
  Heading,
} from "@chakra-ui/react";

import LogoImgOnly from "../logo/LogoImgOnly";
import IconInput from "../inputs/IconInput";
import { FaSadCry, FaGoogle, FaSmile, FaTree, FaEnvelope } from "react-icons/fa";

import { passwordRegex, emailRegex } from "../../utils/login_utils";

interface LoginProps {
  isOpenLogin: boolean;
  onCloseLogin: () => void;
}

interface FormData {
  username: string;
  email: string;
  password: string;
}

const newUser = z.object({
  username: z.string().min(4, { message: 'Username must be at leat 4 characters.' }),
  email: z.string().regex(emailRegex, {message: 'Must use a valid email.'}),
  password: z.string().min(8, {message: 'Password must be at least 8 characters'}).regex(passwordRegex, {message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number or special character.'}),
})

type NewUser = z.infer<typeof newUser>

function Login({ isOpenLogin, onCloseLogin }: LoginProps) {

  const [formData, setFormData] = useState<FormData>({ username: '', email: '', password: '' })
  const [isRegistering, setIsRegistering] = useState(false);
  const [register, setRegister] = useState(false);
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const initialRef = useRef(null);

  const handleForm = (e: ChangeEvent<HTMLInputElement>, dataType: string) => {
    const val = e.target.value;
    setFormData({ ...formData, [dataType]: val })
  }

  const validate = () => {
    console.log(formData);
    try {
      newUser.parse(formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const zodErrors: ZodError<any> = err;
        const errorsArray = zodErrors.errors;
        const errorsObj: FormData = {
          username: '',
          email: '',
          password: '',
        };
        errorsArray.map((e) => (
          errorsObj[e.path[0] as keyof FormData] = e.message
        ))
        console.log(errorsObj);
      }
    }
  }

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
              val={formData.username}
              onChange={handleForm}
              error={usernameError}
            ></IconInput>

            <IconInput
              icon={<FaSadCry />}
              labelText="Email:"
              labelFor="email"
              inputPlaceholder="email"
              inputType="email"
              val={formData.email}
              onChange={handleForm}
              error={emailError}
            ></IconInput>

            <IconInput
              icon={<FaEnvelope />}
              labelText="Password:"
              labelFor="password"
              inputPlaceholder="password"
              inputType="password"
              val={formData.password}
              onChange={handleForm}
              error={passwordError}
            ></IconInput>

            {!isRegistering && (
              <>
                <Button
                  leftIcon={<FaSmile />}
                  display={"block"}
                  width={"85%"}
                  margin={"1rem auto"}
                  variant="solid"
                >
                  Login
                </Button>
                <Button
                  leftIcon={<FaGoogle />}
                  display={"block"}
                  width={"85%"}
                  margin={"1rem auto"}
                  variant="solid"
                >
                  Login with Google
                </Button>
              </>
            )}
            {!isRegistering && (
              <Button
                leftIcon={<FaTree />}
                display={"block"}
                width={"85%"}
                margin={"1rem auto"}
                variant="solid"
                onClick={() => setIsRegistering(true)}
              >
                Create an account
              </Button>
            )}
            {isRegistering && (
              <>
                <Button
                  leftIcon={<FaTree />}
                  display={"block"}
                  width={"85%"}
                  margin={"1rem auto"}
                  variant="solid"
                  onClick={() => validate()}
                >
                  Register
                </Button>
                <Button
                  leftIcon={<FaTree />}
                  display={"block"}
                  width={"85%"}
                  margin={"1rem auto"}
                  variant="solid"
                  onClick={() => console.log("Register with google")}
                >
                  Register with Google
                </Button>
              </>
            )}
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

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

// Validation in login/utils files -- includes ZOD validators and validate function
import { validate } from "../../utils/login_utils";

interface LoginProps {
  isOpenLogin: boolean;
  onCloseLogin: () => void;
}

interface FormData {
  username: string;
  email: string;
  password: string;
}

const initialFormData = { username: "", email: "", password: "" };

function Login({ isOpenLogin, onCloseLogin }: LoginProps) {

  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isRegistering, setIsRegistering] = useState(false);
  const [register, setRegister] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const errorSetters = [setUsernameError, setEmailError, setPasswordError];

  const initialRef = useRef(null);

  const handleForm = (e: ChangeEvent<HTMLInputElement>, dataType: string) => {
    // Set value in formData
    const val = e.target.value;
    setFormData({ ...formData, [dataType]: val })
    // validate IF form has already been validated once -- check for this by checking if there are errors.
    if (usernameError || passwordError || emailError) validate({ ...formData, [dataType]: val }, errorSetters);
  }

  const submitRegistration = (valid: boolean) => {
    if (valid) {
      setRegister(true);
      return true;
    } else {
      console.log("invalid registration attempt");
      return false;
    }
  }

  useEffect(() => {
    let isMounted = true;
    if (register) {
      const registerNewUser = async () => {
        try {
          const response = await fetch("http://localhost:3008/login/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          if (!isMounted) return;
          if (!response.ok) throw new Error("error retrievieg data!");
          const responseText = await response.text();
          console.log(responseText);
        } catch (err) {
          console.log(err);
        } finally {
          if (isMounted) {
            setRegister(false);
          }
        }
      }
      registerNewUser();
    }
  }, [register])

  // Need a handleClose function to reset form and errors when login modal is closed
  const handleClose = () => {
    setFormData(initialFormData);
    setUsernameError('');
    setEmailError('')
    setPasswordError('');
    setIsRegistering(false);
    onCloseLogin();
  }
  

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpenLogin}
        onClose={() => handleClose()}
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
                  onClick={() => submitRegistration(validate(formData, errorSetters))}
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
            <Button onClick={() => handleClose()}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Login;

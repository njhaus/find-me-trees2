import { ChangeEvent, useRef, useState } from "react";

import {
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
import { FaSadCry, FaGoogle, FaSmile, FaTree, FaEnvelope, FaLaughWink } from "react-icons/fa";

// Validation in login/utils files -- includes ZOD validators and validate function
import { validate, iFormData, iFormErrors, initialErrors, initialFormData } from "../../utils/login_utils";
import { apiPost } from "../../services/api_client";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";


interface LoginProps {
  isOpenLogin: boolean;
  onCloseLogin: () => void;
}

function Login({ isOpenLogin, onCloseLogin }: LoginProps) {
  // Set initial form data to blank on opening of login modal
  const [formData, setFormData] = useState<iFormData>(initialFormData);

  // Set whether user is logging in or registering (Renders register or login on page)
  const [isRegistering, setIsRegistering] = useState(false);

  // Set error messages -- these come from ZOD (For front-end validataion) OR from the server response (For back-end validation)
  const [errors, setErrors] = useState<iFormErrors>(initialErrors);

  // Ref to set up initial focus on form when login modal is opened
  const initialRef = useRef(null);

  // Set auth context upon register or login
  const { setAuth } = useAuth();

  // Navigate user to /user page when logged in/registered
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/user/test';

  // Handles form values by listening for change events in child input components
  // AND validates(if form has been initially validated.
  // This only happens after initial validation to avoid constant error messages popping up before user hs even tried to type anything)
  const handleForm = (e: ChangeEvent<HTMLInputElement>, dataType: string) => {
    // Set value in formData
    const val = e.target.value;
    setFormData({ ...formData, [dataType]: val });
    // validate IF form has already been validated once -- uses validate function from utils/login_utils.
    if (errors.username || errors.password || errors.email)
      validate({ ...formData, [dataType]: val }, setErrors);
  };

  // Form submission -- handles login and register (need to move to client)
  const handleSubmit = async (slug: string, body: iFormData) => {
    const loggedInUser = await apiPost(slug, body);
    if (loggedInUser.username) {
      setAuth(loggedInUser);
      handleClose();
      navigate(from, { replace: true });
    }
    else console.log("error" + loggedInUser);
  };


  // --the 'valid' argument is achieved by running the validataion function (found in utils/loginutils -- see function call in register button below)
  const submitLocalRegistration = (valid: boolean) => {
    if (valid) {
      handleSubmit("login/register/local", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
    } else {
      console.log("invalid registration attempt");
    }
  };

  // Need a handleClose function to reset form and errors when login modal is closed
  const handleClose = () => {
    setFormData(initialFormData);
    setErrors(initialErrors);
    setIsRegistering(false);
    onCloseLogin();
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpenLogin}
        onClose={() => handleClose()}
      >
        <ModalOverlay onClick={() => handleClose()} />
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
          <ModalCloseButton onClick={() => handleClose()} />
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
              error={errors.username}
            ></IconInput>

            {isRegistering && (
              <IconInput
                icon={<FaEnvelope />}
                labelText="Email:"
                labelFor="email"
                inputPlaceholder="email"
                inputType="email"
                val={formData.email}
                onChange={handleForm}
                error={errors.email}
              ></IconInput>
            )}

            <IconInput
              icon={<FaLaughWink />}
              labelText="Password:"
              labelFor="password"
              inputPlaceholder="password"
              inputType="password"
              val={formData.password}
              onChange={handleForm}
              error={errors.password}
            ></IconInput>

            {!isRegistering && (
              <>
                <Button
                  leftIcon={<FaSmile />}
                  display={"block"}
                  width={"85%"}
                  margin={"1rem auto"}
                  variant="solid"
                  onClick={() =>
                    handleSubmit("login/local", {
                      username: formData.username,
                      email: formData.email,
                      password: formData.password,
                    })
                  }
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
              </>
            )}
            {isRegistering && (
              <>
                <Button
                  leftIcon={<FaTree />}
                  display={"block"}
                  width={"85%"}
                  margin={"1rem auto"}
                  variant="solid"
                  onClick={() =>
                    submitLocalRegistration(validate(formData, setErrors))
                  }
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
                <Button
                  leftIcon={<FaTree />}
                  display={"block"}
                  width={"85%"}
                  margin={"1rem auto"}
                  variant="solid"
                  onClick={() => {
                    setIsRegistering(false);
                  }}
                >
                  Login with Existing Account
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

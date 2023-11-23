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
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";


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
  // Ref to focus on error for screenreaders
  const errorRef = useRef(null);

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
    const tempData = {
      username: formData.username ? formData.username : "usernameplaceholder",
      email: formData.email ? formData.email : "email@placeholder.com",
      password: formData.password ? formData.password : "Placeholder1",
    };
      validate(tempData, setErrors);
  };

  // Form submission -- handles login and register (need to move to client)
  const handleSubmit = async (slug: string, body: iFormData) => {
    const loggedInUser = await apiPost(slug, body);
    if (loggedInUser.username) {
      setAuth(loggedInUser);
      console.log('success' + loggedInUser);
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

  // Handle whether register or login is showing
  const handleIsRegistering = (set: boolean) => {
    setIsRegistering(set);
  }

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
              <Heading as={"h4"}>{isRegistering ? 'Register' : 'Login' }</Heading>
              <LogoImgOnly />
            </Flex>
          </ModalHeader>
          <ModalCloseButton onClick={() => handleClose()} />
          <ModalBody pb={6}>

            {isRegistering
              ? <RegisterForm
                handleForm={handleForm}
                handleIsRegistering={handleIsRegistering}
                submitLocalRegistration={submitLocalRegistration}
                formData={formData}
                errors={errors}
                setErrors={setErrors}
              />
              : <LoginForm
               handleForm={handleForm}
                handleIsRegistering={handleIsRegistering}
                handleSubmit={handleSubmit}
                formData={formData}
                errors={errors}
              />}
            
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

import { ChangeEvent, forwardRef, useEffect, useRef, useState } from "react";

import {
  Button, Text
} from "@chakra-ui/react";

import {
  FaGoogle,
  FaPencilAlt,
  FaSmile,
  FaTree,
  FaUserShield
} from "react-icons/fa";
import IconInput from "../inputs/IconInput";

// Validation in login/utils files -- includes ZOD validators and validateTextInput function
import {
  iFormData,
  iFormErrors,
} from "../../utils/login_utils";

import { validateTextInput } from "../../utils/input_utils";

interface iLoginForm {
  handleForm: (e: ChangeEvent<HTMLInputElement>, dataType: string) => void;
  handleIsRegistering: (set: boolean) => void;
  submitLogin: (valid: boolean, slug: string) => void;
  formData: iFormData;
    errors: iFormErrors;
    serverError: string;
}

const LoginForm = forwardRef<HTMLInputElement, iLoginForm>(({handleForm, handleIsRegistering, submitLogin, formData, serverError}, ref) => {
  const [error, setError] = useState("");

  // Ref to focus on error for screenreaders -- this error is ONLY for form validation (no html in this case)
  const errorRef = useRef<HTMLParagraphElement>(null);
  // Ref to set up initial focus on form when login modal is opened
  // const initialRef = useRef<HTMLInputElement>(null);
  // Error ref for screenreaders -- this will focus on all server errors
  // const serverErrorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (errorRef && errorRef.current && errorRef.current?.innerText !== "")
      errorRef.current.focus();
    // else if (initialRef && initialRef.current) initialRef.current.focus();
  }, [serverError, error]);

  // Need to reformat data for use in noHTML validator-- this just retypes the iFormData object so the validateTextInput function can understand it
  const transformedData: { [key: string]: string } = {
    username: formData.username,
    password: formData.password,
  };

  useEffect(() => {
    setError("");
  }, [formData]);

  return (
    <>
      <form autoComplete="off">
        <Text ref={errorRef} tabIndex={0}>
          {error && error}
          {serverError && serverError}
        </Text>
        <IconInput
          icon={<FaPencilAlt />}
          labelText="Username:"
          labelFor="username"
          inputPlaceholder="username"
          inputType="text"
          ref={ref}
          val={formData.username}
          onChange={handleForm}
          error={""}
        ></IconInput>

        <IconInput
          icon={<FaUserShield />}
          labelText="Password:"
          labelFor="password"
          inputPlaceholder="password"
          inputType="password"
          val={formData.password}
          onChange={handleForm}
          error={""}
        ></IconInput>
        <Button
          isDisabled={!formData.username || !formData.password ? true : false}
          leftIcon={<FaSmile />}
          display={"block"}
          width={"85%"}
          margin={"1rem auto"}
          variant="solid"
          onClick={() =>
            submitLogin(
              validateTextInput(transformedData, setError),
              "login/local"
            )
          }
        >
          Login
        </Button>
      </form>
      <Button
        isDisabled={true}
        type={"button"}
        leftIcon={<FaGoogle />}
        display={"block"}
        width={"85%"}
        margin={"1rem auto"}
        variant="solid"
      >
        Login with Google
      </Button>
      <Button
        type={"button"}
        leftIcon={<FaTree />}
        display={"block"}
        width={"85%"}
        margin={"1rem auto"}
        variant="solid"
        onClick={() => handleIsRegistering(true)}
      >
        Create an account
      </Button>
    </>
  );
});

export default LoginForm;

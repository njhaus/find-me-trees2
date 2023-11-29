import { ChangeEvent, forwardRef, useState} from "react";

import {
  Button,
  
} from "@chakra-ui/react";

import IconInput from "../inputs/IconInput";
import {
  FaTree,
    FaEnvelope,
    FaSadCry,
  FaLaughWink
} from "react-icons/fa";

// Validation in login/utils files -- includes ZOD validators and validateNewUser function
import {
  validateNewUser,
  iFormData,
  iFormErrors,
    initialErrors
} from "../../utils/login_utils";

interface iRegisterForm {
  handleForm: (e: ChangeEvent<HTMLInputElement>, dataType: string) => void;
  handleIsRegistering: (set: boolean) => void;
  submitLocalRegistration: (valid: boolean, slug: string) => void;
  formData: iFormData;
  errors: iFormErrors;
  setErrors: React.Dispatch<React.SetStateAction<iFormErrors>>;
}


const RegisterForm = forwardRef<HTMLInputElement, iRegisterForm>(
  ({ handleForm, handleIsRegistering, submitLocalRegistration, formData, errors, setErrors }, ref) => {

    const [reenterPassword, setReenterPassword] = useState('');
    const [reenterError, setReenterError] = useState('');
    // FC = First Check (Keeps errors from showing if user hasn't even finished typing for their first time)
    const [usernameFC, setUsernameFC] = useState(false);
    const [emailFC, setEmailFC] = useState(false);
    const [passwordFC, setPasswordFC] = useState(false);
    const [reenterFirstCheck, setReenterFirstCheck] = useState(false);

    

    const handleReenterPassword = (e: ChangeEvent<HTMLInputElement>) => {
      setReenterPassword(e.target.value);
      if (reenterFirstCheck) {
        handleReenterError();
      }
    };

    const handleReenterError = () => {
      console.log(formData.password);
      console.log(reenterPassword);
      if (formData.password && reenterPassword !== formData.password) {
        setReenterError('Passwords must match');
      }
      else {
        setReenterError("");
      }
    }

    const handleBlur = (
          checker: string,
          setter: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
      if (checker) {
        setter(true);
        validateNewUser(formData, setErrors);
      }
        };

    return (
      <>
        <form>
          <IconInput
            icon={<FaSadCry />}
            labelText="Username:"
            labelFor="reg-username"
            inputPlaceholder="username"
            inputType="text"
            ref={ref}
            val={formData.username}
            onChange={handleForm}
            error={usernameFC ? errors.username : ""}
            onBlur={() => handleBlur(formData.username, setUsernameFC)}
          ></IconInput>
          <IconInput
            ref={ref}
            icon={<FaEnvelope />}
            labelText="Email:"
            labelFor="reg-email"
            inputPlaceholder="email"
            inputType="email"
            val={formData.email}
            onChange={handleForm}
            error={emailFC ? errors.email : ""}
            onBlur={() => handleBlur(formData.email, setEmailFC)}
          ></IconInput>
          <IconInput
            icon={<FaLaughWink />}
            labelText="Password:"
            labelFor="reg-password"
            inputPlaceholder="password"
            inputType="password"
            val={formData.password}
            onChange={handleForm}
            error={passwordFC ? errors.password : ""}
            onBlur={() => handleBlur(formData.password, setPasswordFC)}
          ></IconInput>
          <IconInput
            icon={<FaLaughWink />}
            labelText="Re-Enter Password:"
            labelFor="reg-reenter-password"
            inputPlaceholder="Re-enter Password"
            inputType="password"
            val={reenterPassword}
            onChange={(e) => {
              handleReenterPassword(e);
            }}
            onBlur={() => {
              setReenterFirstCheck(true);
              handleReenterError();
            }}
            error={reenterFirstCheck ? reenterError : ""}
          ></IconInput>
          <Button
            isDisabled={
              validateNewUser(formData) && reenterPassword === formData.password
                ? false
                : true
            }
            leftIcon={<FaTree />}
            display={"block"}
            width={"85%"}
            margin={"1rem auto"}
            variant="solid"
            onClick={() =>
              submitLocalRegistration(
                validateNewUser(formData, setErrors),
                "login/register/local"
              )
            }
          >
            Register
          </Button>
        </form>
        <Button
          isDisabled={true}
          type={"button"}
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
          type={"button"}
          leftIcon={<FaTree />}
          display={"block"}
          width={"85%"}
          margin={"1rem auto"}
          variant="solid"
          onClick={() => {
            handleIsRegistering(false);
          }}
        >
          Login with Existing Account
        </Button>
      </>
    );
  }
);

export default RegisterForm;

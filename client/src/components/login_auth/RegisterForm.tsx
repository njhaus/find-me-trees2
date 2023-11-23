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

// Validation in login/utils files -- includes ZOD validators and validate function
import {
  validate,
  iFormData,
    iFormErrors,
} from "../../utils/login_utils";

interface iRegisterForm {
  handleForm: (e: ChangeEvent<HTMLInputElement>, dataType: string) => void;
  handleIsRegistering: (set: boolean) => void;
  submitLocalRegistration: (valid: boolean) => void;
  formData: iFormData;
  errors: iFormErrors;
  setErrors: React.Dispatch<React.SetStateAction<iFormErrors>>;
}


const RegisterForm = forwardRef<HTMLInputElement, iRegisterForm>(
    ({ handleForm, handleIsRegistering, submitLocalRegistration, formData, errors, setErrors }, ref) => {

        const handleBlur = () => {
            const tempData = {
              username: formData.username
                ? formData.username
                : "usernameplaceholder",
              email: formData.email ? formData.email : "email@placeholder.com",
              password: formData.password
                ? formData.password
                : "Placeholder1",
            };
            console.log('password:', tempData.password)
            validate(tempData, setErrors);
        }

    return (
      <>
        <form>
          <IconInput
            icon={<FaSadCry />}
            labelText="Username:"
            labelFor="username"
            inputPlaceholder="username"
            inputType="text"
            ref={ref}
            val={formData.username}
            onChange={handleForm}
            error={errors.username}
            onBlur={() => handleBlur()}
          ></IconInput>
          <IconInput
            ref={ref}
            icon={<FaEnvelope />}
            labelText="Email:"
            labelFor="email"
            inputPlaceholder="email"
            inputType="email"
            val={formData.email}
            onChange={handleForm}
            error={errors.email}
            onBlur={() => handleBlur()}
          ></IconInput>
          <IconInput
            icon={<FaLaughWink />}
            labelText="Password:"
            labelFor="password"
            inputPlaceholder="password"
            inputType="password"
            val={formData.password}
            onChange={handleForm}
            error={errors.password}
            onBlur={() => handleBlur()}
          ></IconInput>
          {/* <IconInput
            icon={<FaLaughWink />}
            labelText="Re-enter password:"
            labelFor="password"
            inputPlaceholder="password"
            inputType="password"
            val={''}
            onChange={handleForm}
            error={errors.password}
          ></IconInput> */}
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
        </form>
        <Button
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

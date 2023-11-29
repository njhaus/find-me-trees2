import { ChangeEvent, forwardRef, useState, useEffect} from "react";

import {
  Button, Text
} from "@chakra-ui/react";

import IconInput from "../inputs/IconInput";
import {
  FaSadCry,
  FaGoogle,
  FaSmile,
  FaTree,
  FaLaughWink,
} from "react-icons/fa";

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
}

const LoginForm = forwardRef<HTMLInputElement, iLoginForm>(({handleForm, handleIsRegistering, submitLogin, formData, errors}, ref) => {
    
    const [error, setError] = useState('');
    
    // Need to reformat data for use in noHTML validator-- this just retypes the iFormData object so the validateTextInput function can understand it
    const transformedData: { [key: string]: string } = {
        username: formData.username,
        password: formData.password
    };

    useEffect(() => {
        setError('')
    }, [formData])
    
    return (
    <>
            <form>
                {error && <Text>{error}</Text>}
            <IconInput
                icon={<FaSadCry />}
                labelText="Username:"
                labelFor="username"
                inputPlaceholder="username"
                inputType="text"
                ref={ref}
                val={formData.username}
                onChange={handleForm}
                error={''}
            ></IconInput>

            <IconInput
                icon={<FaLaughWink />}
                labelText="Password:"
                labelFor="password"
                inputPlaceholder="password"
                inputType="password"
                val={formData.password}
                onChange={handleForm}
                error={''}
            ></IconInput>
                <Button
                    isDisabled={(!formData.username || !formData.password) ? true : false }
                leftIcon={<FaSmile />}
                display={"block"}
                width={"85%"}
                margin={"1rem auto"}
                variant="solid"
                onClick={() =>
                submitLogin(validateTextInput(transformedData, setError), "login/local")
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

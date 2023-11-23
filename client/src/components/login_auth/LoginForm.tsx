import { ChangeEvent, forwardRef} from "react";

import {
  Button,
} from "@chakra-ui/react";

import IconInput from "../inputs/IconInput";
import {
  FaSadCry,
  FaGoogle,
  FaSmile,
  FaTree,
  FaLaughWink,
} from "react-icons/fa";

// Validation in login/utils files -- includes ZOD validators and validate function
import {
  iFormData,
  iFormErrors,
} from "../../utils/login_utils";

interface iLoginForm {
    handleForm: (e: ChangeEvent<HTMLInputElement>, dataType: string) => void;
    handleIsRegistering: (set: boolean) => void;
     handleSubmit: (slug: string, body: iFormData) => void;
    formData: iFormData;
    errors: iFormErrors;
}

const LoginForm = forwardRef<HTMLInputElement, iLoginForm>(({handleForm, handleIsRegistering, handleSubmit, formData, errors}, ref) => {
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
        </form>
        <Button
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

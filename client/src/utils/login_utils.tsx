// ZOD validataion
import { ZodError, z } from "zod";
import { noHtmlRegex } from "./input_utils";

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*])(?!.*\s)(?=.{8,})/;
;

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const initialFormData = { username: "", email: "", password: "" };
export const initialErrors = { username: "", email: "", password: "" };


export interface iFormData {
  username: string;
  email: string;
  password: string;
}

export interface iFormErrors {
  username: string;
  email: string;
  password: string;
}

export const newUser = z.object({
  username: z
    .string()
    .regex(noHtmlRegex, {
      message: "Cannot contain spaces or invalid characters",
    })
    .min(4, { message: "Username must be at least 4 characters" }),
  email: z.string().regex(emailRegex, { message: "Must use a valid email" }),
  password: z
    .string()
    .regex(noHtmlRegex, {
      message: "Cannot contain spaces or invalid characters",
    })
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(passwordRegex, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number or valid special character: ! # % ^ $ & *",
    }),
});

type NewUser = z.infer<typeof newUser>;

export const validateNewUser = (
  data: iFormData,
    setErrors?: React.Dispatch<React.SetStateAction<iFormErrors>>,
): boolean => {
  // Reset errors
  if(setErrors) setErrors(initialErrors)
    try {
      newUser.parse(data);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const zodErrors: ZodError<any> = err;
        const errorsArray = zodErrors.errors;
        const errorsObj: iFormErrors = {
          username: "",
          email: "",
          password: "",
        };
        errorsArray.map(
          (e) => (errorsObj[e.path[0] as keyof iFormErrors] = e.message)
        );
        if (setErrors) setErrors(errorsObj);
        return false;
      }
    }
    return true;
};
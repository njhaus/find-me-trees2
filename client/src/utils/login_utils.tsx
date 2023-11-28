// ZOD validataion
import { ZodError, z } from "zod";

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*])(?!.*\s)(?=.{8,})/;
;

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const noHtmlRegex = /^[^\s<>?'&"`]+$/g;

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

export const validate = (
  data: iFormData,
    setErrors: React.Dispatch<React.SetStateAction<iFormErrors>>,
  ): boolean => {
    // Reset errors
      setErrors(initialErrors)
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
        setErrors(errorsObj);

        return false;
      }
    }
    return true;
  };

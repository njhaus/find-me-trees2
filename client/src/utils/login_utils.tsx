import { ZodError, z } from "zod";

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*])(?=.{8,})/;

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export interface FormData {
  username: string;
  email: string;
  password: string;
}

export const initialFormData = { username: "", email: "", password: "" };


export const newUser = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters." }),
  email: z.string().regex(emailRegex, { message: "Must use a valid email." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(passwordRegex, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number or special character.",
    }),
});

type NewUser = z.infer<typeof newUser>;

  export const validate = (
    data: FormData,
    errors: React.Dispatch<React.SetStateAction<string>>[]
  ): boolean => {
    // Reset errors
      errors.forEach((err) => (
        err('')
    ))
    try {
      newUser.parse(data);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const zodErrors: ZodError<any> = err;
        const errorsArray = zodErrors.errors;
        const errorsObj: FormData = {
          username: "",
          email: "",
          password: "",
        };
        errorsArray.map(
          (e) => (errorsObj[e.path[0] as keyof FormData] = e.message)
        );
          const getErrors = Object.values(errorsObj);
          errors.forEach((err, i) => (
            err(getErrors[i])
          ))
        return false;
      }
    }
    return true;
  };

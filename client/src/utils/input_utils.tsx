import { ZodError, z } from "zod";

export const noHtmlRegex = /^[^\s<>?'&"`]+$/g;

export const validTextInput = z.string().regex(noHtmlRegex, {
  message: "Cannot contain spaces or invalid characters",
});

export const validateTextInput = (
    data: { [key: string]: string },
    setError?: React.Dispatch<React.SetStateAction<string>>
): boolean => {
    let error = '';
    for (let k in data) {
        const val = data[k];
        console.log(val);
        try {
          validTextInput.parse(val);
        } catch (err) {
            if (err instanceof z.ZodError) {
                console.log(err);
                if (err.errors.length > 0 && setError) setError(err.errors[0].message);
                return false
          }
        }
    }
    console.log('valid form!')
    return true;
};
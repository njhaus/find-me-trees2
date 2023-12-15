import { ZodError, z } from "zod";

export const noHtmlRegex = /^[^<>?'&"`]+$/g;

export const validTextInput = z.string().regex(noHtmlRegex, {
  message: "Cannot contain invalid characters",
});

export const validateTextInput = (
    data: { [key: string]: string },
    setError?: React.Dispatch<React.SetStateAction<string>>
): boolean => {
    let error = '';
  for (let k in data) {
    if(!data[k]) return true
        const val = data[k];
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
    return true;
};
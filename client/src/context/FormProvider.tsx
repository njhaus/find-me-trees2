import { createContext } from "react";

import { initialFormData, iFormData } from "../utils/login_utils";


// Set form context (Form found in SearchFilters and inputs are in many children within SearchFilters)
export interface iFormDataContext {
  formData: iFormData;
  setFormData: React.Dispatch<React.SetStateAction<iFormData>>;
}
export const FormDataContext = createContext<iFormDataContext>({
  formData: initialFormData,
  setFormData: () => FormData,
});

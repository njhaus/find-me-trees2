import { FormEvent, createContext, useContext, useState } from "react";

import { Flex } from "@chakra-ui/react";

import SearchFilters from "./SearchFilters";
import TreeList from "./TreeList";
import BrowseTitle from "./BrowseTitle";
import { iFormData } from "../../data/browse_data/filterFormData";
import initialFormData from "../../data/browse_data/filterFormData";

// Set form context (Form found in SearchFilters and inputs are in many children within SearchFilters)
export interface iFormDataContext {
  formData: iFormData;
  setFormData: React.Dispatch<React.SetStateAction<iFormData>>;
}
export const FormDataContext = createContext<iFormDataContext>({
  formData: initialFormData,
  setFormData: () => FormData,
});

const Browse = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setFormData(initialFormData);
  };

  return (
    <Flex direction={"column"}>
      <BrowseTitle />
      <FormDataContext.Provider value={{ formData, setFormData }}>
        <SearchFilters onSubmit={handleSubmit} />
        <TreeList />
      </FormDataContext.Provider>
    </Flex>
  );
};

export default Browse;

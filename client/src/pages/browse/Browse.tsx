import { createContext, useState } from "react"

import { Flex } from "@chakra-ui/react"

import SearchFilters from "./SearchFilters"
import TreeList from "./TreeList"
import BrowseTitle from "./BrowseTitle"
import initialFormData from "./data/filterFormData"
import { FormData } from "./data/filterFormData"

export interface iFormDataContext {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}
export const FormDataContext = createContext<iFormDataContext>({
  formData: initialFormData,
  setFormData: () => FormData,
});

const Browse = () => {
  
  const [formData, setFormData] = useState(initialFormData);

  return (
    <Flex direction={'column'}>
      <BrowseTitle />
      <FormDataContext.Provider value={{ formData, setFormData }}>
        <SearchFilters />
        <TreeList />
      </FormDataContext.Provider>
    </Flex>
  )
}

export default Browse

import { useContext } from "react";

import { Flex } from "@chakra-ui/react"

import CheckboxInput from "../../../components/inputs/CheckboxInput"
import { barkFilters } from "../data/filterFormData"
import { FormDataContext, iFormDataContext } from "../Browse";

const BarkFilter = () => {

  const { formData, setFormData }: iFormDataContext =
    useContext(FormDataContext);

  const handleChange = (key: string, val: string) => {
    setFormData({ ...formData, [key]: val });
  };

  return (
    <Flex>
      {barkFilters.map((filter, i) => (
        <CheckboxInput
          key={i}
          label={filter.label}
          values={filter.values}
          helperText={filter.helperText}
          formName={filter.formName}
        />
      ))}
      
    </Flex>
  )
}

export default BarkFilter

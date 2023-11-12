import { useContext } from "react";

import { Flex } from "@chakra-ui/react";

import RadioInput from "../../../components/inputs/RadioInput";
import { fruitFilters } from "../data/filterFormData";
import { FormDataContext, iFormDataContext } from "../Browse";

const FruitFilter = () => {

  const { formData, setFormData }: iFormDataContext = useContext(FormDataContext);
  
  const handleChange = (key: string, val: string) => {
    setFormData({...formData, [key]: val})
  }
  
  return (
    <Flex>
      {fruitFilters.map((filter, i) => (
        <RadioInput
          key={i}
          formVal={formData[filter.formName]}
          label={filter.label}
          values={filter.values}
          helperText={filter.helperText}
          formName={filter.formName}
          onChange={handleChange}
        />
      ))}
    </Flex>
  );
};

export default FruitFilter;

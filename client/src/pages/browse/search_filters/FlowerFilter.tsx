import { useContext } from "react";

import { Flex } from "@chakra-ui/react";

import RadioInput from "../../../components/inputs/RadioInput";
import { flowerFilters } from "../data/filterFormData";
import { FormDataContext, iFormDataContext } from "../Browse";

const FlowerFilter = () => {

  const { formData, setFormData }: iFormDataContext =
    useContext(FormDataContext);

  const handleChange = (key: string, val: string) => {
    setFormData({ ...formData, [key]: val });
  };

  return (
    <Flex>
      {flowerFilters.map((filter, i) => (
        <RadioInput
          key={i}
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

export default FlowerFilter;

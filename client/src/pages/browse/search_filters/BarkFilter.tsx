import { useContext } from "react";

import { Flex } from "@chakra-ui/react";

import CheckboxInput from "../../../components/inputs/BrowseCheckboxInput";
import { barkFilters } from "../../../data/browse_data/filterFormData";
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

export default BarkFilter;

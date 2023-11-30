import { useContext } from "react";

import { Flex } from "@chakra-ui/react";

import RadioInput from "../../../components/inputs/BrowseRadioInput";
import { leafFilters } from "../../../data/browse_data/filterFormData";
import { FormDataContext, iFormDataContext } from "../Browse";

const LeafFilter = () => {
  const { formData, setFormData }: iFormDataContext =
    useContext(FormDataContext);

  const handleChange = (key: string, val: string) => {
    setFormData({ ...formData, [key]: val });
  };

  console.log(formData);

  return (
    <Flex>
      {leafFilters.map((filter, i) => (
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

export default LeafFilter;

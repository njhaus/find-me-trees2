import { useContext } from "react";

import { Box, Flex } from "@chakra-ui/react";

import RadioInput from "../../../components/inputs/BrowseRadioInput";
import { barkFilters } from "../../../data/browse_data/filterFormData";
import { FormDataContext, iFormDataContext } from "../Browse";

const BarkFilter = () => {
  const { formData, setFormData }: iFormDataContext =
    useContext(FormDataContext);

  const handleChange = (key: string, val: string) => {
    setFormData({ ...formData, [key]: val });
  };

  return (
    <Flex direction={"column"} width={"100%"}>
      {barkFilters.map((filter, i) => (
        <Box key={i} width={"100%"} p={"0.5rem"} className="filter-group">
          <RadioInput
            formVal={formData[filter.formName]}
            label={filter.label}
            values={filter.values}
            helperText={filter.helperText}
            helperLink={filter.helperLink}
            formName={filter.formName}
            onChange={handleChange}
          />
        </Box>
      ))}
    </Flex>
  );
};

export default BarkFilter;

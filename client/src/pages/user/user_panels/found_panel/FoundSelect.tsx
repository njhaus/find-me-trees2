import { Flex, Text } from "@chakra-ui/react";
import SelectInput from "../../../../components/inputs/BrowseSelectInput";
import { states } from "../../../../data/browse_data/statesData";

interface iFoundSelect {
  onSelect: (form: null, location: [number, number]) => void;
}

const FoundSelect = ({ onSelect }: iFoundSelect) => {
  // NEED TO REDO THIS COMPONENT

  return (
    <SelectInput
      formVal={location}
      label={"Select a state"}
      values={states}
      formName={"location"}
      onChange={onSelect}
    />
  );
};

export default FoundSelect;

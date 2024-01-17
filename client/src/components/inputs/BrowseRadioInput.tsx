import { useState, useEffect } from "react";

import {
  FormControl,
  FormLabel,
  RadioGroup,
  HStack,
  Radio,
  Box
} from "@chakra-ui/react";
import { BsQuestionCircle } from "react-icons/bs";
import HelperText from "../../pages/browse/helper_text/HelperText";
import { Helper } from "../../data/browse_data/filterFormData";

interface RadioInputProps {
  formVal: string | undefined;
  label: string;
  values: string[];
  formName: string;
  onChange?: (...args: any[]) => void;
  helperText?: Helper[];
  helperLink?: string;
}

const RadioInput = ({ formVal, label, values, formName, helperText, helperLink, onChange }: RadioInputProps) => {
  const [value, setValue] = useState<string | undefined>(formVal);

  useEffect(() => {
    onChange?.(formName, value);
  }, [value]);

  return (
    <FormControl as="fieldset">
      <FormLabel as="legend" htmlFor={formName}>
        {label}
      </FormLabel>
      <RadioGroup defaultValue={value} id={formName}>
        <HStack spacing="24px" flexWrap={"wrap"}>
          {values.map((val, i) => (
            <Radio
              key={i}
              value={val}
              onChange={() => {
                setValue(val);
              }}
            >
              {val}
            </Radio>
          ))}
        </HStack>
      </RadioGroup>
      <Box width={"fit-content"} className="filter-icon">
        <Box className="filter-text" maxWidth={"80vw"} overflowX={"scroll"}>
          <HelperText helper={helperText ? helperText : []} helperLink={ helperLink ? helperLink : ''} />
        </Box>
        <BsQuestionCircle />
      </Box>
    </FormControl>
  );
};

export default RadioInput;

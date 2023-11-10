import { useState } from "react";

import {
  Flex,
  FormControl,
  FormLabel,
Checkbox,
  CheckboxGroup,
  HStack,
  FormHelperText,
} from "@chakra-ui/react";
import { BsQuestionCircle } from "react-icons/bs";

interface CheckboxInputProps {
  label: string;
  values: string[];
  formName: string;
  helperText?: string;
}

const CheckboxInput = ({ label, values, formName, helperText }: CheckboxInputProps) => {
  const [showHelpertext, setShowHelperText] = useState(false);

  return (
    <FormControl as="fieldset">
      <FormLabel as="legend">{label}</FormLabel>
      <CheckboxGroup>
        <HStack spacing="24px">
          {values.map((val, i) => (
            <Checkbox key={i} value={val}>
              {val}
            </Checkbox>
          ))}
        </HStack>
      </CheckboxGroup>
      {helperText && (
        <BsQuestionCircle onClick={() => setShowHelperText(!showHelpertext)} />
      )}
      {showHelpertext === true && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default CheckboxInput;

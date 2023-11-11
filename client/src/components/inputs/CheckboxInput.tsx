import { useState, useEffect } from "react";

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
  formVal: string | undefined;
  label: string;
  values: string[];
  formName: string;
  onChange?: (...args: any[]) => void;
  helperText?: string;
}

const CheckboxInput = ({ formVal, label, values, formName, onChange, helperText }: CheckboxInputProps) => {

  const [value, setValue] = useState<string | undefined>(formVal);

  const [showHelpertext, setShowHelperText] = useState(false);

  useEffect(() => {
    onChange?.(formName, value);
  }, [value]);

  return (
    <FormControl as="fieldset">
      <FormLabel as="legend">{label}</FormLabel>
      <CheckboxGroup>
        <HStack spacing="24px">
          {values.map((val, i) => (
            <Checkbox
              key={i}
              value={val}
              onChange={() => {
                value !== val ? setValue(val) : setValue(undefined);
              }}
            >
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

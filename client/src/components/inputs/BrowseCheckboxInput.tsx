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
  formVal: string[];
  label: string;
  values: string[];
  formName: string;
  onChange?: (...args: any[]) => void;
  helperText?: string;
}

const CheckboxInput = ({ formVal, label, values, formName, onChange, helperText }: CheckboxInputProps) => {

  const [value, setValue] = useState<string[]>(formVal);

  const [showHelpertext, setShowHelperText] = useState(false);

  useEffect(() => {
    onChange?.(formName, value);
  }, [value]);

  return (
    <FormControl as="fieldset">
      <FormLabel as="legend" htmlFor={formName}>
        {label}
      </FormLabel>
      <CheckboxGroup defaultValue={value}>
        <HStack spacing="24px">
          {values.map((val, i) => (
            <Checkbox
              key={i}
              value={val}
              isChecked={true}
              onChange={() => {
                value.includes(val)
                  ? setValue(value.filter((v) => v !== val))
                  : setValue([...value, val]);
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

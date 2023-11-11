import { useState, useEffect } from "react";

import {
  Flex,
  FormControl,
  FormLabel,
  RadioGroup,
  HStack,
  Radio,
  FormHelperText,
} from "@chakra-ui/react";
import { BsQuestionCircle } from "react-icons/bs";

interface RadioInputProps {
  formVal: string | undefined;
  label: string;
  values: string[];
  formName: string;
  onChange?: (...args: any[]) => void;
  helperText?: string;
}

const RadioInput = ({ formVal, label, values, formName, helperText, onChange }: RadioInputProps) => {
  const [value, setValue] = useState<string | undefined>(formVal);

  const [showHelpertext, setShowHelperText] = useState(false);

  useEffect(() => {
    onChange?.(formName, value);
  }, [value]);

  return (
    <FormControl as="fieldset">
      <FormLabel as="legend">{label}</FormLabel>
      <RadioGroup defaultValue="">
        <HStack spacing="24px">
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
      {helperText && (
        <BsQuestionCircle onClick={() => setShowHelperText(!showHelpertext)} />
      )}
      {showHelpertext === true && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default RadioInput;

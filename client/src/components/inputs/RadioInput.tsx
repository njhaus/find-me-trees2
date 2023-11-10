import { useState } from "react";

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
  label: string;
  values: string[];
  formName: string;
  onChange?: (...args: string[]) => void;
  helperText?: string;
}

const RadioInput = ({ label, values, formName, helperText, onChange }: RadioInputProps) => {
    
  const [showHelpertext, setShowHelperText] = useState(false)

  return (
    <FormControl as="fieldset">
      <FormLabel as="legend">{label}</FormLabel>
      <RadioGroup defaultValue="">
        <HStack spacing="24px">
          {values.map((val, i) => (
            <Radio
              key={i}
              value={val}
              onChange = { () => onChange?.(formName, val)}
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

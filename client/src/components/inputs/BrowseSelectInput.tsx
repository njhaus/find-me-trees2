import { useState, useEffect } from "react";

import {
  FormControl,
  FormLabel,
  Select,
  FormHelperText,
} from "@chakra-ui/react";
import { BsQuestionCircle } from "react-icons/bs";
import { GiConsoleController } from "react-icons/gi";

interface SelectInputProps {
  formVal: string | undefined;
  label: string;
  values: string[];
  helperText?: string;
  formName: string;
  onChange: (key: string, val: string) => void;
}

const SelectInput = ({ formVal, label, values, formName, helperText, onChange }: SelectInputProps) => {

  const [value, setValue] = useState<string | undefined>(formVal)

  const [showHelpertext, setShowHelperText] = useState(false);

  useEffect(() => {
    setValue(formVal)
  }, [formVal])

  return (
    <FormControl as="fieldset">
      <FormLabel as="legend" htmlFor={formName}>
        {label}
      </FormLabel>
      <Select
        id={formName}
        value={value}
        onChange={(e) => {
          if (e.target.value) {
            onChange("location", e.target.value) 
          }
        }}
      >
        <option value={undefined}>Choose one</option>
        {values.map((val, i) => (
          <option key={i} value={val}>
            {val}
          </option>
        ))}
      </Select>
      {helperText && (
        <BsQuestionCircle onClick={() => setShowHelperText(!showHelpertext)} />
      )}
      {showHelpertext === true && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SelectInput;

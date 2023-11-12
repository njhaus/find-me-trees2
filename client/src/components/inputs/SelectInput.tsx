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
  onChange?: (...args: any[]) => void;
}

const SelectInput = ({ formVal, label, values, formName, helperText, onChange }: SelectInputProps) => {

  const [value, setValue] = useState<string | undefined>(formVal)

  const [showHelpertext, setShowHelperText] = useState(false);

  useEffect(() => {
    onChange?.(formName, value);
  }, [value]);

  return (
    <FormControl as="fieldset">
      <FormLabel as="legend">{label}</FormLabel>
      <Select defaultValue={formVal} onChange={(e) => {
        e.target.value !== "" ? setValue(e.target.value) : setValue(undefined);
      }}>
        <option value={undefined}>
          Choose one
        </option>
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

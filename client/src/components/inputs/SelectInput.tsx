import { useState } from "react";

import {
  FormControl,
  FormLabel,
  Select,
  FormHelperText,
} from "@chakra-ui/react";
import { BsQuestionCircle } from "react-icons/bs";

interface SelectInputProps {
  label: string;
  values: string[];
  helperText?: string;
  formName: string;
  onChange?: (...args: string[]) => void;
}

const SelectInput = ({ label, values, formName, helperText, onChange }: SelectInputProps) => {
  const [showHelpertext, setShowHelperText] = useState(false);

  return (
    <FormControl as="fieldset">
      <FormLabel as="legend">{label}</FormLabel>
      <Select defaultValue={""} onChange={(e) => onChange?.(formName, e.target.value)}>
        <option value="" disabled>
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

import { useState, useEffect } from "react";

import { FormControl, FormLabel, Input } from "@chakra-ui/react";

interface TextInputProps {
  formVal: string | undefined;
  label: string;
  formName: string;
  onChange?: (...args: any[]) => void;
  helperText?: string;
}

const TextInput = ({
  formVal,
  label,
  formName,
  helperText,
  onChange,
}: TextInputProps) => {

  const [text, setText] = useState(formVal);

  useEffect(() => {
    onChange?.(formName, text);
  }, [text]);

  return (
    <FormControl display={"flex"}>
      <FormLabel>{label}</FormLabel>
          <Input
        value={text}
        placeholder={helperText}
        onChange={(e) => {
          setText(e.target.value);
        }}
        onClick={() => {
          setText('')
          onChange?.(formName, '')
        }}
      />
    </FormControl>
  );
};

export default TextInput;

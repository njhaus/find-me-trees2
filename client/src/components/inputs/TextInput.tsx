import { useState } from "react";

import { FormControl, FormLabel, Input } from "@chakra-ui/react";

interface TextInputProps {
  label: string;
  formName: string;
  onChange?: (...args: string[]) => void;
  helperText?: string;
}

const TextInput = ({
  label,
  formName,
  helperText,
  onChange,
}: TextInputProps) => {

    const [text, setText] = useState('');

  return (
    <FormControl display={"flex"}>
      <FormLabel>{label}</FormLabel>
          <Input
              value={text}
        placeholder={helperText}
              onChange={(e) => {
                  setText(e.target.value);
                  onChange?.(formName, e.target.value); 
              }}
              onClick={() => setText('')}
      />
    </FormControl>
  );
};

export default TextInput;

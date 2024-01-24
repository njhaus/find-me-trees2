import { useState, useEffect, useRef, forwardRef } from "react";
import { validateTextInput } from "../../utils/input_utils";

import { FormControl, FormLabel, Input } from "@chakra-ui/react";

interface TextInputProps {
  formVal: string | undefined;
  label: string;
  formName: string;
  onChange?: (...args: any[]) => void;
  helperText?: string;
}



const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { formVal, label, formName, helperText, onChange }: TextInputProps,
    ref
  ) => {

  const [text, setText] = useState(formVal);

  useEffect(() => {
    onChange?.(formName, text);
  }, [text]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef && inputRef.current) {
    inputRef.current.focus();
  }
}, [focus, inputRef]);


  return (
    <FormControl display={"flex"}>
      <FormLabel
      htmlFor={formName}
      >{label}</FormLabel>
      <Input
        borderColor={'main.700'}
        ref={ref}
        id={formName}
        value={text}
        placeholder={helperText}
        onChange={(e) => {
          if (validateTextInput({ data: e.target.value })) {
            setText(e.target.value);
          }
        }}
        onClick={() => {
          setText("");
          onChange?.(formName, "");
        }}
      />
    </FormControl>
  );
  });

export default TextInput;

import { useState, useEffect, useRef, MutableRefObject, forwardRef } from "react";

import { FormControl, FormLabel, Input } from "@chakra-ui/react";

interface TextInputProps {
  formVal: string | undefined;
  label: string;
  formName: string;
  onChange?: (...args: any[]) => void;
  helperText?: string;
  // ref: MutableRefObject<null>
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
        ref={ref}
        id={formName}
        value={text}
        placeholder={helperText}
        onChange={(e) => {
          setText(e.target.value);
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
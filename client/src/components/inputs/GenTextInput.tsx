import  { forwardRef, useState } from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react';


interface TextInputProps {
  formVal: string | undefined;
  label: string;
  formName: string;
  onChange: (...args: any[]) => void;
  helperText?: string;
}


const GenTextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { formVal, label, formName, helperText, onChange }: TextInputProps,
    ref
  ) =>
  {
    const [inputVal, setInputVal] = useState(formVal);

  return (
    <FormControl display={"flex"}>
      <FormLabel htmlFor={formName}>{label}</FormLabel>
      <Input
        ref={ref}
        id={formName}
        value={inputVal}
        placeholder="New Collection"
        onChange={(e) => {
            setInputVal(e.target.value);
        }}
        onBlur={(e) => onChange(e.target.value)}
        onClick={() => {
          setInputVal("");
        }}
      />
    </FormControl>
  );
})

export default GenTextInput

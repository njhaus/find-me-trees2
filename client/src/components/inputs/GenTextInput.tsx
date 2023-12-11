import  { forwardRef, useState, useEffect } from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react';


interface TextInputProps {
  formVal: string | undefined;
  label: string;
  formName: string;
  onSubmit: (...args: any[]) => void;
  helperText?: string;
}


const GenTextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { formVal, label, formName, helperText, onSubmit }: TextInputProps,
    ref
  ) =>
  {
    const [inputVal, setInputVal] = useState(formVal);

    useEffect(() => {
      setInputVal(formVal);
    }, [formVal])

  return (
    <FormControl display={"flex"}>
      <FormLabel htmlFor={formName}>{label}</FormLabel>
      <Input
        ref={ref}
        id={formName}
        value={inputVal}
        placeholder={formVal}
        onChange={(e) => {
            setInputVal(e.target.value);
        }}
        onBlur={(e) => onSubmit(e.target.value)}
        onClick={() => {
          setInputVal("");
        }}
      />
    </FormControl>
  );
})

export default GenTextInput

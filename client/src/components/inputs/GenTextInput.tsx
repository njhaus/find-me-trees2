import  { forwardRef, useState, useEffect } from 'react'
import { FormControl, FormLabel, Input, Text, Box } from '@chakra-ui/react';
import { validateTextInput } from '../../utils/input_utils';


interface TextInputProps {
  formVal: string | undefined;
  label: string;
  formName: string;
  onSubmit: (...args: any[]) => void;  
  validation?: (val: string) => boolean;
  errMsg?: string;
}


const GenTextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { formVal, label, formName, onSubmit, validation, errMsg }: TextInputProps,
    ref
  ) =>
  {
    const [inputVal, setInputVal] = useState(formVal);

    const [error, setError] = useState('')

    useEffect(() => {
      setInputVal(formVal);
    }, [formVal])

    console.log(error)

  return (
    <FormControl>
      <Box display={"flex"}>
        <FormLabel whiteSpace={"nowrap"} htmlFor={formName}>
          {label}
        </FormLabel>
        <Input
          ref={ref}
          id={formName}
          value={inputVal}
          placeholder={formVal}
          onChange={(e) => {
            if (validation && validation(e.target.value)) {
              setError("");
            }
            if (validateTextInput({ data: e.target.value })) {
              setInputVal(e.target.value);
            }
          }}
          onBlur={(e) => {
            if (validation && !validation(e.target.value) && e.target.value !== '') {
              errMsg && setError(errMsg);
            } else {
              onSubmit(e.target.value);
              setError('')
            }
          }}
          onClick={() => {
            setInputVal("");
          }}
        />
      </Box>
      <Text variant={"error"}>{error}</Text>
    </FormControl>
  );
})

export default GenTextInput

import { forwardRef, useState } from "react";

import { FormControl, FormLabel, CheckboxGroup, HStack, Checkbox } from "@chakra-ui/react";


interface TextInputProps {
  formVal: string | undefined;
  label: string;
  formName: string;
  onChange: (...args: any[]) => void;
  helperText?: string;
}


const GenCheckboxInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { formVal, label, formName, helperText, onChange }: TextInputProps,
    ref
  ) =>
    {
        
        const [inputVal, setInputVal] = useState(formVal)

  return (
    <FormControl as="fieldset">
      <FormLabel as="legend" htmlFor={formName}>
        {label}
      </FormLabel>
      <CheckboxGroup defaultValue={value}>
        <HStack spacing="24px">
          {values.map((val, i) => (
            <Checkbox
              key={i}
              value={val}
              isChecked={true}
              onChange={() => {
                value.includes(val)
                  ? setValue(value.filter((v) => v !== val))
                  : setValue([...value, val]);
              }}
            >
              {val}
            </Checkbox>
          ))}
        </HStack>
        </CheckboxGroup>
    </FormControl>
  )
})

export default GenCheckboxInput

import { forwardRef, ReactNode, useRef, useEffect, ChangeEvent } from "react";

import { InputGroup, InputLeftElement, Input, FormLabel, Stack, Text } from "@chakra-ui/react";

import { BsExclamationTriangleFill } from "react-icons/bs";


interface iIconInput {
  icon: ReactNode;
  labelText: string;
  labelFor: string;
  inputPlaceholder: string;
  inputType: string;
  val: string;
  onChange: (e: ChangeEvent<HTMLInputElement>, dataType: string) => void;
  error?: string;
  onBlur?: () => void;
}

const IconInput = forwardRef<HTMLInputElement, iIconInput>(({ icon, labelText, labelFor, inputPlaceholder, inputType, val, onChange, error, onBlur}: iIconInput, ref) => {

  return (
    <Stack>
      <FormLabel htmlFor={labelFor}>{labelText}</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>
        <Input
          ref={ref}
          type={inputType}
          id={labelFor}
          name={labelFor}
          placeholder={inputPlaceholder}
          onChange={(e) => onChange(e, labelFor)}
          onBlur={onBlur}
          autoComplete="off"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error}
        />
      </InputGroup>
      {(error && val) && <Text className="errText" color={'red'} aria-live="assertive" display={'flex'} flexDirection={'row'} tabIndex={0}><BsExclamationTriangleFill /><span className='sr-only'>{ labelText} error</span>{error}</Text>}
    </Stack>
  );
});

export default IconInput


import { forwardRef, ReactNode, useRef, useEffect, ChangeEvent, useState } from "react";

import { InputGroup, InputLeftElement, Input, FormLabel, Stack, Text, Flex } from "@chakra-ui/react";

import { BsExclamationTriangleFill } from "react-icons/bs";
import { validateTextInput } from "../../utils/input_utils";


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

  const [value, setValue] = useState(val)

  return (
    <Stack>
      <FormLabel htmlFor={labelFor} mt={"0.5rem"} mb={"0"}>
        {labelText}
      </FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>
        <Input
          value={value}
          ref={ref}
          type={inputType}
          id={labelFor}
          name={labelFor}
          placeholder={inputPlaceholder}
          onChange={(e) => {
            if (validateTextInput({ data: e.target.value })) {
              setValue(e.target.value);
              onChange(e, labelFor);
            }
          }}
          onBlur={onBlur}
          autoComplete="off"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error}
        />
      </InputGroup>
      {error && val && (
        <Flex gap={"0.5rem"}>
          <BsExclamationTriangleFill color={'red'} />
          <Text
            className="errText"
            variant={"error"}
            aria-live="assertive"
            display={"flex"}
            flexDirection={"row"}
            tabIndex={0}
          >
            {error}
          </Text>
        </Flex>
      )}
    </Stack>
  );
});

export default IconInput


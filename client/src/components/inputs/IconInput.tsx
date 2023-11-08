import { InputGroup, InputLeftElement, Input, FormLabel, Stack } from "@chakra-ui/react";

import { ReactNode } from "react";

interface IconInputProps {
  icon: ReactNode;
  labelText: string;
  labelFor: string;
  inputPlaceholder: string;
  inputType: string;
  ref?: React.MutableRefObject<null>;
}

const IconInput = ({icon, labelText, labelFor, inputPlaceholder, inputType, ref}: IconInputProps) => {
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
          />
        </InputGroup>
      </Stack>
    );
}

export default IconInput


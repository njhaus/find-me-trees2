import React, { ReactNode } from 'react'

import { CloseButton, Flex, Box } from '@chakra-ui/react';

interface FilterInfoProps {
  children: ReactNode[];

}

const FilterInfo = ({ children }: FilterInfoProps) => {
  return <Flex justify={"space-between"}>
          {children}
        </Flex>;
}

export default FilterInfo

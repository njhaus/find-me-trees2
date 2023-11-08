import React, { ReactNode } from 'react'

import { CloseButton, Flex, Box } from '@chakra-ui/react';

interface FilterinfoProps {
  children: ReactNode[];

}

const FilterInfo = ({ children }: FilterinfoProps) => {
  return (
    <Flex justify={'space-between'}>
      {children}
    </Flex>
  );
}

export default FilterInfo

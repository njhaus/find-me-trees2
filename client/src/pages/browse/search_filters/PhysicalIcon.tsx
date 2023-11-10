import { Flex } from '@chakra-ui/react';

import { ReactNode } from 'react'

interface PhysicalIconProps {
  id: number;
  icon: ReactNode;
  color: string;
  onClick: (id: number) => void;
  currentFilter: number
}

const PhysicalIcon = ({id, icon, color, onClick, currentFilter}: PhysicalIconProps) => {
  return (
    <Flex justify={'center'} align={'center'} width={'3rem'} height={ '3rem'} borderRadius={'50%'} cursor={'pointer'} border={`2px solid ${color}`} onClick={(() => onClick(id))}>
      {icon}
    </Flex>
  );
}

export default PhysicalIcon

import { Flex, Box, Text } from '@chakra-ui/react';

import { ReactNode } from 'react'

interface PhysicalIconProps {
  id: number;
  title: string;
  icon: ReactNode;
  color: string;
  onClick: (id: number) => void;
  currentFilter: number
}

const PhysicalIcon = ({id, title, icon, color, onClick}: PhysicalIconProps) => {
  return (
    <Flex
      justify={"center"}
      align={"center"}
      width={"3rem"}
      height={"3rem"}
      borderRadius={"50%"}
      cursor={"pointer"}
      border={`2px solid ${color}`}
      onClick={() => onClick(id)}
    >
      <Box className={"filter-icon"}>
        <Text className={"filter-text"}>{ title }</Text>
        {icon}
      </Box>
    </Flex>
  );
}

export default PhysicalIcon

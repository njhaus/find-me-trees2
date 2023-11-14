import { Flex, Text, Box } from "@chakra-ui/react"
import { BsPerson } from "react-icons/bs";

interface iUserheading {
    userName: string;
}

const UserHeading = ({userName}: iUserheading) => {
  return (
    <Flex
      direction={"row"}
      width={"100%"}
      padding={"1rem"}
      justify={"space-between"}
    >
      <Text>{userName}'s Trees</Text>
          <Flex
              justify={'center'}
              align={'center'}
        width={"2.5rem"}
        height={"2.5rem"}
        border={"1px solid black"}
              borderRadius={"50%"}
              fontSize={'2rem'}
      >
        <BsPerson />
      </Flex>
    </Flex>
  );
}

export default UserHeading

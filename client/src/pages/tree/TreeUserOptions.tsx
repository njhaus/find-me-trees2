import { Box, Flex, Text } from "@chakra-ui/react"


import UserOption from "./user_options/UserOption";
import { userOptionsKey } from "../../data/user_options_data";
import { options } from "../../data/user_options_data";

interface iTreeUserOptions {
  id: string;
}

const TreeUserOptions = ({ id }: iTreeUserOptions) => {

  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      alignItems={"start"}
      gap={"2rem"}
      height={"5rem"}
      paddingX={"1rem"}
      
    >
      {options.map((op, i) => (
        <Box key={i} width={"10rem"} minWidth={"5rem"} position={"relative"}>
          <UserOption
            text={op.text}
            successText={op.successText}
            color={op.color}
            icon={op.icon}
            id={id}
            userDataKey={op.userDataKey as userOptionsKey}
            dataFormat={op.dataFormat}
            hoverMsg={op.hoverMsg}
          />
        </Box>
      ))}
    </Flex>
  );
}

export default TreeUserOptions

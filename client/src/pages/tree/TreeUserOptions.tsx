import { Box, Flex } from "@chakra-ui/react";

import { options, userOptionsKey } from "../user/user_data/user_options_data";
import UserOption from "./user_options/UserOption";

interface iTreeUserOptions {
  id: string;
}

const TreeUserOptions = ({ id }: iTreeUserOptions) => {
  return (
    <Flex
      direction={{ base: "row", md: "column", lg: "row" }}
      alignItems={{ base: "start", md: "end", lg: "start" }}
      gap={{ base: "2rem", md: "0.5rem", lg: "2rem" }}
      height={"5rem"}
      paddingX={"1rem"}
      maxWidth={"25rem"}
      mx={{ base: "auto", md: 0 }}
      marginLeft={{ md: "auto" }}
      marginTop={{ base: "2rem", md: "-1rem", lg: 0 }}
      // overflowX={'hidden'}
      overflowY={'visible'}
    >
      {options.map((op, i) => (
        <Box key={i} width={"10rem"} position={"relative"}>
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
};

export default TreeUserOptions;

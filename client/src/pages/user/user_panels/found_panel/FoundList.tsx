import { Flex, Text } from "@chakra-ui/react";

import { iUserFound } from "../../user_data/userData";
import FoundCard from "./FoundCard";

interface iFoundList {
  data: iUserFound[];
}

const FoundList = ({ data }: iFoundList) => {
  return (
    <Flex
      width={{ base: "100%", lg: "40rem" }}
      padding={"1rem"}
      direction={"row"}
      maxHeight={"100vh"}
      overflowY={"scroll"}
      gap={"1rem"}
      flexWrap={"wrap"}
      justifyContent={"center"}
      pb={"3rem"}
    >
      {data?.length > 0 ? (
        data.map((tree, i) => (
          <FoundCard
            key={i}
            id={tree._id._id}
            title={tree._id.title}
            imgSrc={tree._id.imgSrc}
            sciName={tree._id.sciName}
            locationFound={tree.location}
          />
        ))
      ) : (
        <Text>You have not found any trees yet.</Text>
      )}
    </Flex>
  );
};

export default FoundList;

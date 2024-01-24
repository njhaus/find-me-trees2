import { useEffect, useState } from "react";

import {
  Box,
  Flex,
  Skeleton,
  Spinner,
  Stack
} from "@chakra-ui/react";

import { useParams } from "react-router-dom";

import { apiGet } from "../../services/api_client";
import TreeHeading from "./TreeHeading";
import TreeImgs from "./TreeImgs";
import TreeIntro from "./TreeIntro";
import TreeLocation from "./TreeLocation";
import TreeSciInfo from "./TreeSciInfo";
import TreeSimilar from "./TreeSimilar";
import TreeTraitsSection from "./TreeTraitsSection";

import "./styles/tree.css";

// tempTreeData -- REPLACE
import CurveBorder from "../../components/borders/CurveBorder";
import TreeAdaptation from "./TreeAdaptation";
import TreeImgMobile from "./TreeImgMobile";
import TreeUses from "./TreeUses";
import { tempTreeData } from "./data/tree_data";

const Tree = () => {
  const [treeData, setTreeData] = useState(tempTreeData);
  // Loading indicator while trees are being fetched
  const [loading, setLoading] = useState(true);
  // Id for tree is sent by params
  const { id } = useParams();
  // Need to extract images so I can get them from user Data when loaded (it loads after page) -- see useEffect below
  // let imgs = [...treeData.imgSrc];

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      apiGet(`tree/${id}`, abortController)
        .then((res) => {
          if (res.code) {
            console.log(res.code);
          } else {
            console.log("good response");
            console.log(res);
            setTreeData(res);
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    };
    fetchData();

    return () => {
      abortController.abort(); // Abort the request if the component unmounts
    };
  }, [id]);

  if (loading) {
    return (
      <Stack>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  }

  return (
    <Flex as={"main"} direction={"column"} bg={"white"} width={"100%"}>
      <TreeHeading
        title={treeData.title}
        sciName={treeData.sciName}
        id={treeData._id}
      />
      <Box as={"main"} bg={"secondary.100"} color={"white"} width={"100%"}>
        <CurveBorder color={"secondary.100"} />
        <Flex
          as={"section"}
          position={"relative"}
          direction={"row"}
          justifyContent={"space-evenly"}
          alignItems={"stretch"}
          p={"1rem"}
          flexWrap={{ base: "wrap", md: "nowrap" }}
        >
          <TreeImgs imgSrc={treeData.imgSrc} />
          <TreeIntro text={treeData.intro} title={treeData.title} />
          <TreeImgMobile imgSrc={treeData.imgSrc} />
          <TreeSciInfo sciInfo={treeData.sciInfo} />
        </Flex>
        <Flex
          as={"section"}
          direction={"row"}
          justifyContent={"space-around"}
          flexWrap={"wrap"}
          pb={"3rem"}
        >
          <TreeTraitsSection  traits={treeData.traits} />
          <TreeLocation
            location={treeData.traits.location}
          />
          <TreeUses uses={treeData.uses} />
          <TreeAdaptation />
        </Flex>
        <TreeSimilar id={treeData._id} />
      </Box>
    </Flex>
  );
};

export default Tree;

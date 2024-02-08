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
import { tempTreeData, iTreeData, isTreeData } from "./data/tree_data";
import BrowseRedirect from "./BrowseRedirect";
import { ApiErrorType, isApiErrorType } from "../../data/types";
import useServerError from "../../hooks/useServerError";

const Tree = () => {
  const [treeData, setTreeData] = useState(tempTreeData);
  // Loading indicator while trees are being fetched
  const [loading, setLoading] = useState(true);
  // Error finding trees if no tree found with id
  const [notFound, setNotFound] = useState(false);

  const {setServerError} = useServerError();

  // Id for tree is sent by params
  const { id } = useParams();
  // Need to extract images so I can get them from user Data when loaded (it loads after page) -- see useEffect below
  // let imgs = [...treeData.imgSrc];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data: Awaited<iTreeData | ApiErrorType> = await apiGet(`tree/${id}`, abortController);
        if (isTreeData(data)) {
             console.log("good response");
             console.log(data);
             setTreeData(data as iTreeData);
        } 
        else {
           if (abortController.signal.aborted) {
             console.log("Request aborted");
             return;
           }
          else if (isApiErrorType(data)) {
            console.log((data as ApiErrorType).error);
            throw new Error((data as ApiErrorType).error);
          } else {
            throw new Error("Unknown Error: Unable to find tree data.")
          }   
        }

      } catch (err) {
        console.log(err);
        setServerError(
          typeof err === "string"
            ? err
            : (err as Error).message
            ? (err as Error).message
            : "An unknown error occurred"
        );
        if (isMounted) setNotFound(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();

    return () => {
      isMounted = false;
      abortController.abort(); // Abort the request if the component unmounts
      setNotFound(false)
      setLoading(true)
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

  if (notFound) {
    return <BrowseRedirect/>
  }


  return (
    <Flex as={"main"} direction={"column"} bg={"white"} width={"100%"} overflowX={'hidden'}>
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
          <TreeTraitsSection traits={treeData.traits} />
          {!treeData.traits.location.includes('TE') && <TreeLocation location={treeData.traits.location} />}
          <TreeUses uses={treeData.uses} />
          <TreeAdaptation />
        </Flex>
        <TreeSimilar id={treeData._id} />
      </Box>
    </Flex>
  );
};

export default Tree;

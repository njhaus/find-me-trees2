import { Flex, Heading, Image, Box } from "@chakra-ui/react";

import { useParams } from "react-router-dom";

import TreeIntro from "./TreeIntro";
import TreeUserOptions from "./TreeUserOptions";
import TreeTraits from "./TreeTraits";
import TreeLocation from "./TreeLocation";
import { allFilters } from "../../data/browse_data/filterFormData";

// tempTreeData -- REPLACE
import { iTreeData, iTreeTraitsData, tempTreeData } from "../../data/tree_data";
import Carousel from "../../components/ui-components/Carousel";
import { useEffect, useState } from "react";
import { apiGet } from "../../services/api_client";
import useUpdateUser from "../../hooks/useUpdateUser";
import useAuth from "../../hooks/useAuth";


const Tree = () => {

  const [treeData, setTreeData] = useState(tempTreeData);
  // Id for tree is sent by params
  const { id } = useParams();
  // Need to extract images so I can get them from user Data when loaded (it loads after page) -- see useEffect below
  let imgs = [...treeData.imgSrc]
  
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
          }
        })
        .catch((err) => console.log("error fetching tree data"));
    }
    fetchData();

    return () => {
      abortController.abort(); // Abort the request if the component unmounts
    };

  }, [])

  return (
    <Flex as={"section"} direction={"column"}>
      <Heading textAlign={"center"}>{treeData.title}</Heading>
      <Flex direction={"row"} flexWrap={"wrap"} gap={"1rem"}>
        <Box
          as={"article"}
          width={{ base: "100%", md: "40%" }}
          maxHeight={{ base: "100vh", md: "80vh" }}
        >
          <Image src={treeData.imgSrc[0]}></Image>
          {/* <Carousel imgs={imgs} /> */}
        </Box>
        <Box
          as={"article"}
          maxWidth={{ base: "100%", md: "calc(60% - 1rem)" }}
          flexGrow={"1"}
          maxHeight={{ base: "100vh", md: "80vh" }}
          overflowX={"scroll"}
          bg={"red.200"}
        >
          <TreeIntro text={treeData.intro} />
        </Box>
      </Flex>
      <Box as={"article"} width={"100%"} bg={"purple.200"}>
        <TreeUserOptions id={treeData._id} />
      </Box>
      <Flex direction={"row"} flexWrap={"wrap"} gap={"1rem"}>
        <Flex
          as={"article"}
          maxWidth={{ base: "100%", md: "calc(50% - 1rem)" }}
          flexGrow={"1"}
          maxHeight={{ base: "100vh", md: "80vh" }}
          direction={"column"}
        >
          <Heading>{treeData.title} Traits</Heading>
          {allFilters.map(
            (f, i) =>
              treeData.traits[f.formName as keyof iTreeTraitsData] && (
                <TreeTraits
                  key={i}
                  trait={treeData.traits[f.formName as keyof iTreeTraitsData]}
                  label={f.label}
                  helperText={f.helperText}
                />
              )
          )}
        </Flex>
        <Box
          as={"article"}
          width={{ base: "100%", md: "50%" }}
          maxHeight={{ base: "100vh", md: "80vh" }}
          overflowX={"scroll"}
          bg={"yellow.200"}
        >
          {location ? (
            <TreeLocation location={treeData.location} title={treeData.title} />
          ) : (
            `No states listed where ${treeData.title} is found`
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Tree;

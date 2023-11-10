import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Text, Divider, ButtonGroup, Button, Heading } from "@chakra-ui/react";

import { useImg } from "../../../hooks/useImg";

interface TreeCardProps {
    title: string;
    imgSrc: string;
    sciName: string;
    searchTerms?: string[];

}

const TreeCard = ({ title, imgSrc, sciName, searchTerms }: TreeCardProps) => {
    
    const imageSource = useImg(imgSrc)

  return (
    <Card maxW="sm" w="100%" align={'center'}>
      <CardBody>
        <Heading size="md">{title}</Heading>
        <Image src={imageSource} alt={`Photo of ${title}`} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Text color="blue.600" fontSize="2xl">
            {sciName}
          </Text>
          <Text>
            Matches search terms {searchTerms && searchTerms.map((term, i) => `${term}`)}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            View {title}
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default TreeCard;

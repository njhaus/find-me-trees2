import { Box } from "@chakra-ui/react";

interface iBoundary {
    color: string;
    width: string;
}

const Boundary = ({ color, width}: iBoundary) => {
    return <Box w={width} bg={color} h={"2px"} m={'0.25rem'} ></Box>;
}

export default Boundary

import { Box } from "@chakra-ui/react";

interface iBoundary {
    color: string;
    width: string;
    height?: string;
}

const Boundary = ({ color, width, height }: iBoundary) => {
    
    const h = height ? height : '2px';

    return <Box w={width} bg={color} h={h} m={'0.25rem'} ></Box>;
}

export default Boundary

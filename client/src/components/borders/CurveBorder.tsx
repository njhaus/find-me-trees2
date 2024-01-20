import { Box } from "@chakra-ui/react";

interface iCurveBorder {
  color: string;
  direction?: 'reverse';
}

const CurveBorder = ({ color, direction }: iCurveBorder) => {
  
  const dir = direction === 'reverse' ? 'scaleX(-1)' : ''

  return <Box className="tree-border-mask" bg={color} transform={dir}></Box>;
}

export default CurveBorder

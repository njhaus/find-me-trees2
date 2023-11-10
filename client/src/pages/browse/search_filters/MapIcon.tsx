import { Box, Image } from '@chakra-ui/react'

interface MapIcon {
  id: number;
  onClick: (id: number) => void;
}

const MapIcon = ({id, onClick}: MapIcon) => {
  return (
    <Box
      width={"4rem"}
      height={"4rem"}
      onClick={() => onClick(id)}
      cursor={'pointer'}
    >
      <Image src={"../../../src/assets/map_icon.png"} />
    </Box>
  );
}

export default MapIcon

// <a href="https://www.freepik.com/icon/park_2373927#fromView=search&term=map+trees&page=1&position=21&track=ais">Icon by Smashicons</a>
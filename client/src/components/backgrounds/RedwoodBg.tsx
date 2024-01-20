import { Image } from "@chakra-ui/react";

const RedwoodBg = () => {
  return (
    <Image
      src={"redwood-bkg.jpeg"}
      position={"absolute"}
      top={0}
      left={0}
      width={"100%"}
      height={"100%"}
      objectFit={"cover"}
      objectPosition={"top"}
      filter={"brightness(50%)"}
    ></Image>
  );
}

export default RedwoodBg

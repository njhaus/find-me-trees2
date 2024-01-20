import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

interface iBackButton {
    to: string;
}

const BackButton = ({to}: iBackButton) => {
  return (
    <Link to={to}>
      <Button variant="outlineDark" display={{ base: "none", md: "block" }}>
        <ArrowBackIcon /> Back to guide
      </Button>
      <Button
        variant="icon"
        display={{ base: "block", md: "none" }}
        position={"absolute"}
        top={"1rem"}
        left={"1rem"}
      >
        <ArrowBackIcon />
      </Button>
    </Link>
  );
}

export default BackButton

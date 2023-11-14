import { Box } from "@chakra-ui/react"

import { iUserSaved } from "../../../../data/user_data/userData";
import { iTreeData } from "../../../../data/tree_data";

interface iFoundMap {
    data: iTreeData[];
    onClick: (form: null, location: string) => void;
}


const FoundMap = ({data, onClick}: iFoundMap) => {
  return (
      <Box>
          MAP GOES HERE
    </Box>
  )
}

export default FoundMap

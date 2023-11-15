import { Box } from "@chakra-ui/react"

import { iUserFound } from "../../../../data/user_data/userData";

interface iFoundMap {
  data: iUserFound[];
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

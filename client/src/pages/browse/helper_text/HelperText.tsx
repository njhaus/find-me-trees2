import { HStack, Image, VStack, Text , Box, Link} from '@chakra-ui/react'

import { Helper} from '../../../data/browse_data/filterFormData';
import { FaLink } from 'react-icons/fa';

interface iHelper {
  helper: Helper[],
  helperLink: string
}

const HelperText = ({ helper, helperLink }: iHelper) => {
  return (
    <>
      <HStack
        p={"1rem"}
        alignItems={"start"}
        width={"fit-content"}
        overflowX={"scroll"}
      >
        {helper.map((helper, i) => (
          <VStack key={i} width={"9rem"}>
            <Image
              src={helper.img}
              width={"8rem"}
              height={"8rem"}
              objectFit={"cover"}
            ></Image>
            <Box w={"100%"}>
              <Text whiteSpace={"normal"}>{helper.text}</Text>
            </Box>
          </VStack>
        ))}
      </HStack>
      {helperLink && <Link href={helperLink} target='_blank' display={'flex'} alignItems={'center'} gap={'0.25rem'}>Learn More <FaLink /></Link>}
    </>
  );
}

export default HelperText

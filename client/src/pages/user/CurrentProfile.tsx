import { Flex, Text} from "@chakra-ui/react"


interface iCurrentProfile {
  userName: string;
  email: string;
}

const CurrentProfile = ({userName, email}: iCurrentProfile) => {
  return (
    <Flex direction={'column'} gap={'1rem'}>
      <Text>Username: {userName}</Text>
      <Text>email: {email}</Text>
    </Flex>
  );
}

export default CurrentProfile

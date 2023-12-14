import { Flex, Text} from "@chakra-ui/react"


interface iCurrentProfile {
  username: string;
  email: string;
}

const CurrentProfile = ({username, email}: iCurrentProfile) => {
  return (
    <Flex direction={'column'} gap={'1rem'}>
      <Text>Username: {username}</Text>
      <Text>email: {email}</Text>
    </Flex>
  );
}

export default CurrentProfile

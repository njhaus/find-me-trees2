import { Button, Text, Tab } from '@chakra-ui/react'

interface iUserToggle {
    text: string;
    icon: JSX.Element;
}

const UserTab = ({text, icon}: iUserToggle) => {
  return (
      <Tab>
          {icon}
          <Text>{text}</Text> 
      </Tab>
  )
}

export default UserTab

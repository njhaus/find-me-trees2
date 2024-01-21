import { Button, Text, Tab } from '@chakra-ui/react'

interface iUserToggle {
    text: string;
    icon: JSX.Element;
    bg: string;
}

const UserTab = ({ text, icon, bg }: iUserToggle) => {

    const fontColor = parseInt(bg.split('.')[1]) > 400 ? 'black' : 'white';

  return (
    <Tab _selected={{ color: fontColor, bg: bg, fontWeight: 500 }}>
      {icon}
      <Text ms={'0.5rem'}>{text}</Text>
    </Tab>
  );
}

export default UserTab

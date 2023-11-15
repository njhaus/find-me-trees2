
import { Flex, Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { Bs123, BsFan, BsHeart, BsJournal, BsSave, BsSearch } from "react-icons/bs";

import UserTab from "./UserTab";
import UserHeading from "./UserHeading";
import { tempUserData } from "../../data/user_data/userData";

import SavedPanel from "./user_panels/SavedPanel";
import FoundPanel from "./user_panels/FoundPanel";
import FavoritesPanel from "./user_panels/FavoritesPanel";

const User = () => {

    interface iUserToggleData {
        text: string;
        icon: JSX.Element;
    }

    const userToggleData: iUserToggleData[] = [
      {
        text: "Trees I've saved",
        icon: <BsJournal />,
      },
      {
        text: "Trees I've found",
        icon: <BsSearch />,
      },
      {
        text: "My favorite Trees",
        icon: <BsHeart />,
      },
    ];

    const userData = tempUserData;

  return (
    <Flex as={"section"} direction={"column"}>
      <Flex>
        <UserHeading
          userName={userData.userName}
          email={userData.email}
        />
      </Flex>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          {userToggleData.map((data, i) => (
            <UserTab key={i} text={data.text} icon={data.icon} />
          ))}
        </TabList>
        <TabPanels>
          <SavedPanel
            data={userData.saved}
            collections={userData.collections}
          />
          <FoundPanel
            found={userData.found}
          />
          <FavoritesPanel
            favorites={userData.favorites}
          />
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

export default User

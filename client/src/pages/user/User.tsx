import { useEffect } from "react";

import { Flex, TabList, TabPanels, Tabs } from "@chakra-ui/react";
import { BsHeart, BsJournal, BsSearch } from "react-icons/bs";

import { useNavigate } from "react-router-dom";

import UserHeading from "./UserHeading";
import UserTab from "./UserTab";

import useAuth from "../../hooks/useAuth";

import useUpdateUser from "../../hooks/useUpdateUser";
import FavoritesPanel from "./user_panels/FavoritesPanel";
import FoundPanel from "./user_panels/FoundPanel";
import SavedPanel from "./user_panels/SavedPanel";


    interface iUserToggleData {
      text: string;
      icon: JSX.Element;
      bg: string;
    }


    const userToggleData: iUserToggleData[] = [
      {
        text: "Trees I've saved",
        icon: <BsJournal />,
        bg: "secondary.200",
      },
      {
        text: "Trees I've found",
        icon: <BsSearch />,
        bg: "main.900",
      },
      {
        text: "My favorite Trees",
        icon: <BsHeart />,
        bg: "secondary.200",
      },
    ];

const User = () => {

  const { auth } = useAuth();
  const { userData} = useUpdateUser();
  
  const navigate = useNavigate();
  const userExists =
    userData &&
    userData.username &&
    userData.email &&
    userData.collections &&
    userData.favorites &&
    userData.found &&
    userData.saved && 
    userData.accessToken   

  useEffect(() => {
    // Checking if user is not loggedIn
    if (
      !userExists
    ) {
      console.log('Valid user does not exist')
      navigate("/login", { state: { from: location, redirect: true } });
    }
  }, [auth, userExists, userData]);

  return (
    (userExists) && (
      <Flex as={"section"} direction={"column"} bg={'white'}>
          <UserHeading
            userData={userData}
          />
        <Tabs isFitted variant="enclosed" > 
          <TabList >
            {userToggleData.map((data, i) => (
              <UserTab
                key={i}
                text={data.text}
                icon={data.icon}
                bg={data.bg}
              />
            ))}
          </TabList>
          <TabPanels >
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
    )
  );  
}

export default User

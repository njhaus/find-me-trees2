
import { Flex, TabList, TabPanels, Tabs } from "@chakra-ui/react"
import { BsHeart, BsJournal, BsSearch } from "react-icons/bs";

import { Navigate, Location, useNavigate, redirect } from "react-router-dom";

import UserTab from "./UserTab";
import UserHeading from "./UserHeading";

import useAuth from "../../hooks/useAuth";

import SavedPanel from "./user_panels/SavedPanel";
import FoundPanel from "./user_panels/FoundPanel";
import FavoritesPanel from "./user_panels/FavoritesPanel";
import { useEffect } from "react";
import { apiIntercept } from "../../services/api_client";


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

const User = () => {

  const { auth } = useAuth();
  
  const navigate = useNavigate();
  const userExists = auth &&
    auth.username &&
    auth.email &&
    auth.collections &&
    auth.favorites &&
    auth.found &&
    auth.saved;

  useEffect(() => {
    // Checking if user is not loggedIn
    if (
      !userExists
    ) {
      console.log('yabba dabba doo')
      navigate("/login");
    }
  }, [auth, userExists]);
  
  return (
    (auth &&
    auth.username &&
    auth.email &&
    auth.collections &&
    auth.favorites &&
    auth.found &&
    auth.saved) && (
      <Flex as={"section"} direction={"column"}>
        <Flex>
          <UserHeading username={auth.username} email={auth.email} />
        </Flex>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            {userToggleData.map((data, i) => (
              <UserTab key={i} text={data.text} icon={data.icon} />
            ))}
          </TabList>
          <TabPanels>
            <SavedPanel data={auth.saved} collections={auth.collections} />
            <FoundPanel found={auth.found} />
            <FavoritesPanel favorites={auth.favorites} />
          </TabPanels>
        </Tabs>
      </Flex>
    )
  );  
}

export default User

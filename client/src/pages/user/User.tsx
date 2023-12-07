import { useState, useEffect } from "react";

import { Flex, TabList, TabPanels, Tabs } from "@chakra-ui/react"
import { BsHeart, BsJournal, BsSearch } from "react-icons/bs";

import { Navigate, Location, useNavigate, redirect } from "react-router-dom";

import UserTab from "./UserTab";
import UserHeading from "./UserHeading";

import useAuth from "../../hooks/useAuth";

import SavedPanel from "./user_panels/SavedPanel";
import FoundPanel from "./user_panels/FoundPanel";
import FavoritesPanel from "./user_panels/FavoritesPanel";
import { apiPatch } from "../../services/api_client";
import { iUserData } from "../../data/user_data/userData";
import useLogout from "../../hooks/useLogout";
import useUpdateUser from "../../hooks/useUpdateUser"


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

  const { auth, setAuth } = useAuth();
  const { userData, handleUpdateUser } = useUpdateUser();

  const logout = useLogout();
  
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
      <Flex as={"section"} direction={"column"}>
        <Flex>
          <UserHeading
            username={userData.username}
            email={userData.email}
          />
        </Flex>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            {userToggleData.map((data, i) => (
              <UserTab
                key={i}
                text={data.text}
                icon={data.icon} />
            ))}
          </TabList>
          <TabPanels>
            <SavedPanel
              data={userData.saved}
              collections={userData.collections}
              updateUser={handleUpdateUser}
            />
            {/* <FoundPanel
              found={userData.found}
            />
            <FavoritesPanel
              favorites={userData.favorites}
            /> */}
          </TabPanels>
        </Tabs>
      </Flex>
    )
  );  
}

export default User

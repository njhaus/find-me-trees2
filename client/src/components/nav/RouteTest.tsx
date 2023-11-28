import { Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useRefreshToken from '../../hooks/useRefreshToken'
import useAuth from "../../hooks/useAuth";

const RouteTest = () => {
  // const refresh = useRefreshToken();
  const { auth } = useAuth();

  // const testApi = async () => {
  //   try {
  //     console.log("click");
  //     const response = await fetch("http://localhost:3008/login/refresh", {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!response.ok) throw new Error("error retrieving data!");
  //     const responseText = await response.text();
  //     console.log(responseText);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // const handleRefreshClick = async () => {
  //   console.log('click');
  //   try {
  //     // Call the refresh token logic from useRefreshToken hook
  //     const newToken = await refresh();
  //     console.log(newToken);
  //     // You can perform additional actions after refreshing the token here
  //   } catch (error) {
  //     console.error("Error while refreshing token:", error);
  //     // Handle error if refresh token logic fails
  //   }
  // };

  return <Button onClick={() => {
    console.log('AUTH is currently:')
    console.log(auth)
  }
  }>Test backend</Button>;
};

export default RouteTest

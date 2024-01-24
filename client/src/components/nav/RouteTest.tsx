import { Button } from "@chakra-ui/react";

const RouteTest = () => {

  const testApi = async () => {
    try {
      console.log("click");
      const response = await fetch(
        "https://find-me-trees-server-production.up.railway.app/login/test",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("error retrieving data!");
      const responseText = await response.text();
      console.log(responseText);
    } catch (err) {
      console.log(err);
    }
  }

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
    testApi();
    // console.log('AUTH is currently:')
    // console.log(auth)
  }
  }>Test backend</Button>;
};

export default RouteTest

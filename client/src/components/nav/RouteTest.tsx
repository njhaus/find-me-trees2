import { Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const RouteTest = () => {

  const testApi = async () => {
    try {
      console.log("click");
      const response = await fetch("http://localhost:3008/login/refresh", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
            
      if (!response.ok) throw new Error("error retrieving data!");
      const responseText = await response.text();
      console.log(responseText);
    } catch (err) {
      console.log(err);
    }
  }
       

  return (
      <Button onClick={() => testApi()} >Test backend</Button>
  )
}

export default RouteTest

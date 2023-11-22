import { Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const RouteTest = () => {

    const [runTest, setRunTest] = useState(false)

    useEffect(() => {
      let isMounted = true;
      if (runTest) {
        const loginUserLocally = async () => {
          try {
            const response = await fetch("http://localhost:3008/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                test: 'test'
              }),
            });
            if (!isMounted) return;
            if (!response.ok) throw new Error("error retrieving data!");
            const responseText = await response.text();
            console.log(responseText);
          } catch (err) {
            console.log(err);
          } finally {
            if (isMounted) {
              setRunTest(false);
            }
          }
        };
        loginUserLocally();
      }
    }, [runTest]);

  return (
      <Button onClick={() => setRunTest(true)} >Test backend</Button>
  )
}

export default RouteTest

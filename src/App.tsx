import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import "./App.css";

import Container from "./components/Container";
import Hero from "./components/Hero";
import UserGrid from "./components/UserGrid";
import UserSearch from "./components/UserSearch";
import { useGetAllUser } from "./hooks/user";

function App() {
  const [_, setSearchQuery] = useState("");

  return (
    <Flex direction="column" spaceY="4">
      <Container>
        <Hero />
      </Container>
      <Container>
        <Flex w="full" direction="column" gap="5">
          <UserSearch onChange={setSearchQuery} />
          <UserGrid useQuery={useGetAllUser} />
        </Flex>
      </Container>
    </Flex>
  );
}

export default App;

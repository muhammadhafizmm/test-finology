import { Container, Flex } from "@chakra-ui/react";
import { useState } from "react";
import "./App.css";

import Hero from "./components/Hero";
import UserGrid from "./components/UserGrid";
import UserSearch from "./components/UserSearch";

function App() {
  const [_, setSearchQuery] = useState("");

  return (
    <Flex direction="column" spaceY="4" mb="10">
      <Container>
        <Hero />
      </Container>
      <Container>
        <Flex w="full" direction="column" gap="5">
          <UserSearch onChange={setSearchQuery} />
          <UserGrid />
        </Flex>
      </Container>
    </Flex>
  );
}

export default App;

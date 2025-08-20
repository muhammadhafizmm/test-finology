import { Flex } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import "./App.css";

import Container from "./components/Container";
import Hero from "./components/Hero";
import UserGrid from "./components/UserGrid";
import UserSearch from "./components/UserSearch";
import { FILTER_INITIAL_VALUE } from "./constant/user";
import { useGetAllUser } from "./hooks/user";
import { User, UserFilterValue } from "./types/User";

function App() {
  const [option, setOption] = useState<UserFilterValue>(FILTER_INITIAL_VALUE);

  const onSelectUser = useCallback(
    (data: User[]) => {
      const searchTerm = option?.search.toLowerCase() || "";
      const filterByCity = (user: User) =>
        option.cities.length ? option.cities.includes(user.address.city) : true;
      const filterByCompany = (user: User) =>
        option.companies.length
          ? option.companies.includes(user.company.name)
          : true;

      return data.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm) &&
          filterByCity(user) &&
          filterByCompany(user)
      );
    },
    [option]
  );

  const { data, loading, error, options, refetch } = useGetAllUser({
    onSelect: onSelectUser,
  });

  return (
    <Flex direction="column" spaceY="4">
      <Container>
        <Hero />
      </Container>
      <Container>
        <Flex w="full" direction="column" gap={{ base: 2, md: 4 }}>
          <UserSearch value={option} options={options} onChange={setOption} />
          <UserGrid
            data={data}
            loading={loading}
            error={error}
            refetch={refetch}
          />
        </Flex>
      </Container>
    </Flex>
  );
}

export default App;

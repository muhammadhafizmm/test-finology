import { Avatar, Button, Card, Flex, For, Stack, Text } from "@chakra-ui/react";
import { users } from "../constant/mocks";
import { createMapUrl } from "../utils/maps";
import { getUserInitial } from "../utils/user";

export default function UserGrid() {
  function onClickViewOnMaps(lat: string, lng: string) {
    const url = createMapUrl(lat, lng);
    location.href = url;
  }
  function onClickVisitWebsite(url: string) {
    location.href = url;
  }
  return (
    <Stack gap="5" direction="row" wrap="wrap" justify="center">
      <For each={users}>
        {(user) => {
          const { id, name, email, address, company, phone, website } = user;
          return (
            <Card.Root variant="outline" key={id}>
              <Card.Body gap="2">
                <Flex gap="3" align="center">
                  <Avatar.Root size="lg" shape="rounded">
                    <Avatar.Fallback>{getUserInitial(name)}</Avatar.Fallback>
                  </Avatar.Root>
                  <Flex direction="column">
                    <Text textAlign="md" fontWeight="semibold">
                      {name}
                    </Text>
                    <Text textStyle="sm">{email}</Text>
                  </Flex>
                </Flex>
                <UserInfo label="Company" value={company.name} />
                <UserInfo label="Phone" value={phone} />
                <UserInfo label="Username" value={website} />
                <Flex gap="2">
                  <Text textStyle="sm" color="gray.500">
                    Address
                  </Text>
                  <Text textStyle="sm">
                    {address.suite && `${address.suite}, `}
                    {address.street}
                    <br />
                    {address.city}, {address.zipcode}
                  </Text>
                </Flex>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="solid"
                  onClick={() =>
                    onClickViewOnMaps(address.geo.lat, address.geo.lng)
                  }
                >
                  📍 View on Maps
                </Button>
                <Button
                  variant="solid"
                  onClick={() => {
                    onClickVisitWebsite(`https://${website}`);
                  }}
                >
                  Visit Website
                </Button>
              </Card.Footer>
            </Card.Root>
          );
        }}
      </For>
    </Stack>
  );
}

type UserInfoProps = {
  label: string;
  value: string;
};
function UserInfo({ label, value }: UserInfoProps) {
  return (
    <Flex gap="2" align="center">
      <Text textStyle="sm" color="gray.500">
        {label}
      </Text>
      <Text textStyle="sm">{value}</Text>
    </Flex>
  );
}

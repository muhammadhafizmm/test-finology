import { Avatar, Button, Card, Flex, Skeleton, Text } from "@chakra-ui/react";
import { User } from "../types/User";
import { createMapUrl } from "../utils/maps";
import { getUserInitial } from "../utils/user";

type Props = {
  user: User;
};

export default function UserCard({ user }: Props) {
  function onClickViewOnMaps(lat: string, lng: string) {
    const url = createMapUrl(lat, lng);
    location.href = url;
  }
  function onClickVisitWebsite(url: string) {
    location.href = url;
  }
  const { name, email, address, company, phone, website } = user;
  return (
    <Card.Root variant="outline">
      <Card.Body gap="2">
        <Flex gap="3" align="center">
          <Avatar.Root size="lg" shape="rounded">
            <Avatar.Fallback>{getUserInitial(name)}</Avatar.Fallback>
          </Avatar.Root>
          <Flex direction="column">
            <Text textStyle="md" fontWeight="semibold">
              {name}
            </Text>
            <Text textStyle="sm">{email}</Text>
          </Flex>
        </Flex>
        <Info label="Company" value={company.name} />
        <Info label="Phone" value={phone} />
        <Info label="Username" value={website} />
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
          onClick={() => onClickViewOnMaps(address.geo.lat, address.geo.lng)}
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
}

UserCard.Skeleton = function UserCardSkeleton() {
  return (
    <Card.Root variant="outline">
      <Card.Body gap="2">
        <Flex gap="3" align="center">
          <Avatar.Root size="lg" shape="rounded" />
          <Flex direction="column" gap={2}>
            <Skeleton width={130} height={6} />
            <Skeleton width={90} height={4} />
          </Flex>
        </Flex>
        <Info label="Company" loading />
        <Info label="Phone" loading />
        <Info label="Username" loading />
        <Flex gap="2">
          <Text textStyle="sm" color="gray.500">
            Address
          </Text>
          <Flex gap={2} direction={"column"}>
            <Flex gap={2}>
              <Skeleton width={20} height={5} />
              <Skeleton width={120} height={5} />
            </Flex>
            <Skeleton width={150} height={5} />
          </Flex>
        </Flex>
      </Card.Body>
      <Card.Footer>
        <Skeleton width={140} height={10} />
        <Skeleton width={140} height={10} />
      </Card.Footer>
    </Card.Root>
  );
};

type UserInfoSkeletonProps = {
  loading: true;
};

type UserInfoWithValueProps = {
  value: string;
};

type UserInfoProps = (UserInfoSkeletonProps | UserInfoWithValueProps) & {
  label: string;
};

function Info(props: UserInfoProps) {
  const { label } = props;
  return (
    <Flex gap="2" align="center">
      <Text textStyle="sm" color="gray.500">
        {label}
      </Text>
      {"loading" in props ? (
        <Skeleton width={120} height={5} />
      ) : (
        <Text textStyle="sm">{props.value}</Text>
      )}
    </Flex>
  );
}

import { Button, Flex, For, Stack, Text } from "@chakra-ui/react";

import { useGetAllUser } from "../hooks/user";
import { User } from "../types/User";
import UserCard from "./UserCard";

type Props = Omit<ReturnType<typeof useGetAllUser>, "options">;

export default function UserGrid({ data, loading, error, refetch }: Props) {
  if (loading) return <Loading />;
  if (error) {
    // Log the error to the console for debugging
    console.error("[UserGrid] Error fetching users:", error);
    return <Error onRetry={refetch} />;
  }
  if (!data || data.length === 0) return <Empty />;

  return <Data users={data} />;
}

type DataProps = {
  users: User[];
};
function Data({ users }: DataProps) {
  return (
    <Stack gap="5" mb="5" direction="row" wrap="wrap" justify="center">
      <For each={users}>{(user) => <UserCard user={user} key={user.id} />}</For>
    </Stack>
  );
}

function Empty() {
  return (
    <Flex flex={1} justify="center" align="center">
      <Flex direction="column" align="center" marginBottom={12} gap={2}>
        <Text fontWeight="medium">No users found</Text>
        <Text color="fg.muted">Try adjusting your filters.</Text>
      </Flex>
    </Flex>
  );
}

function Loading() {
  return (
    <Stack gap="5" direction="row" wrap="wrap" justify="center">
      <For each={[...Array(3).keys()]}>
        {(idx) => <UserCard.Skeleton key={idx} />}
      </For>
    </Stack>
  );
}

type ErrorProps = {
  onRetry: () => void;
};
function Error({ onRetry }: ErrorProps) {
  return (
    <Flex flex={1} justify="center" align="center">
      <Flex direction="column" align="center" marginBottom={12} gap={2}>
        <Text fontWeight="medium">
          Sorry, we unable to fetch user data. Please try again
        </Text>
        <Button variant="solid" onClick={onRetry}>
          Try again
        </Button>
      </Flex>
    </Flex>
  );
}

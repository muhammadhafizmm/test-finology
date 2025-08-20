import { Flex, Text } from "@chakra-ui/react";

export default function Hero() {
  return (
    <Flex w="full" justify="center" align="center">
      <Text
        textStyle={{ base: "2xl", md: "3xl", lg: "5xl" }}
        fontWeight="semibold"
      >
        Finology - M Hafiz Maulana
      </Text>
    </Flex>
  );
}

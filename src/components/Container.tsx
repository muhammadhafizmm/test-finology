import { Container as ChakraContainer } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren) {
  return (
    <ChakraContainer display="flex" minH={{ base: "500px", md: "vh" }}>
      {children}
    </ChakraContainer>
  );
}

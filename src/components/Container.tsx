import { Container as ChakraContainer } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren) {
  return (
    <ChakraContainer display="flex" minH="vh">
      {children}
    </ChakraContainer>
  );
}

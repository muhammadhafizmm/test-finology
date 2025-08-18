import {
  Box,
  CloseButton,
  Flex,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import { FaMagnifyingGlass } from "react-icons/fa6";

type Props = {
  onChange?: (value: string) => void;
};

export default function UserSearch({ onChange }: Props) {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 250);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    onChange?.(debounced);
  }, [debounced]);

  const endElement = query && (
    <CloseButton
      size="xs"
      onClick={() => {
        setQuery("");
        inputRef.current?.focus();
      }}
      me="-2"
    />
  );

  return (
    <Flex
      top={0}
      py="3"
      gap="5"
      w="full"
      zIndex={10}
      align="center"
      position="sticky"
      background="bg"
      justify="space-between"
    >
      <Text
        textStyle={{ base: "2xl", md: "3xl", lg: "5xl" }}
        fontWeight="semibold"
      >
        User
      </Text>
      <Box w={{ base: "350", md: "xl" }}>
        <InputGroup
          startElement={<FaMagnifyingGlass />}
          endElement={endElement}
        >
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search...."
          />
        </InputGroup>
      </Box>
    </Flex>
  );
}

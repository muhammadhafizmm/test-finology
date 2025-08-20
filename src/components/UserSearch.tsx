import {
  Badge,
  Box,
  CloseButton,
  Flex,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { LuX } from "react-icons/lu";
import { useGetAllUser } from "../hooks/user";
import { UserFilterValue } from "../types/User";
import SelectOptionCheckbox from "./SelectOptionCheckbox";

type Props = Pick<ReturnType<typeof useGetAllUser>, "options"> & {
  value: UserFilterValue;
  onChange: Dispatch<SetStateAction<UserFilterValue>>;
};

export default function UserSearch({ value, options, onChange }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange((prev) => ({ ...prev, search: query }));
    }, 250);
    return () => clearTimeout(timer);
  }, [query, onChange]);

  const handleClearQuery = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const handleClearAll = () => {
    setQuery("");
    onChange({ cities: [], companies: [], search: "" });
  };

  const renderBadges = () => {
    const badges = [];

    if (value.cities.length > 0) {
      badges.push(
        <Badge key="cities">
          Cities: {value.cities.join(", ")}{" "}
          <Box
            cursor="pointer"
            onClick={() => onChange((prev) => ({ ...prev, cities: [] }))}
          >
            <LuX />
          </Box>
        </Badge>
      );
    }

    if (value.companies.length > 0) {
      badges.push(
        <Badge key="companies">
          Companies: {value.companies.join(", ")}{" "}
          <Box
            cursor="pointer"
            onClick={() => onChange((prev) => ({ ...prev, companies: [] }))}
          >
            <LuX />
          </Box>
        </Badge>
      );
    }

    if (badges.length > 0) {
      badges.push(
        <Badge key="clear-all" cursor="pointer" onClick={handleClearAll}>
          Clear All <LuX />
        </Badge>
      );
    }

    return (
      <Flex gap={2} wrap="wrap">
        {badges}
      </Flex>
    );
  };

  return (
    <Fragment>
      <Flex
        top={0}
        py={3}
        zIndex={10}
        align="center"
        background="bg"
        position="sticky"
        direction="column"
      >
        <Flex w="full" justify="space-between">
          <Text
            textStyle={{ base: "2xl", md: "3xl", lg: "5xl" }}
            fontWeight="semibold"
          >
            User
          </Text>
          <Flex w={{ base: "350", md: "xl" }} gap={2}>
            <InputGroup
              startElement={<FaMagnifyingGlass />}
              endElement={
                query && (
                  <CloseButton size="xs" onClick={handleClearQuery} me="-2" />
                )
              }
            >
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search...."
              />
            </InputGroup>
          </Flex>
        </Flex>
      </Flex>
      <Flex w="full" gap={3} align="flex-end" direction="column">
        <Flex gap={4} justify="center" align="center">
          <Text textStyle="sm">Filter</Text>
          <SelectOptionCheckbox
            label="City"
            value={value.cities}
            options={options.cities}
            onValueChange={(cities) =>
              onChange((prev) => ({ ...prev, cities }))
            }
          />
          <SelectOptionCheckbox
            label="Company"
            value={value.companies}
            options={options.companies}
            onValueChange={(companies) =>
              onChange((prev) => ({ ...prev, companies }))
            }
          />
        </Flex>
        {renderBadges()}
      </Flex>
    </Fragment>
  );
}

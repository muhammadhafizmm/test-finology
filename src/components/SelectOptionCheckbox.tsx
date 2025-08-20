import {
  Flex,
  Menu,
  Portal,
  Text,
  useCheckboxGroup,
  UseCheckboxGroupProps,
} from "@chakra-ui/react";
import { CgChevronDown } from "react-icons/cg";

type Props = UseCheckboxGroupProps & {
  label: string;
  options: { label: string; value: string }[];
};

export default function SelectOptionCheckbox({
  label,
  options,
  ...rest
}: Props) {
  const checkbox = useCheckboxGroup(rest);
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Flex gap={1} justify="center" align="center" cursor="pointer">
          <Text textStyle="sm" fontWeight="semibold">
            {label}
          </Text>
          <CgChevronDown size={18} />
        </Flex>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {options.map(({ label, value }) => (
              <Menu.CheckboxItem
                key={value}
                value={value}
                checked={checkbox.isChecked(value)}
                onCheckedChange={() => checkbox.toggleValue(value)}
              >
                {label}
                <Menu.ItemIndicator />
              </Menu.CheckboxItem>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

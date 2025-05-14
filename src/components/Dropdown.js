import { Portal, Select } from "@chakra-ui/react";
import { useState } from "react";

const Dropdown = ({ list }) => {
  const [value, setValue] = useState(list.items[0].value);

  return (
    <Select.Root
      collection={list}
      size="sm"
      width="100px"
      value={value}
      onValueChange={(e) => setValue(e.value)}
    >
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={list.items[0].label} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {list.items.map((framework) => (
              <Select.Item item={framework} key={framework.value}>
                {framework.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default Dropdown;

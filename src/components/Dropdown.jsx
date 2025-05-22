import { Portal, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const Dropdown = ({
  list,
  onChange,
  defaultValue /* 문자열 ex: "popularity" */,
}) => {
  // 내부 value 상태는 Chakra Select가 기대하는 배열 형태로 유지 (예: ["popularity"])
  const [value, setValue] = useState(
    defaultValue ? [defaultValue] : [list.items[0]?.value]
  );

  // defaultValue (문자열) prop이 외부에서 변경되면, 내부 value 상태 (배열)를 업데이트
  useEffect(() => {
    if (defaultValue !== undefined && defaultValue !== null) {
      setValue([defaultValue]);
    }
  }, [defaultValue]);

  // 사용자가 드롭다운에서 값을 변경했을 때 호출되는 함수
  const handleValueChange = (changedObjectFromSelect) => {
    // changedObjectFromSelect는 { value: ["새값"], items: [{...}] } 형태의 객체
    const newValueArray = changedObjectFromSelect.value; // 예: ["latest"]
    setValue(newValueArray); // 내부 상태는 배열로 업데이트

    if (onChange && newValueArray && newValueArray.length > 0) {
      onChange(newValueArray[0]); // 부모에게는 첫 번째 요소(문자열)를 전달
    }
  };

  // 현재 value 배열의 첫 번째 요소 (문자열)에 해당하는 label을 찾음
  const currentStringValue = value && value.length > 0 ? value[0] : undefined;
  const currentLabel = list.items.find(
    (item) => item.value === currentStringValue
  )?.label;

  return (
    <Select.Root
      collection={list}
      size="sm"
      width="100px"
      value={value} // 내부 배열 상태 value를 Select의 현재 값으로 바인딩
      onValueChange={handleValueChange} // 값 변경 시 handleValueChange 호출
    >
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText>
            {currentLabel ||
              list.items.find((item) => item.value === list.items[0]?.value)
                ?.label ||
              "선택"}
          </Select.ValueText>
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

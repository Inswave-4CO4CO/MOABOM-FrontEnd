import React, { useEffect } from "react";
import { Tabs } from "@chakra-ui/react";

const TabComponent = ({ list, onTabChange }) => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      [role="tab"][aria-selected="true"],
      [data-selected="true"],
      [data-state="active"],
      .chakra-tabs__tab--selected,
      .chakra-tabs__tab[aria-selected="true"],
      .chakra-tabs__tab[data-selected],
      button[role="tab"][data-selected="true"] {
        color: #FFA07A !important;
        border-color: #FFA07A !important;
      }
      
      .chakra-tabs__tab-indicator {
        background-color: #FFA07A !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleValueChange = (value) => {
    if (onTabChange) {
      onTabChange(value);
    }
  };

  return (
    <Tabs.Root
      variant="plain" // 반드시 line variant
      defaultValue={list[0]?.value}
      mb="20px" // chakra 스타일 prop 으로 margin-bottom           // palette 는 그대로
      onValueChange={handleValueChange}
    >
      <Tabs.List
        width="100%"
        display="flex"
        position="relative" // Indicator 용 positioning
      >
        {list.map((item, idx) => (
          <Tabs.Trigger
            key={idx}
            value={item.value}
            flex={`1 1 ${100 / list.length}%`}
            textAlign="center"
            display="flex"
            justifyContent="center"
            alignItems="center"
            // 선택된 탭 텍스트만 컬러 변경
            _hover={{ bg: "transparent" }}
            bg="transparent"
            style={{ "--selected-color": "#FFA07A" }}
          >
            {item.label}
          </Tabs.Trigger>
        ))}

        {/* ─── 여기가 실제 밑줄(Indicator) ─── */}
        <Tabs.Indicator
          position="absolute"
          bottom="0" // 밑줄을 아래에 고정
          height="2px"
          bg="#FFA07A" // 원하는 커스텀 컬러
          transition="transform 200ms ease"
        />
      </Tabs.List>
    </Tabs.Root>
  );
};

export default TabComponent;

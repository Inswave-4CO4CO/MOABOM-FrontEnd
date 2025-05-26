import { Stack, Table } from "@chakra-ui/react";

const PlanTable = ({ plans }) => {
  // OTT 이름별로 묶기
  const grouped = plans.reduce((acc, plan) => {
    if (!acc[plan.ottName]) acc[plan.ottName] = [];
    acc[plan.ottName].push(plan);
    return acc;
  }, {});

  return (
    <Stack gap="10">
      <Table.Root
        width="100%"
        border="1px solid #ddd"
        borderCollapse="collapse"
        fontSize="md"
      >
        <Table.Header>
          <Table.Row bg="#fbe4d5">
            <Table.ColumnHeader
              textAlign="center"
              color="#ff9266"
              fontWeight="bold"
              border="1px solid #ddd"
              py={3}
            >
              OTT
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              color="#ff9266"
              fontWeight="bold"
              border="1px solid #ddd"
              py={3}
            >
              요금제명
            </Table.ColumnHeader>
            <Table.ColumnHeader
              textAlign="center"
              color="#ff9266"
              fontWeight="bold"
              border="1px solid #ddd"
              py={3}
            >
              가격
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.entries(grouped).map(([ottName, planList]) =>
            planList.map((plan, index) => (
              <Table.Row key={`${ottName}-${plan.planName}-${index}`}>
                {index === 0 && (
                  <Table.Cell
                    rowSpan={planList.length}
                    textAlign="center"
                    fontWeight="bold"
                    border="1px solid #ddd"
                    verticalAlign="middle"
                    py={3}
                  >
                    {ottName}
                  </Table.Cell>
                )}
                <Table.Cell textAlign="center" border="1px solid #ddd" py={3}>
                  {plan.planName}
                </Table.Cell>
                <Table.Cell textAlign="center" border="1px solid #ddd" py={3}>
                  월 {plan.price.toLocaleString()}원
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
    </Stack>
  );
};

export default PlanTable;

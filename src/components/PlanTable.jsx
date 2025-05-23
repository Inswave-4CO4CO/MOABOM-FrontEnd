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
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>OTT</Table.ColumnHeader>
            <Table.ColumnHeader>요금제명</Table.ColumnHeader>
            <Table.ColumnHeader>가격</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.entries(grouped).map(([ottName, planList]) =>
            planList.map((plan, index) => (
              <Table.Row key={`${ottName}-${plan.planName}-${index}`}>
                {index === 0 && (
                  <Table.Cell rowSpan={planList.length}>{ottName}</Table.Cell>
                )}
                <Table.Cell>{plan.planName}</Table.Cell>
                <Table.Cell>{plan.price.toLocaleString()}원</Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
    </Stack>
  );
};

export default PlanTable;

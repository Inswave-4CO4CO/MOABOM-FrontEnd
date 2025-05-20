import { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import styled from "styled-components";
import { getMyGenreContents } from "../services/myPageService";

const Chart = () => {
  const [chartType, setChartType] = useState("pie");

  useEffect(() => {
    const fetchData = async () => {
      await getMyGenreContents().then((res) => console.log(res.data));
    };

    fetchData();
  }, []);

  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
    datasets: [
      {
        label: "수치",
        data: [20, 30, 15, 10, 25],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 206, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const data2 = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "예제 데이터",
        data: [10, 20, 15, 30, 25],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  return (
    <Container>
      <p className="title">나의 장르별 시청통계</p>

      <Select onChange={(e) => setChartType(e.target.value)} value={chartType}>
        <option value="pie">원형 차트</option>
        <option value="line">꺾은선 차트</option>
      </Select>

      {chartType === "pie" ? <Pie data={data} /> : <Line data={data2} />}
    </Container>
  );
};

export default Chart;

const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 20px;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .title {
    font-size: 22px;
    font-weight: bold;
  }
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

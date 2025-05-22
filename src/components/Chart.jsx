import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getMyGenreContents } from "../services/api/myPageService";
import {
  Chart as ChartJS,
  PieController,
  LineController,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  PieController,
  LineController,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const Chart = () => {
  const [chartType, setChartType] = useState("pie");
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    getMyGenreContents().then((response) => {
      setStats(response.data);
    });
  }, []);

  useEffect(() => {
    if (!chartRef.current || stats.length === 0) return;

    if (chartInstanceRef.current) {
      if (!chartRef.current || !stats || stats.length === 0) return;
    }

    const ctx = chartRef.current.getContext("2d");

    const pieChartData = {
      labels: stats.map((item) => item.genreName),
      datasets: [
        {
          label: "시청 수",
          data: stats.map((item) => item.count),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(201, 203, 207, 0.6)",
            "rgba(135, 206, 250, 0.6)",
            "rgba(0, 128, 128, 0.6)",
            "rgba(255, 20, 147, 0.6)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 206, 86)",
            "rgb(75, 192, 192)",
            "rgb(153, 102, 255)",
            "rgb(255, 159, 64)",
            "rgb(201, 203, 207)",
            "rgb(135, 206, 250)",
            "rgb(0, 128, 128)",
            "rgb(255, 20, 147)",
          ],
          borderWidth: 2,
        },
      ],
    };

    const lineChartData = {
      labels: stats.map((item) => item.genreName),
      datasets: [
        {
          label: "시청 수",
          data: stats.map((item) => item.count),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    };

    const dataToUse = chartType === "pie" ? pieChartData : lineChartData;

    chartInstanceRef.current = new ChartJS(ctx, {
      type: chartType,
      data: dataToUse,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              boxWidth: 20,
              padding: 15,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartType, stats]);

  return (
    <Container>
      <Header>
        <p className="title">나의 장르별 시청통계</p>
        <Select
          onChange={(e) => setChartType(e.target.value)}
          value={chartType}
          className="select"
        >
          <option value="pie">원형 차트</option>
          <option value="line">꺾은선 차트</option>
        </Select>
      </Header>
      <ChartWrapper>
        <canvas ref={chartRef} />
      </ChartWrapper>
    </Container>
  );
};

export default Chart;

const Container = styled.div`
  width: 90%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px;
  border: 1px solid #dcdcdc;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  border-radius: 20px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  .title {
    align-self: flex-start;
    font-size: 22px;
    font-weight: bold;
  }

  .select {
    align-self: flex-end;
  }
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

const ChartWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 500px;
  margin: 0 auto;
`;

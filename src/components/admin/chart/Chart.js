import React from "react";
import { useState, useEffect } from "react";
import BarChart from "../chart/Barchart";
import statisticApi from "../../../api/Chart";

function generateLabels() {
  let result = [];
  for (let i = 0; i < 31; ++i) {
    result.push(`N${i + 1}`);
  }
  return result;
}

function Chart() {
  const [dataChart, setDataChart] = useState({ thismonth: [], thistotal: [] });
  const [month, setMonth] = useState();

  useEffect(() => {
    let isSubScribe = true;
    const getStaMonthlyRevenue = async (month) => {
      try {
        const response = await statisticApi.getStaMonthlyRevenue(month);
        if (isSubScribe && response) {
          const { thismonth, thistotal } = response.data;
          setDataChart({ thismonth, thistotal });
        }
      } catch (error) {
        setDataChart({ thismonth: [], thistotal: [] });
      }
    };
    getStaMonthlyRevenue(month);
    return () => {
      isSubScribe = false;
    };
  }, [month]);

  const userData = {
    labels: generateLabels(),
    datasets: [
      {
        label: "vnd",
        data: dataChart.thismonth,
        backgroundColor: "#2EA62A",
        borderColor: "black",
        borderWidth: 2,
      },
      {
        label: "đơn",
        data: dataChart.thistotal,
        backgroundColor: "#4670FF",
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <input type='month' onChange={(e) => setMonth(e.target.value)} />
      <div style={{ width: 1000 }}>
        <BarChart chartData={userData} />
      </div>
    </div>
  );
}

export default Chart;

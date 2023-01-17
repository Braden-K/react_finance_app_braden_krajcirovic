import React, { useState, useEffect } from "react";
import moment from "moment";
import { db } from "../config/firebase";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import {
  getDocs,
  where,
  collection,
  getDoc,
  doc,
  query,
} from "firebase/firestore";

export const StockChart = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = query(
        collection(db, "stockChartData"),
        where("symbol", "==", props.symbol)
      );
      console.log(querySnapshot);

      const chartInfoArray = await getDocs(querySnapshot);
      if (chartInfoArray.docs[0] === undefined) {
        return;
      }
      console.log(chartInfoArray);
      const chartInfoId = chartInfoArray.docs[0].id;
      const chartInfoData = await getDoc(
        doc(db, "stockChartData", chartInfoId)
      );
      const chartInfo = chartInfoData?.data();
      const chartData = Object.keys(chartInfo.chartData).map((date) => {
        return {
          date: date,
          close: parseFloat(chartInfo.chartData[date]["4. close"]),
        };
      });
      setData(chartData.reverse());
    };

    fetchData();
  }, [props.symbol]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 50, right: 10, left: 10, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          tickFormatter={(tickItem) => moment(tickItem).format("MMM DD, YYYY")}
        />
        <YAxis dataKey="close" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="close"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="pv"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

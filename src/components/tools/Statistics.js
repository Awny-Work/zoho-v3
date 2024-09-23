import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Statistics = ({ Data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={Data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Bar
          yAxisId="left"
          dataKey="total"
          name="مجموع الاموال"
          fill="#8884d8"
        />
        <Bar
          yAxisId="right"
          dataKey="count"
          name="عدد الطلبات"
          fill="#82ca9d"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Statistics;

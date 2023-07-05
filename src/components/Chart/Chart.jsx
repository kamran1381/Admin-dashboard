import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  YAxis,
  Label,
  Tooltip
} from 'recharts';

import './Chart.css';

export default function Chart({ title, dataKey, grid }) {
  const [data, setData] = useState([]);
  const [primaryYAxisProp, setPrimaryYAxisProp] = useState('');
  const [secondaryYAxisProp, setSecondaryYAxisProp] = useState('');

  
  const fetchData = async () => {
    const response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=BAYX40V2VW505Z2R&datatype=csv');
    let primaryYAxisProperty = '';
    let secondaryYAxisProperty = '';
    const textData = await response.text();
    const parsedData = textData
      .split('\n')
      .slice(1)
      .map((row) => {
        const [date, open, high, low, close, volume] = row.split(',');
        return { name: date, [dataKey]: parseFloat(close), high: parseFloat(high) };
      })
      .filter((item) => new Date(item.name).getFullYear() <= 2010);
    setData(parsedData.reverse());
    setPrimaryYAxisProp(primaryYAxisProperty);
    setSecondaryYAxisProp(secondaryYAxisProperty);
  };

  useEffect(() => {
    fetchData();
    return () =>{
      setData({})
    }
  }, []);

  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <YAxis stroke="#5550bd" yAxisId="left">
            <Label value={`Close (${dataKey})`} position="insideLeft" angle={-90} offset={-40} />
          </YAxis>
          <YAxis stroke="green" yAxisId="right">
            <Label value="High" position="insideRight" angle={-90} offset={40} />
          </YAxis>
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" yAxisId="left" />
          <Line type="monotone" dataKey="high" stroke="green" yAxisId="right" />
          <Tooltip   formatter={(value, name) => [value, `${name} annually `]}/>
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="10" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


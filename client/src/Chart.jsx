import {
    AreaChart,
    Area,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  import { useEffect, useState } from 'react'
  import axios from 'axios'
  import styled from 'styled-components';
  
  const ChartContainer = styled.div`
    padding: 2rem;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 2rem;
  `;
  
  const Title = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: #343a40;
    margin-bottom: 1rem;
    text-align: center;
  `;
  
  const StyledAreaChart = styled(AreaChart)`
    .recharts-cartesian-axis-tick-value {
      font-size: 0.85rem;
      fill: #6c757d;
    }
  
    .recharts-tooltip-wrapper {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  `;
  
  const CustomTooltip = styled.div`
    background-color: white;
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 4px;
  `;
  
  const Chart = () => {
    const [data, setData] = useState(null);
    const [isFetch, setIsFetch] = useState(true);
  
    const fetchDataChart = async () => {
      await axios.get(`http://localhost:8080/portfolio/chart`, {
        withCredentials: true
      }).then(data => {
        console.log(data.data);
        setData(data.data)
        setIsFetch(false);
      }).catch(err => {
        console.log(err);
      })
    }
  
    useEffect(() => {
      fetchDataChart()
    }, [])
  
    const renderTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <CustomTooltip>
            <p>{`Date : ${label}`}</p>
            <p>{`Value : $${payload[0].value}`}</p>
          </CustomTooltip>
        );
      }
      return null;
    };
  
    return (
      <ChartContainer>
        <Title>Portfolio Chart</Title>
        {
          !isFetch && (
            <ResponsiveContainer width="100%" height={400}>
              <StyledAreaChart
                data={data}
                margin={{ top: 15, right: 20, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip content={renderTooltip} />
                <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="value" stroke="#ff7300" />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  fillOpacity={0.3}
                  fill="#8884d8"
                />
              </StyledAreaChart>
            </ResponsiveContainer>
          )
        }
      </ChartContainer>
    );
  };
  
  export default Chart;
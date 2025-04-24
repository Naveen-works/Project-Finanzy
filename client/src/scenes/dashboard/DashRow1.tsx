import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery } from '@/state/api';
import { useTheme } from '@mui/material';
import { useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  Legend,
  LineChart,
  YAxis,
  Tooltip,
  Area,
} from 'recharts';

const DashRow1 = () => {
  const { data } = useGetKpisQuery();
  const {palette} =useTheme();
  
  const revenueExpenses = useMemo(() => {
    if (!data) return [];

    return data[0].monthlyData.map(({ month, revenue, expenses }) => ({
      name: month.substring(0, 3),
      revenue,
      expenses,
    }));
  }, [data]);



  const revenue = useMemo(() => {
    if (!data) return [];

    return data[0].monthlyData.map(({ month, revenue}) => ({
      name: month.substring(0, 3),
      revenue,
    }));
  }, [data]);
  const revenueProfit = useMemo(() => {
    if (!data) return [];

    return data[0].monthlyData.map(({ month, revenue, expenses }) => ({
      name: month.substring(0, 3),
      revenue: revenue,
      profit: (revenue-expenses).toFixed(2),
    }));
  }, [data]);

  return (
    <>
      <DashboardBox gridArea="a">
      <BoxHeader 
        title="Revenue and expenses"
        subtitle="Top line represents revenue, Bottom line represents expenses"
        sideText="+4%"
        />
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={revenueExpenses}
          margin={{
            top: 15,
            right: 25,
            left: -10,
            bottom: 60,
          }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1 ="0" x2="0" y2 ="1">
               <stop offset ="5%" stopColor={palette.primary[300]} stopOpacity={0.5}/>
               <stop offset ="95%" stopColor={palette.primary[300]} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1 ="0" x2="0" y2 ="1">
               <stop offset ="5%" stopColor={palette.primary[300]} stopOpacity={0.5}/>
               <stop offset ="95%" stopColor={palette.primary[300]} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" tickLine={false} style={{fontSize:"10px"}} />
          <YAxis tickLine={false} style={{fontSize:"10px"}} axisLine={{strokeWidth:"0"}} domain={[8000,23000]}/>
          <Tooltip />
          <Area type="monotone" dot={true} dataKey="revenue" stroke={palette.primary.main} fillOpacity={1} fill="url(#colorRevenue)" />
          <Area type="monotone" dot={true}  dataKey="expenses" stroke={palette.primary.main} fillOpacity={1} fill="url(#colorExpenses)" />
        </AreaChart>
      </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="b">
  <BoxHeader 
    title="Profit and Revenue"
    subtitle="Top line represents revenue, Bottom line represents profit"
    sideText="+4%"
  />
  <ResponsiveContainer width="100%" height="100%">
    <LineChart
      data={revenueProfit}
      margin={{
        top: 20,
        right: 20,
        left: -10,
        bottom: 55,
      }}
    >
      <CartesianGrid vertical={false} stroke={palette.grey[800]} />
      
      <XAxis 
        dataKey="name" 
        tickLine={false} 
        style={{ fontSize: "10px" }} 
      />
      
      <YAxis 
        yAxisId="left" 
        tickLine={false} 
        axisLine={false} 
        style={{ fontSize: "10px" }} 
        domain={[0, 10000]} 
      />
      
      <YAxis 
        yAxisId="right" 
        orientation="right" 
        tickLine={false} 
        axisLine={false} 
        style={{ fontSize: "10px" }} 
        domain={[8000, 23000]} 
      />
      
      <Tooltip />
      <Legend 
        verticalAlign="bottom"
        align="center"
        height={30}
        wrapperStyle={{ marginTop: 10 }}
      />
      
      <Line 
        yAxisId="right" 
        type="monotone" 
        dataKey="revenue" 
        stroke={palette.primary.main} 
        dot={true} 
      />
      
      <Line 
        yAxisId="left" 
        type="monotone" 
        dataKey="profit" 
        stroke={palette.tertiary[500]} 
        dot={true} 
      />
    </LineChart>
  </ResponsiveContainer>
</DashboardBox>

      <DashboardBox gridArea="c">
      <BoxHeader 
    title="Revenue month by month"
    subtitle="Graph representing the revenue month by month"
    sideText="+4%"
  />
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={revenue}
          margin={{
            top: 17,
            right: 15,
            left: -5,
            bottom: 58,
          }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1 ="0" x2="0" y2 ="1">
               <stop offset ="5%" stopColor={palette.primary[300]} stopOpacity={0.8}/>
               <stop offset ="95%" stopColor={palette.primary[300]} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke={palette.grey[800]}/>
          <XAxis dataKey="name" axisLine={false} tickLine={false} style={{fontSize:"10px"}} />
          <YAxis axisLine={false} tickLine={false} style={{fontSize:"10px"}} />

          <Tooltip />
          
          <Bar dataKey="revenue" fill="url(#colorRevenue)" />
        </BarChart>
      </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default DashRow1;

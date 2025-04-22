import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery } from '@/state/api';
import { useTheme } from '@mui/material';
import { useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,

  XAxis,
  YAxis,
  Tooltip,
  Area,
} from 'recharts';

const DashRow1 = () => {
  const { data } = useGetKpisQuery();
  const {palette} =useTheme();
  console.groupCollapsed("Data :" , data);
  
  const revenueExpenses = useMemo(() => {
    if (!data || !data[0]) return [];

    return data[0].monthlyData.map(({ month, revenue, expenses }) => ({
      name: month.substring(0, 3),
      revenue,
      expenses,
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
      <DashboardBox gridArea="b"></DashboardBox>
      <DashboardBox gridArea="c"></DashboardBox>
    </>
  );
};

export default DashRow1;

import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import { useGetProductsQuery, useGetKpisQuery } from '@/state/api';
import { useTheme,Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  ScatterChart,
  Pie,
  Cell,
  Scatter,
  ZAxis,
} from 'recharts';

const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 }
];

const DashRow2 = () => {
  const { data: operationalData } = useGetKpisQuery();
  const { data:productData } = useGetProductsQuery();
  const { palette } = useTheme();
  const pieColor = [palette.primary[800], palette.primary[300]];

  const operationalExpenses = useMemo(() => {
    if (!operationalData) return [];

    return operationalData[0].monthlyData.map(
      ({ month, operationalExpenses, nonOperationalExpenses }) => ({
        name: month.substring(0, 3),
        "Operational Expense": operationalExpenses,
        "Non Operational Expense": nonOperationalExpenses,
      })
    );
  }, [operationalData]);

  const productExpenseData = useMemo(() => {
    if (!productData || !productData[0]) return [];

    return productData.map(
      ({ _id,price,expense }) => ({
        id:_id,
        price:price,
        expense:expense,

      })
    );
  }, [productData]);

  return (
    <>
      <DashboardBox gridArea="d">
      <BoxHeader title="Product Prices vs Expenses"  sideText="+4%"/>
      <ResponsiveContainer width="100%" height="100%">    
        <ScatterChart
          margin={{
            top: 20,
            right: 25,
            bottom: 40,
            left:-10,
          }}
        >
          <CartesianGrid stroke={palette.grey[800]} />
          <XAxis type="number" dataKey="price" name="price"  axisLine={false} tickLine={false} style={{fontSize : "10px"}}  tickFormatter={(v)=>`$${v}`}/>
          <YAxis type="number" dataKey="expense" name="expense"   axisLine={false} tickLine={false} style={{fontSize : "10px"}}  tickFormatter={(v)=>`$${v}`}/>
          <ZAxis type="number" range={[20]} />
          <Tooltip formatter={(v)=>`$${v}`} />
          <Scatter name="Product Expense Ratio" data={productExpenseData} fill={palette.tertiary[500]}/>
        </ScatterChart>
      </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="e">
        
        <BoxHeader
          title="Operational vs Non-Operational Expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={operationalExpenses}
            margin={{ top: 20, right: 20, left: -10, bottom: 55 }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
              domain={['auto', 'auto']}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
              domain={['auto', 'auto']}
            />
            <Tooltip />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Operational Expense"
              stroke={palette.primary.main}
              dot={true}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Non Operational Expense"
              stroke={palette.tertiary[500]}
              dot={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="f" >
      <BoxHeader title="Campaigns and Targets"  sideText="+4%"/>
        <FlexBetween ml="1.0rem" mt = "0.5rem"  gap="1.5rem" pr="0.5rem">
        <PieChart
          width={110}
          height={100}
          margin={{ top: 0, right: -10, left: 10, bottom: 0 }}
        >
          <Pie
            stroke="none"
            data={pieData}
            innerRadius={18}
            outerRadius={38}
            paddingAngle={2}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={pieColor[index]}
              />
            ))}
          </Pie>
        </PieChart>

        <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
        <Typography variant="h5">Target Sales</Typography>
       <Typography m="0.3rem 0" variant="h3" color={palette. primary [300]}>
         83
       </Typography>
       <Typography variant="h6">Finance goals of the campaign that is desired</Typography>
        </Box>
        <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
        <Typography variant="h5">Losses in revenue</Typography>
       <Typography  variant="h6" > Losses are down 25%</Typography>
       <Typography mt="0.4rem"variant="h5">Profit margins</Typography>
       <Typography variant="h5">Margins are upto 30% from the last month</Typography>
        </Box>
        </FlexBetween>
        </DashboardBox>
    </>
  );
};

export default DashRow2;

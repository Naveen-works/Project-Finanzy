import DashboardBox from '@/components/DashboardBox'
import { useGetTransactionsQuery,useGetProductsQuery,useGetKpisQuery } from '@/state/api';
import { Box, Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';
import BoxHeader from '@/components/BoxHeader';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { blue } from '@mui/material/colors';
import FlexBetween from '@/components/FlexBetween';
import { Cell, Pie, PieChart } from 'recharts';

    const DashRow3 = () => {
        const {data:kpiData} = useGetKpisQuery();
        const {palette}=useTheme();
        const {data:productData} = useGetProductsQuery();
        const {data: transactionData} =useGetTransactionsQuery();
        
        const productColumns=[{
            field:"_id",
            headerName:"id",
            flex:1,
        },
        {
            field:"expense",
            headerName:"Expense",
            flex:0.5,
            renderCell:(params:GridCellParams)=>`$${params.value}`,
        },
        {
            field:"price",
            headerName:"price",
            flex:0.5,
            renderCell:(params:GridCellParams)=>`$${params.value}`,
        }
    ]


      
    const transactionColumns=[{
        field:"_id",
        headerName:"id",
        flex:0.8,
    },
    {
        field:"buyer",
        headerName:"Buyer",
        flex:0.5,
    },
    {
        field:"amount",
        headerName:"Amount",
        flex:0.55,
        renderCell:(params:GridCellParams)=>`$${params.value}`,
    },
    {
        field:"productIds",
        headerName:"Count",
        flex:0.25,
        renderCell:(params:GridCellParams)=>(params.value as Array<string>).length,

    }
]
const pieColors=[palette.primary[800],palette.primary[500]]
const pieChartData= useMemo(()=>
{
    if(kpiData){
        const totalExpenses=kpiData[0].totalExpenses;
        return Object.entries(kpiData[0].expensesByCategory).map(
            ([key,value])=>{
                return[ {
                    name:key,
                    value:value,
                },
                {
                    name:`${key} of Total`,
                    value:totalExpenses-value
                }
            ]
            }
        )
    }
},[kpiData])
        return (
            <>
            <DashboardBox   gridArea="g">
            
            <BoxHeader
                title="Recent Orders"
                sideText={`${transactionData?.length} latest transactions`}
                />
                <Box mt="1rem" p="0 0.5rem" height="80%" sx={{"& .MuiDataGrid-root":{
                    color:palette.grey[300],
                    border:"none"
                },
                "& .MuiDataGrid-cell":{
                   borderTop:`1px solid ${palette.grey[800]} !important`
                },
               "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#48494e !important",
                borderBottom: `0.1px solid ${palette.grey[800]} !important`,
                },
                "& .MuiDataGrid-columnSeparator":{
                    visibility:"hidden",
                },
                }}>
                <DataGrid 
                rows={transactionData || []}
                columns={transactionColumns}
                columnHeaderHeight={25}
                rowHeight={35}
                hideFooter={true}
                

                />
                </Box>
            </DashboardBox>
            <DashboardBox   gridArea="h">
            <BoxHeader
                title="List of Products"
                sideText={`${productData?.length} products`}
                />
                <Box mt="0.5rem" p="0 0.5rem" height="75%" sx={{"& .MuiDataGrid-root":{
                    color:palette.grey[300],
                    border:"none"
                },
                "& .MuiDataGrid-cell":{
                   borderTop:`1px solid ${palette.grey[800]} !important`
                },
               "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#48494e !important",
                borderBottom: `0.1px solid ${palette.grey[800]} !important`,
                },
                "& .MuiDataGrid-columnSeparator":{
                    visibility:"hidden",
                },
                }}>
                <DataGrid 
                rows={productData || []}
                columns={productColumns}
                columnHeaderHeight={25}
                rowHeight={35}
                hideFooter={true}
                

                />
                </Box>
            </DashboardBox>
            <DashboardBox gridArea="i">
  <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
  <FlexBetween  gap="0.5rem" p="0 1rem" textAlign="center">
    {pieChartData?.slice(0, 3).map((data, i)  => (
      <Box key={`${data[0].name}-${i}`}>
        <PieChart width={110} height={80}>
          <Pie
            stroke="none"
            data={data}
            innerRadius={18}
            outerRadius={35}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={pieColors[index % pieColors.length]}
              />
            ))}
          </Pie>
        </PieChart>
        <Typography
          variant="h6"
          color="white"
          mt="0.25rem"
          sx={{
            fontSize: "0.75rem",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {data[0].name}
        </Typography>
      </Box>
    ))}
  </FlexBetween>
</DashboardBox>

            <DashboardBox   gridArea="j">
            <BoxHeader title="Overall summary and Explanation Data" sideText="+4%" />
            <Box
            height="15px"
            margin="1.25rem 1rem 0.4rem 1rem"
            bgcolor = {palette.primary[800]}
            borderRadius="1rem"
            >
                <Box
            height="15px"
           
            bgcolor = {palette.primary[600]}
            borderRadius="1rem"
            width="40%"
            >
            </Box>
            </Box>
            <Typography variant="h6" margin="0 1rem">
            Displays the latest transactions made by buyers, including the amount spent and the number of products purchased in each transaction.
            Shows a catalog of available products, their prices, and associated expenses to track profitability and cost management.
            </Typography>
            </DashboardBox>
            </>
        )
    }
    
    export default DashRow3
    

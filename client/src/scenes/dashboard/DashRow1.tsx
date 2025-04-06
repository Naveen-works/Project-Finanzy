import DashboardBox from '@/components/DashboardBox'
//import { useGetKpisQuery } from '@/state/api'

const DashRow1 = () => {
    //const {data} =useGetKpisQuery(); 
    return (
        <>
         <DashboardBox   gridArea="a"></DashboardBox>
        <DashboardBox   gridArea="b"></DashboardBox>
        <DashboardBox   gridArea="c"></DashboardBox>
        </>
    )
}

export default DashRow1

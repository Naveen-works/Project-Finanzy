import { Box, useMediaQuery} from '@mui/material';
import DashRow1 from './DashRow1';
import DashRow2 from './DashRow2';
import DashRow3 from './DashRow3';

const gridTemplateLargeScreens=`
    "a b c"
    "a b c"
    "a b c"
    "a b d"
    "e f d"
    "e f d"
    "e g i"
    "h g i"
    "h g j"
    "h g j"
`

const gridTemplateSmallScreens=`
    "a"
    "a"
    "a"
    "a"
    "b"
    "b"
    "b"
    "b"
    "c"
    "c"
    "c"
    "d"
    "d"
    "d"
    "e"
    "e"
    "e"
    "f"
    "f"
    "g"
    "g"
    "g"
    "g"
    "h"
    "h"
    "h"
    "i"
    "i"
    "j"
    "j"
`

const Dashboard= () => {
    
    const isAbove= useMediaQuery("(min-width:1200px)")
    return (
        <Box
        width="100%" 
        height="100%"
        gap="1.5rem"
        display="grid"
        sx={isAbove?{
            gridTemplateColumns:"repeat(3,minmax(370px,1fr))",
            gridTemplateRows: "repeat(10,minmax(60px,1fr))",
            gridTemplateAreas:gridTemplateLargeScreens
        }:
        {
            gridAutoColumns:"1fr",
            gridAutoRows: "80px",
            gridTemplateAreas:gridTemplateSmallScreens
        }}>
           <DashRow1/>
           <DashRow2/>
           <DashRow3/>
        </Box>
    )
}

export default Dashboard;

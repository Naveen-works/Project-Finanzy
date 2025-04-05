import { Box, useMediaQuery, useTheme } from '@mui/material';
import { minimalContentHeight } from '@mui/x-data-grid/hooks/features/rows/gridRowsUtils';
import React from 'react'

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
    const {palette} =useTheme();
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
            <Box bgcolor="#fff"  gridArea="a"></Box>
            <Box bgcolor="#fff"  gridArea="b"></Box>
            <Box bgcolor="#fff"  gridArea="c"></Box>
            <Box bgcolor="#fff"  gridArea="d"></Box>
            <Box bgcolor="#fff"  gridArea="e"></Box>
            <Box bgcolor="#fff"  gridArea="f"></Box>
            <Box bgcolor="#fff"  gridArea="g"></Box>
            <Box bgcolor="#fff"  gridArea="h"></Box>
            <Box bgcolor="#fff"  gridArea="i"></Box>
            <Box bgcolor="#fff"  gridArea="j"></Box>
        </Box>
    )
}

export default Dashboard;

import React from "react";
import { Typography, Grid, Box } from "@mui/material";
const OptionSelection = ({ value, onSelect }) => {
  return (
    <Box
      paddingX={2}
      paddingY={1}
      marginY={3}
      sx={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "grey.300",
        borderRadius: 4,
        width: "auto",
        color: "black",
        backgroundColor: "white",
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "primary.main",
          color: "white",
        },
      }}
      onClick={() => onSelect()}
    >
      <Grid container direction="row" alignItems={"center"}>
        <Grid item marginRight={1}>
          <Typography fontSize={16} fontWeight={"bold"}>
            {value}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OptionSelection;

import React from "react";
import { Box, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const OptionCreation = ({
  setOptionDescription,
  value,
  index,
  correct,
  deleteOption,
  makeCorrectOpt,
}) => {
  return (
    <Box
      sx={{
        width: "auto",
        marginTop: 2,
        color: "black",
        backgroundColor: "white",
        display: "flex",
      }}
    >
      <TextField
        fullWidth
        name="option"
        label={`Option ${index + 1}`}
        id="option"
        style={{ flex: 1 }}
        sx={{
          "&:hover": {
            cursor: "pointer",
            backgroundColor: "#f5f5f5",
            color: "white",
          },
        }}
        value={value}
        onChange={(val) => {
          setOptionDescription(val.target.value);
        }}
      />
      <Box
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={makeCorrectOpt}
        style={{
          display: "flex",
          marginLeft: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CheckCircleIcon style={{ color: correct ? "green" : "red" }} />
      </Box>
      <Box
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={deleteOption}
        style={{
          display: "flex",
          marginLeft: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DeleteIcon />
      </Box>
    </Box>
  );
};

export default OptionCreation;

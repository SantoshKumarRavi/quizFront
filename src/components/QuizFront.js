import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useStates } from "../State/State";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
const theme = createTheme();

export default function QuizFront() {
  const navigate = useNavigate();
  const {
    QuizName,
    SetQuizName,
    QuizDesc,
    SetQuizDesc,
    QuizGrade,
    SetQuizGrade,
    Timelimit,
    SetTimeLimit,
  } = useStates();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main", p: 4 }}>
            <ContentPasteIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Quiz
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Quiz Name"
              name="name"
              autoFocus
              value={QuizName}
              onChange={(val) => {
                SetQuizName(val.target.value);
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="description"
              label="Description"
              id="description"
              value={QuizDesc}
              onChange={(val) => {
                SetQuizDesc(val.target.value);
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="grading"
              label="Grade"
              id="grading"
              value={QuizGrade}
              onChange={(val) => {
                SetQuizGrade(val.target.value);
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="timeLimit"
              label="Time limit"
              id="timeLimit"
              value={Timelimit}
              onChange={(val) => {
                SetTimeLimit(val.target.value);
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => navigate("/Question")}
            >
              Next <NavigateNextIcon />
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mb: 2 }}
              onClick={() => navigate("/Quiz")}
            >
              Go To Quiz <NavigateNextIcon />
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

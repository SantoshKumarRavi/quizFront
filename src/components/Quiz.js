import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import HomeIcon from "@mui/icons-material/Home";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useStates } from "../State/State";
import {
  CardActions,
  Button,
  Grid,
  Box,
  TextField,
  Container,
} from "@mui/material";
import ScoreCard from "./ScoreCard";
import FeedbackIcon from "@mui/icons-material/Feedback";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
const theme = createTheme();

export default function QuizTest() {
  const navigate = useNavigate();
  const { createdQuiz, SetselectedQuizId } = useStates();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  return (
    <ThemeProvider theme={theme}>
      <CardActions>
        <Grid
          container
          justifyContent="flex-end"
          sx={{ marginRight: 8, marginTop: 1 }}
        >
          <Grid
            item
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ display: "flex" }}
          >
            <HomeIcon
              onClick={() => navigate("/")}
              sx={{ color: "primary.main", cursor: "pointer" }}
            />
            <Button onClick={() => navigate("/")} size="large">
              Home
            </Button>
          </Grid>
        </Grid>
      </CardActions>
      <Box sx={{ display: "flex", flexWrap: "wrap", rowGap: 10, padding: 5 }}>
        {createdQuiz?.map(
          ({ quiz_name, description, grades, time_limit, _id }, index) => (
            <Container
              key={index}
              style={{ backgroundColor: "white" }}
              component="main"
              maxWidth="xs"
            >
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
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
                    value={quiz_name}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="description"
                    label="Description"
                    id="description"
                    value={description}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="grading"
                    label="Grade"
                    id="grading"
                    value={grades}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="timeLimit"
                    label="Time limit"
                    id="timeLimit"
                    value={time_limit}
                    InputProps={{ readOnly: true }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mb: 2 }}
                    onClick={() => {
                      SetselectedQuizId(() => _id);
                      navigate("/StartQuiz");
                    }}
                  >
                    Start Quiz&nbsp;
                    <PlayCircleFilledIcon />
                  </Button>
                </Box>
              </Box>
            </Container>
          )
        )}
        {createdQuiz?.length === 0 && (
          <ScoreCard
            title="Empty Records"
            icon={
              <FeedbackIcon sx={{ width: 50, height: 50, color: "white" }} />
            }
          />
        )}
      </Box>
    </ThemeProvider>
  );
}

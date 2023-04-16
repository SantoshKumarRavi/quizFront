import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStates } from "../State/State";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Box,
  TextField,
} from "@mui/material";
import OptionCreate from "./Option.Create";
import { v4 as uuid } from "uuid";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import { CircularProgress } from "@mui/material";

const intialOption = {
  id: uuid(),
  OptionDesc: "",
  correct: false,
};
const options = {
  id: uuid(),
  QuesDesc: "",
  options: [
    { ...intialOption, id: uuid(), correct: false, OptionDesc: "" },
    { ...intialOption, id: uuid(), correct: false, OptionDesc: "" },
  ],
};

const CreateQuestions = () => {
  const navigate = useNavigate();
  const { Question, SetQuestion } = useStates();
  const { QuizName, QuizDesc, QuizGrade, Timelimit } = useStates();
  const { SetQuizName, SetQuizDesc, SetQuizGrade, SetTimeLimit } = useStates();
  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    // if(!Question.length>0){
    SetQuestion(() => [
      {
        ...options,
        id: uuid(),
        options: [
          { ...intialOption, id: uuid(), correct: false, OptionDesc: "" },
          { ...intialOption, id: uuid(), correct: false, OptionDesc: "" },
        ],
      },
    ]);
    // }
  }, [SetQuestion]);

  async function CreateQuiz() {
    let Questions = Question.map(({ QuesDesc, options }) => {
      let obj = {};
      obj["question"] = QuesDesc;
      obj["options"] = options.map((opt) => opt.OptionDesc);
      obj["correctAnswerIndex"] = options.findIndex(
        (opt) => opt.correct === true
      );
      return obj;
    });
    let sentObj = {
      quiz_name: QuizName,
      description: QuizDesc,
      grades: QuizGrade,
      time_limit: Timelimit,
      questions: Questions,
    };
    setIsloading(true);
    await fetch("https://quizbackend-x9lu.onrender.com/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sentObj),
    })
      .then((res) => {
        if (res.status === 200) {
          navigate("/");
          SetQuestion(() => []);
          SetQuizName(() => "");
          SetQuizDesc(() => "");
          SetQuizGrade(() => "");
          SetTimeLimit(() => "");
        }
      })
      .catch((err) => {
        console.log("err in post of document", err);
      })
      .finally(() => {
        setIsloading(false);
      });
  }
  function deleteOption(id, QuesID) {
    let findIndex = Question.findIndex((obj) => obj.id === QuesID);
    let clone = [...Question];
    clone[findIndex]["options"] = clone[findIndex]["options"].filter(
      (obj) => obj.id !== id
    );
    SetQuestion(() => clone);
  }

  function makeCorrectOpt(id, QuesID) {
    let findIndex = Question.findIndex((obj) => obj.id === QuesID);
    let clone = [...Question];
    clone[findIndex]["options"] = clone[findIndex]["options"].map((obj) => {
      if (obj.id === id) {
        return {
          ...obj,
          correct: true,
        };
      }
      return {
        ...obj,
        correct: false,
      };
    });
    SetQuestion(() => clone);
  }
  function setQuestionDescription(QuesID, value) {
    let findIndex = Question.findIndex((obj) => obj.id === QuesID);
    let clone = [...Question];
    clone[findIndex].QuesDesc = value;
    SetQuestion(() => clone);
  }
  function setOptionDescription(id, QuesID, value) {
    let findIndex = Question.findIndex((obj) => obj.id === QuesID);
    let clone = [...Question];
    let optIndex = clone[findIndex]?.options?.findIndex((obj) => obj.id === id);
    clone[findIndex].options[optIndex].OptionDesc = value;
    SetQuestion(() => clone);
  }
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Card
        elevation={0}
        sx={{
          padding: 2,
        }}
      >
        <CardActions>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                onClick={() => {
                  SetQuestion((pre) => {
                    return [
                      ...pre,
                      {
                        ...options,
                        id: uuid(),
                        options: [
                          { ...intialOption, id: uuid() },
                          { ...intialOption, id: uuid() },
                        ],
                      },
                    ];
                  });
                }}
                size="large"
                variant="contained"
              >
                <AddIcon />
                &nbsp;Add Question
              </Button>
            </Grid>
          </Grid>
        </CardActions>
        {Question?.map(({ QuesDesc, options, id: QuesID }, index) => (
          <CardContent key={index}>
            <Typography
              variant="h5"
              fontWeight="500"
              color="text.primary"
              gutterBottom
            >
              {`Question ${index + 1}`}
            </Typography>
            <TextField
              margin="normal"
              fullWidth
              multiline
              name="Question_Description"
              label={`Question Description`}
              id="Question_Description"
              value={QuesDesc}
              onChange={(val) => {
                setQuestionDescription(QuesID, val.target.value);
              }}
            />
            {options?.map(({ id, correct, OptionDesc }, index) => {
              return (
                <OptionCreate
                  setOptionDescription={(val) =>
                    setOptionDescription(id, QuesID, val)
                  }
                  deleteOption={() => deleteOption(id, QuesID)}
                  key={index}
                  value={OptionDesc}
                  index={index}
                  correct={correct}
                  makeCorrectOpt={() => makeCorrectOpt(id, QuesID)}
                />
              );
            })}
            <CardActions>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Button
                    onClick={() => {
                      let filtered = Question.filter(
                        (obj) => obj.id !== QuesID
                      );
                      SetQuestion((pre) => [...filtered]);
                    }}
                    size="large"
                    variant="outlined"
                    sx={{
                      borderColor: "#f44336",
                      borderWidth: 2,
                      fontWeight: "600",
                      color: "#f44336",
                      "&:hover": {
                        cursor: "pointer",
                        borderColor: "#f44336",
                        borderWidth: 2,
                      },
                    }}
                  >
                    <RemoveCircleOutlineIcon />
                    &nbsp; Delete Question
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => {
                      let findIndex = Question.findIndex(
                        (obj) => obj.id === QuesID
                      );
                      let clone = [...Question];
                      clone[findIndex]["options"] = [
                        ...clone[findIndex].options,
                        { ...intialOption, id: uuid() },
                      ];
                      SetQuestion(() => clone);
                    }}
                    size="large"
                    variant="contained"
                  >
                    <AddIcon />
                    &nbsp;Add Option
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </CardContent>
        ))}
      </Card>
      <CardActions>
        <Grid container justifyContent="space-around">
          <Grid item>
            <Button
              onClick={() => navigate("/")}
              size="large"
              variant="contained"
              sx={{
                backgroundColor: "#e53935",
                fontWeight: "600",
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: "#e53935",
                },
              }}
            >
              <CancelIcon />
              &nbsp;Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => CreateQuiz()}
              size="large"
              variant="contained"
              sx={{
                backgroundColor: "green",
                fontWeight: "600",
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: "green",
                },
              }}
            >
              Create Quiz&nbsp; <CheckIcon />
            </Button>
          </Grid>
        </Grid>
      </CardActions>
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100vh",
            zIndex: 1,
            backgroundColor: "transparent",
            top: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default CreateQuestions;

import React, { useEffect, useState } from "react";
import OptionSelection from "./Option.Select";
import { useStates } from "../State/State";

import { CardContent, Typography, TextField } from "@mui/material";
import ScoreCard from "./ScoreCard";
const QuizTest = () => {
  const { createdQuiz, selectedQuizId } = useStates();
  const [filterQuiz, SetfilterQuiz] = useState([]);
  const [currentQuesIndex, SetcurrentQuesIndex] = useState(0);
  const [TotalScore, setTotalScore] = useState(0);
  useEffect(() => {
    let filter = createdQuiz.filter((obj) => selectedQuizId === obj?._id)[0]
      ?.questions;
    SetfilterQuiz(() => filter);
  }, [selectedQuizId, createdQuiz]);

  function NextQuestion(index, currentQuesIndex) {
    let correctIndex = filterQuiz.filter(
      (_, index) => currentQuesIndex === index
    )[0]?.correctAnswerIndex;
    if (index === correctIndex) {
      setTotalScore((pre) => pre + 1);
    }
    SetcurrentQuesIndex((pre) => pre + 1);
  }
  return (
    <div>
      {currentQuesIndex < filterQuiz?.length &&
        selectedQuizId !== "" &&
        filterQuiz
          .filter((_, index) => currentQuesIndex === index)
          ?.map(({ question, options, id: QuesID }, index) => (
            <CardContent key={index}>
              <Typography
                variant="h5"
                fontWeight="500"
                color="text.primary"
                gutterBottom
              >
                {`Question ${currentQuesIndex + 1}`}
              </Typography>
              <TextField
                margin="normal"
                fullWidth
                multiline
                name="Question_Description"
                label={`Question Description`}
                id="Question_Description"
                value={question}
                InputProps={{ readOnly: true }}
              />
              {options?.map((option, index) => {
                let value=false
                if (option !== "") {
                  value=true
                }
                return value&&<OptionSelection
                key={index}
                value={option}
                index={index}
                onSelect={() => NextQuestion(index, currentQuesIndex)}
              />
              })}
            </CardContent>
          ))}
      {currentQuesIndex === filterQuiz?.length && (
        <ScoreCard TotalScore={TotalScore} />
      )}
    </div>
  );
};

export default QuizTest;

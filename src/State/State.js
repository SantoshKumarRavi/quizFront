import React from "react";
import { useState, createContext, useContext } from "react";
const Context = createContext();
const State = ({ children }) => {
  const [Question, SetQuestion] = useState([]);
  const [QuizName, SetQuizName] = useState("");
  const [QuizDesc, SetQuizDesc] = useState("");
  const [QuizGrade, SetQuizGrade] = useState("");
  const [Timelimit, SetTimeLimit] = useState("");
  const [createdQuiz, SetCreatedQuiz] = useState([]);
  const [selectedQuizId, SetselectedQuizId] = useState("");
  // useEffect(() => {
    async function fetchQuiz() {
      await fetch("https://quizbackend-x9lu.onrender.com/create")
        .then((x) => {
          return x.json();
        })
        .then((res) => {
          SetCreatedQuiz(() => res);
        });
    }
    // fetchQuiz();
  // }, []);
  let reducer = {
    Question: Question,
    SetQuestion: SetQuestion,
    QuizName: QuizName,
    SetQuizName: SetQuizName,
    QuizDesc: QuizDesc,
    SetQuizDesc: SetQuizDesc,
    QuizGrade: QuizGrade,
    SetQuizGrade: SetQuizGrade,
    Timelimit: Timelimit,
    SetTimeLimit: SetTimeLimit,
    createdQuiz: createdQuiz,
    fetchQuiz: fetchQuiz,
    SetCreatedQuiz:SetCreatedQuiz,
    selectedQuizId: selectedQuizId,
    SetselectedQuizId: SetselectedQuizId,
  };
  return <Context.Provider value={reducer}>{children}</Context.Provider>;
};
export const useStates = () => useContext(Context);

export default State;

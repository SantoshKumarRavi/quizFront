import "./App.css";
import QuizFront from "./components/QuizFront";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateQuestions from "./components/CreateQuestions";
import State from "./State/State";
import Quiz from "./components/Quiz";
import QuizTest from "./components/QuizTest";
function App() {
  return (
    <div>
      <State>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<QuizFront />} />
            <Route path="/Question" element={<CreateQuestions />} />
            <Route path="/Quiz" element={<Quiz />} />
            <Route path="/StartQuiz" element={<QuizTest />} />
          </Routes>
        </BrowserRouter>
      </State>
    </div>
  );
}

export default App;

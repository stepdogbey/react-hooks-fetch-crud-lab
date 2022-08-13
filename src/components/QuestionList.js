import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

//Page loads
// Data from fetch should be loaded
// Set State to the data loaded

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setQuestions(questions));
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then(() => {
        const minusDeletedQuestions = questions.filter((i) => i.id !== id);
        setQuestions(minusDeletedQuestions);
      });
  }

  function answerChanged(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (minusDeletedQuestions) {
        const allUpdatedQuestionAnswer = questions.map((item) => {
          if (item.id === minusDeletedQuestions.id) {
            return minusDeletedQuestions;
          } else {
            return item;
          }
        });
        setQuestions(allUpdatedQuestionAnswer);
      });
  }

  //Map through our questions to be displayed

  const showQuestions = questions.map((question) => {
    return (
      <QuestionItem
        key={question.id}
        question={question}
        onDelete={handleDelete}
        onAnswerChange={answerChanged}
      />
    );
  });

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{showQuestions}</ul>
    </section>
  );
}

export default QuestionList;

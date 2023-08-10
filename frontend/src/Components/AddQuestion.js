import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { createQuizQuestion } from "../Redux/quizQuestionSlice";
import { fetchCategories } from "../Redux/categorySlice";

export default function AddQuestion() {
  const categories = useSelector((state) => state.categories.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);
  const [answer, setAnswer] = useState("");

  const handleAddOption = () => {
    setOptions([...options, { text: "", isCorrect: false }]);
  };

  const handleDeleteLastOption = () => {
    if (options.length > 0) {
      const updatedOptions = [...options];
      updatedOptions.pop(); // Supprime la dernière option
      setOptions(updatedOptions);
    }
  };

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...options];
    updatedOptions[index][field] = value;
    setOptions(updatedOptions);
  };

  /* Cette fonction est utilisée pour gérer la sélection d'une option comme correcte ou incorrecte. 
  Lorsque vous cliquez sur un des boutons radio "Correct Option" ou "Incorrect Option", 
  cette fonction est appelée pour mettre à jour l'état isCorrect pour chaque option. */

  const handleCorrectOptionChange = (index) => {
    const updatedOptions = options.map((option, i) => {
      if (i === index) {
        return { ...option, isCorrect: true };
      } else {
        return { ...option, isCorrect: false };
      }
    });
    setOptions(updatedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const questionData = {
      category,
      question,
      options,
      correctOption: answer,
    };

    dispatch(createQuizQuestion(questionData));

    setCategory("");
    setQuestion("");
    setOptions([
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ]);
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-center" style={{ marginTop: "15px" }}>
        <label
          htmlFor="question"
          className="form-label fw-bold mb-3"
          style={{ fontSize: "22px" }}
        >
          Add a Question for your Quiz
        </label>
      </div>
      <MDBRow className="mb-3">
        <MDBCol>
          <label htmlFor="category" className="form-label fw-bold mb-2">
            Select Category
          </label>
          <select
            className="form-select"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Choose a category...</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </MDBCol>
      </MDBRow>

      <label htmlFor="question" className="form-label fw-bold mb-3">
        Add a Question
      </label>
      <MDBInput
        label="Question"
        id="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="mb-3"
      />

      {options.map((option, index) => (
        <div key={index}>
          <MDBInput
            type="text"
            label={`Option ${index + 1}`}
            value={option.text}
            onChange={(e) => handleOptionChange(index, "text", e.target.value)}
            style={{ margin: "8px 0" }}
          />
          <div
            className="d-flex align-items-center"
            style={{ justifyContent: "space-around" }}
          >
            <div>
              <input
                type="radio"
                id={`option${index}_correct`}
                name={`correct_option_${index}`}
                checked={option.isCorrect}
                style={{ marginRight: "5px" }}
                onChange={() => handleCorrectOptionChange(index)}
              />
              <label htmlFor={`option${index}_correct`}>Correct Option</label>
            </div>
            <div>
              <input
                type="radio"
                id={`option${index}_incorrect`}
                name={`correct_option_${index}`}
                checked={!option.isCorrect}
                style={{ marginRight: "5px" }}
                onChange={() => handleCorrectOptionChange(index)}
              />
              <label htmlFor={`option${index}_incorrect`}>
                Incorrect Option
              </label>
            </div>
          </div>
        </div>
      ))}

      <div className="d-grid gap-2 mt-3">
        <MDBBtn type="button" color="info" onClick={handleAddOption}>
          Add Option
        </MDBBtn>
      </div>
      {/* Bouton pour supprimer la dernière option */}
      <div className="d-grid gap-2 mt-3">
        <MDBBtn
          type="button"
          color="danger"
          onClick={handleDeleteLastOption}
          disabled={options.length === 0}
        >
          Delete Option
        </MDBBtn>
      </div>

      <div className="d-grid gap-2 mt-3">
        <MDBBtn type="submit" color="success">
          Save
        </MDBBtn>
        <MDBBtn type="button" color="danger" onClick={() => setCategory("")}>
          Cancel
        </MDBBtn>
      </div>
    </form>
  );
}

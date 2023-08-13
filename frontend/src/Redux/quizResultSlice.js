import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching quiz results
export const fetchQuizResults = createAsyncThunk(
  "quizResult/fetchQuizResults",
  async (userId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/quiz-results/user/${userId}`
      );
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Async thunk for creating quiz result
export const createQuizResult = createAsyncThunk(
  "quizResult/createQuizResult",
  async (payload) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/quiz-results/user/save",
        payload
      );
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const quizResultSlice = createSlice({
  name: "quizResult",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    ///////////////////
    // Autres réducteurs...
    resetResults: (state) => {
      // Réinitialise les résultats du quiz à un tableau vide
      state.results = [];
    },
    ////////////////////
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizResults.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchQuizResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder.addCase(createQuizResult.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createQuizResult.fulfilled, (state, action) => {
      state.loading = false;
      state.newResult = action.payload;
    });
    builder.addCase(createQuizResult.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default quizResultSlice.reducer;

/////////Pour réinitialiser le resultat du tableau. A emporter dans QuizQuestions////////

export const { resetResults } = quizResultSlice.actions;

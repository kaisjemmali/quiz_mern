import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching quiz questions
export const fetchQuizQuestions = createAsyncThunk(
  "quizQuestion/fetchQuizQuestions",
  async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/quiz-questions"
      );
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Async thunk for creating quiz question
export const createQuizQuestion = createAsyncThunk(
  "quizQuestion/createQuizQuestion",
  async (payload) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/quiz-questions",
        payload
      );
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Async thunk for deleting quiz question
export const deleteQuizQuestion = createAsyncThunk(
  "quizQuestion/deleteQuizQuestion",
  async (payload) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/quiz-questions/${payload}`
      );
      // window.location.reload();
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Async thunk for editing quiz question
export const updateQuizQuestion = createAsyncThunk(
  "quizQuestion/updateQuizQuestion",
  async ({ id, question, options, category }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/quiz-questions/${id}`,
        { question, options, category }
      );
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Async thunk for fetching category questions
export const fetchCategoryQuestions = createAsyncThunk(
  "categoryQuestion/fetchCategoryQuestions",
  async (id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/quiz-questions/category/${id}`
      );
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const quizQuestionSlice = createSlice({
  name: "quizQuestion",
  initialState: {
    data: [],
    loading: false,
    error: null,
    questions: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchQuizQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder.addCase(createQuizQuestion.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createQuizQuestion.fulfilled, (state, action) => {
      state.loading = false;
      state.newQuestion = action.payload;
    });
    builder.addCase(createQuizQuestion.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteQuizQuestion.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteQuizQuestion.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedQuestion = action.payload;
    });
    builder.addCase(deleteQuizQuestion.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(updateQuizQuestion.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateQuizQuestion.fulfilled, (state, action) => {
      state.loading = false;
      state.updatedQuestion = action.payload;
    });
    builder.addCase(updateQuizQuestion.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder
      .addCase(fetchCategoryQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchCategoryQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default quizQuestionSlice.reducer;

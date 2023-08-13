import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
import categoryReducer from "./categorySlice";
import quizQuestionReducer from "./quizQuestionSlice";
import quizResultSlice from "./quizResultSlice";

const store = configureStore({
  reducer: {
    userRd: userReducer,
    auth: authReducer,
    categories: categoryReducer,
    quizQuestions: quizQuestionReducer,
    quizResult: quizResultSlice,
  },
  devTools: true,
});

export default store;

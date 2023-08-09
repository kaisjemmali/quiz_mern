import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (payload) => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/categories/",
        payload
      );
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Async thunk for creating category

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (payload) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/categories/",
        payload
      );
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Async thunk for deleting category

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (payload) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/categories/${payload}`
      );
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Async thunk for editing category

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, name, description, photoUrl }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/categories/${id}`,
        { name, description, photoUrl }
      );
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    ///////////////////////////////////////////////////////////////////////////
    builder.addCase(createCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.newCategory = action.payload;
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    //////////////////////////////////////////////////////////////////////////
    builder.addCase(deleteCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedCategory = action.payload;
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    ////////////////////////////////////////////////////////////////////////
    builder.addCase(updateCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.upadtedTodo = action.payload;
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default categorySlice.reducer;

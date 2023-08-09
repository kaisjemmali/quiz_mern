import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Logout, setCredentials } from "./authSlice";

export const login = createAsyncThunk(
  "user/login",
  async (
    { formValue, navigate, toast },
    { rejectWithValue, getState, dispatch }
  ) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios
        .post("http://localhost:5000/api/users/auth", formValue)
        .then((res) => {
          toast.success("Logged In Successfully");
          dispatch(setCredentials(res.data));
        })
        .then(() => {
          navigate("/");
        });
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (
    { formValue, navigate, toast },
    { rejectWithValue, getState, dispatch }
  ) => {
    axios.defaults.withCredentials = true;
    console.log(formValue);
    try {
      const { data } = await axios
        .post("http://localhost:5000/api/users", formValue)
        .then(() => {
          navigate("/login");
        })
        .then(() => {
          toast.success("Registred  Successfully");
        });

      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (
    { formValue, toast, navigate },
    { rejectWithValue, getState, dispatch }
  ) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios
        .put("http://localhost:5000/api/users/profile", formValue)
        .then(() => {
          dispatch(Logout());
        });

      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

// Async thunk for fetching users

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (payload) => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/users/profiles",
        payload
      );
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Async thunk for deleting user

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (payload) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/users/profile/${payload}`
      );
      return data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Async thunk for ban user

export const banUser = createAsyncThunk(
  "user/banUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/ban/${userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for unban user

export const unbanUser = createAsyncThunk(
  "user/unbanUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/unban/${userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [], // Le tableau qui contiendra la liste des utilisateurs
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loggedUser = action.payload;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
    });
    /////////////////////////////////////////////////////////
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.registredUser = action.payload;
      state.loading = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
    });
    /////////////////////////////////////////////////////////
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.updatedUser = action.payload;
      state.loading = false;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
    });
    ////////////////////////////////////////////////////////
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload; // Mettre à jour le state avec les données des utilisateurs
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    //////////////////////////////////////////////////////////////////////////
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedUser = action.payload;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    ////////////////////////////////////////////////////////////////////////
    builder.addCase(banUser.pending, (state) => {
      // Mettre à jour l'état pour indiquer que la requête est en cours
      state.loading = true;
      state.error = null;
    });
    builder.addCase(banUser.fulfilled, (state, action) => {
      // Mettre à jour l'état avec les données de l'utilisateur mis à jour
      state.updatedUser = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(banUser.rejected, (state, action) => {
      // Mettre à jour l'état pour indiquer qu'il y a eu une erreur
      state.loading = false;
      state.error = action.payload;
    });
    /////////////////////////////////////////////////////////////////////
    builder.addCase(unbanUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(unbanUser.fulfilled, (state, action) => {
      // La mise à jour de l'état est gérée automatiquement par Redux Toolkit
      state.updatedUser = action.payload;
      state.loading = false;
    });
    builder.addCase(unbanUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;

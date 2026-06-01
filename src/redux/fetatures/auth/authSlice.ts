import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authAPI";
import { LoginForm } from "./authTypes";
import Toast from "react-native-toast-message";
import { handleAxiosError } from "../../../utils/errorHandler";

export const UserLogin = createAsyncThunk<void, LoginForm, { rejectValue: { message: string } }>('/auth/userLogin', async (DataView, { rejectWithValue }) => {
    try {
        const res = await authApi.userLogin(DataView);
        Toast.show({ type: "success", text1: "User Logged In Successfully" });
    } catch (error: any) {
        return handleAxiosError(error, rejectWithValue, "")
    }
})


const initalstate = {
    userType: "",
    loading: false,
    isLoggedIn: false,
}

const authSlice = createSlice(
    {
        name: "authSlice",
        initialState: initalstate,
        reducers: {
            setLoggedIn: (state, action) => {
                state.isLoggedIn = action.payload;
            },
        },
        extraReducers: (builder) => {
            builder.addCase(UserLogin.pending, (state) => {
                state.loading = true;
            })
            builder.addCase(UserLogin.fulfilled, (state) => {
                state.loading = false;
            })
            builder.addCase(UserLogin.rejected, (state) => {
                state.loading = false
            })
        }
    }
)

export const { setLoggedIn } = authSlice.actions;
export default authSlice.reducer;



import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { checkauth } from "../services/api";


const checkAuthStatus = createAsyncThunk(
    'auth/checkAuth',
    async () => {
        const isAuthenticated = await checkauth();
        return isAuthenticated
    }
)

const initialState = {
    user: null,
    loading: true
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state,action) => {
            state.user = action.payload
        },

        logout: (state) => {
            state.user = null
        },

        setLoading: (state, action) => {
            state.loading = action.payload
        }


    },
    extraReducers: (builder) => {
        builder.addCase(checkAuthStatus.pending, (state) => {
            state.loading = true
        }).addCase(checkAuthStatus.fulfilled, (state,action) => {
            state.user = action.payload
            state.loading = false
        }).addCase(checkAuthStatus.rejected, (state) => {
            state.loading = false
            state.user = null
        })

    }



})

export const {login, logout} = authSlice.actions
export  {checkAuthStatus}

export default authSlice.reducer;




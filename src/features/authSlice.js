import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import AuthService from '../services/auth.service';


const user =JSON.parse(localStorage.getItem('user'));


//Creating initialstate
const initialState = {
    user: user ? user : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
    tokenExp: false
}


//Section for registering a new user
export const registerUser = createAsyncThunk('auth/register', async(registerData, thunkAPI) =>{
    try {
        return await AuthService.register(registerData)
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();
        
        console.log(message)
        const {data} = error.response.data
        return thunkAPI.rejectWithValue(data)
    }
})



//Section for login in an existing user
export const loginUser = createAsyncThunk('auth/login', async(data, thunkAPI)=>{
    try {
        return await AuthService.login(data)
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();

        const {data} = error.response.data
        return thunkAPI.rejectWithValue(data)
    }
})


//section for logging out a user from the system

export const logout = createAsyncThunk('auth/logout', async()=>{
    await AuthService.logout()
})

export const getTokenExpirationTime = createAsyncThunk('auth/tokenexpire', async()=>{
    // const { exp } = await AuthService.getCurrentUser()
    return await AuthService.getTokenExpirationTime()
    // if(exp * 1000 < new Date().getTime()){
    //     console.log("the token has expired")
    //     return true
    // } else {
    //     console.log("This token is still active")
    //     return false
    // }
}) 

export const autoLogout = createAsyncThunk('auth/autologout', async()=>{
    const {exp} = AuthService.getCurrentUser()
    // const dateNow = new Date(exp * 1000);

    // const now = Math.floor(new Date('2012.08.10').getTime() * 1000)
    // const now2 = new Date().getTime()

    // console.log("this is now ", now2)
    // console.log({
    //     exp1: exp * 1000,
    //     day: dateNow.getDay(),
    //     year: dateNow.getFullYear(),
    //     time: dateNow.getTime(),
    //     date: dateNow.getDate(),
    //     hour: dateNow.getHours(),
    //     min: dateNow.getMinutes()

    // })
    if (exp * 1000 < new Date().getTime()) {
    //    localStorage.removeItem('user')
         console.log("the token has expired")
      } else{
          console.log("This token is still active")
      }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        reset: (state)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.tokenExp = false;
            state.message = ''
        },
        tokenXp: (state)=>{
            if(AuthService.getTokenExpirationTime()){
                state.tokenExp = true
            } else {
                state.tokenExp = false
            }
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(registerUser.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(registerUser.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            // state.user = action.payload
        })
        .addCase(registerUser.rejected, (state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.payload
        })

        .addCase(loginUser.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(loginUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload
        })
        .addCase(loginUser.rejected, (state, action) =>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.payload
        })

        .addCase(logout.fulfilled, (state)=>{
            state.user = null
        })
        .addCase(autoLogout.fulfilled, (state)=>{
            state.user = null
        })
        // .addCase(getTokenExpirationTime.pending, (state)=>{
        //     state.tokenExp = false
        // })
        // .addCase(getTokenExpirationTime.fulfilled, (state)=>{
        //     if(AuthService.getTokenExpirationTime()){
        //         state.tokenExp = true
        //     } else {
        //         state.tokenExp = false
        //     }
        // })
    }
})


export const {reset, tokenXp} = authSlice.actions;

export default authSlice.reducer




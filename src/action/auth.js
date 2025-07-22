import * as api from '../api';
import { setcurrentuser } from './currentuser';
import { fetchallusers } from './users';
export const signup =(authdata,naviagte)=> async(dispatch)=>{
    try {
        const{data}=await api.signup(authdata);
        dispatch({type:"AUTH",data})
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
        dispatch(fetchallusers())
        naviagte("/")
    } catch (error) {
        console.log(error);
    }
}
export const login =(authdata,naviagte)=> async(dispatch)=>{
    try {
        const{data}=await api.login(authdata);
        console.log("API DATA : ",data);
        if (data.otpRequired) {
            naviagte('/verify-otp', { state: { email: data.email,success:false } });
            return;
        }
        if(data.success){
            dispatch({type:"AUTH",data})
            dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
            naviagte("/")
        }
    } catch (error) {
        console.log(error.message)
    }
}
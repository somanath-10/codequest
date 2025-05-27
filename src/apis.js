const REACT_APP_BASE_URL = "https://null-intern-backend-2.onrender.com";


export const endpoints = {
    SEND_OTP: REACT_APP_BASE_URL + "/api/request-otp",
    VERIFY_OTP:REACT_APP_BASE_URL + "/api/verify-otp",
    RESET_PASSWORD:REACT_APP_BASE_URL + "/api/reset-password"
}
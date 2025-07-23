import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Askquestion from './pages/Askquestion/Askquestion'
import Auth from './pages/Auth/Auth'
import Question from './pages/Question/Question'
import Displayquestion from './pages/Question/Displayquestion'
import Tags from './pages/Tags/Tags'
import Users from './pages/Users/Users'
import Userprofile from './pages/Userprofile/Userprofile'
import RequestOtp from './Comnponent/PasswordReset/RequestOtp'
import VerifyOtp from './Comnponent/PasswordReset/VerifyOtp'
import ResetPassword from './Comnponent/PasswordReset/ResetPassword'
import LoginHistoryPage from './pages/Userprofile/LoginHistoryPage'
import PaymentPage from './pages/payment/PaymentPage'
import PublicFeed from './pages/post/PublicFeed'
import AcceptReq from './pages/Userprofile/AcceptReq'
import PostPicture from './pages/post/PostPicture';
import PostDetails from './pages/post/PostDetails'
import MainLayout from './layouts/MainLayout'
import UserPosts from './pages/post/UserPosts'
import WhatsAppStyleChat from './pages/chat/ChatPage'
import GoogleLoginButton from './Comnponent/GoogleLoginButton'
import AuthCallback from './pages/googleauth/AuthCallback'
import PublicChat from './Comnponent/publicchat/PublicChat'
import RequireAuth from './middleware/RequireAuth'

function Allroutes({slidein,handleslidein}) {
  
  return (

    <div className='pt-16'>

    <Routes>
        <Route path='/' element={<Home slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/Askquestion' element={<Askquestion />}/>
        <Route path='/Auth' element={<Auth />}/>
        <Route path='/Question' element={<Question slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/Tags' element={<Tags slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/Users' element={<Users slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/request-otp' element={<RequestOtp/>}/>
        <Route path='/verify-otp' element={<VerifyOtp/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/googleauth' element={<GoogleLoginButton/>}/>
        <Route path='/auth/callback' element={<AuthCallback/>}/>

          <Route path='/post/:postId' element={<PostDetails/>}/>
              <Route element={<RequireAuth />}>
          
                
        <Route path='/Question/:id' element={<Displayquestion slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/Users/:id' element={<Userprofile slidein={slidein} handleslidein={handleslidein}/>}/>
        <Route path='/login-history' element={<LoginHistoryPage/>}/>
        <Route path='/payment' element={<PaymentPage/>}/>
        <Route path='/requests' element={<AcceptReq/>}/>
          <Route path='/post' element={<PublicFeed/>}/>
          <Route path='/post/create' element={<PostPicture/>}/>

        <Route path='/post/user' element={<UserPosts/>}/>
        <Route path='/chat' element={<WhatsAppStyleChat/>}/>
        <Route path='/public-chat' element={<PublicChat/>}/>
        
              </Route>
        
    </Routes>
    </div>
  )
}

export default Allroutes
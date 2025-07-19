const GoogleLoginButton = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return <button onClick={handleLogin} className=" flex justify-center items-center mt-20">Login with Google</button>;
};

export default GoogleLoginButton;

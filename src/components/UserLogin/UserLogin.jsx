import {Outlet } from "react-router-dom";

const UserLogin = () => {
  return (
    <div>
      <h1>Login Component here</h1>
      {/* outlet is used to trigger child components behaviour in parent component */}
      <Outlet /> 
    </div>
  );
};
export default UserLogin;

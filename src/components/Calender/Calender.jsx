import {Outlet } from "react-router-dom";

const About = () => {
  return (
    <div>
      <nav
        data-testid="mini_switch"
        style={{ border: "none", justifyContent: "center" }}
      >
      </nav>
      {/* outlet is used to trigger child components behaviour in parent component */}
      <Outlet /> 
    </div>
  );
};
export default About;

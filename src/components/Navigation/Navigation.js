import React from "react";
import ProfileIcon from "../Profile/ProfileIcon";

const Navigation = ({ onRouteChange, status, toggleModal }) => {
  return status === false ? (
    <nav className="right-0 pr2">
      <p
        className="pa3 tr f3 link dim gray underline pointer"
        onClick={() => onRouteChange("signIn")}
      >
        Sign In
      </p>
      <p
        className="pa3 tr f3 link dim gray underline pointer"
        onClick={() => onRouteChange("register")}
      >
        Register
      </p>
    </nav>
  ) : (
    <nav className="fr pr2">
      <ProfileIcon toggleModal={toggleModal} onRouteChange={onRouteChange} />
    </nav>
  );
};

export default Navigation;
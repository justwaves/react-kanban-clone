import React from "react";
import { useDispatch } from "react-redux";
import { enterAsGuest } from "../redux/modules/user";

const LandingPage = () => {
  const dispatch = useDispatch();

  const accessAsGuest = () => {
    dispatch(enterAsGuest());
  };

  return (
    <div>
      <div>
        <h1>Enter as guest</h1>
        <button onClick={accessAsGuest}>Enter</button>
      </div>
    </div>
  );
};

export default LandingPage;

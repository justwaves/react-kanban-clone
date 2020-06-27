import React from "react";
import { useSelector } from "react-redux";
import Home from "../../components/Home/Home";

const HomeContainer = () => {
  const { boards } = useSelector(({ boards }) => ({
    boards: Object.keys(boards).map((key) => boards[key]),
  }));
  return <Home boards={boards} />;
};

export default HomeContainer;

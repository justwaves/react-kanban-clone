import React from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import Routes from "./Routes";

const App = () => {
  const { user, isGuest } = useSelector(({ user }) => ({
    user: user.user,
    isGuest: user.isGuest,
  }));

  return (
    <>
      <Helmet>
        <title>React Kanban</title>
      </Helmet>
      <Routes user={user} isGuest={isGuest} />
    </>
  );
};

export default App;

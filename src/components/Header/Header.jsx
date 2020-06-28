import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  return (
    <HeaderWrapper>
      <HeaderTitle to="/">
        {/* <img src={kanbanLogo} alt="React Kanban logo" /> */}
        &nbsp;React Kanban
      </HeaderTitle>
      <HeaderRightSide>
        {user ? (
          <UserThumbnail
            src={user.imageUrl}
            alt={user.name}
            title={user.name}
          />
        ) : (
          <GuestIcon>Guest</GuestIcon>
        )}
        {user ? (
          <SignoutLink href="/auth/signout">
            <SignoutIcon>sign out</SignoutIcon>
            &nbsp;Sign out
          </SignoutLink>
        ) : (
          <SignoutLink href="/">
            <SignoutIcon>sign out</SignoutIcon>
            &nbsp;Sign in
          </SignoutLink>
        )}
      </HeaderRightSide>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 5px;
  background: #555;
  z-index: 2;
  transition: background 0.3s;

  ${(props) => props.color && css``}
`;

const HeaderTitle = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: white;
  font-size: 22px;
  font-weight: 700;
  text-decoration: none;

  img {
    height: 30px;
  }
`;

const HeaderRightSide = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
  color: white;
`;

const UserThumbnail = styled.img`
  height: 28px;
  border-radius: 3px;
`;

const GuestIcon = styled.div`
  padding-top: 2px;
  font-size: 24px;
`;

const SignoutLink = styled.a`
  padding: 3px 5px 1px 5px;
  margin-left: 12px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  color: white;
  background: rgba(0, 0, 0, 0.2);
  text-decoration: none;

  &:focus,
  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;

const SignoutIcon = styled.div`
  padding-bottom: 2px;
  font-size: 22px;
`;

// @media (max-width: 700px) {
//   .user-thumbnail,
//   .guest-icon {
//     display: none;
//   }

//   .signout-link {
//     margin-left: 0px;
//   }
// }

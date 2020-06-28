import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import slugify from "slugify";
import BoardAdderContainer from "../../containers/Home/BoardAdderContainer";
import Header from "../Header/Header";

const Home = ({ boards }) => {
  if (!boards) return;

  return (
    <>
      <Header />
      <HomeWrapper>
        <MainContent>
          <h1>Boards</h1>
          <BoardsWrapper>
            {boards.map((board) => (
              <BoardLink
                key={board._id}
                color={board.color}
                to={`/b/${board._id}/${slugify(board.title, {
                  lower: true,
                })}`}
              >
                <BoardLinkTitle>{board.title}</BoardLinkTitle>
                <MiniBoard>
                  {board.lists.map((listId) => (
                    <MiniList
                      key={listId}
                      // style={{
                      //   height: `${Math.min(
                      //     (lists[listId].cards.length + 1) * 18,
                      //     100
                      //   )}%`,
                      // }}
                    />
                  ))}
                </MiniBoard>
              </BoardLink>
            ))}
            <BoardAdderContainer />
          </BoardsWrapper>
        </MainContent>
      </HomeWrapper>
    </>
  );
};

export default Home;

const HomeWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: #eee;
  overflow: auto;
`;

const MainContent = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 4 * $board-width + 8 * $board-margin;
  margin: $main-margin;

  h1 {
    margin: 20px 5px;
    font-size: 22px;
  }
`;

// @media (max-width: 4 * $board-width + 8 * $board-margin + 2 * $main-margin) {
//   .main-content {
//     width: 3 * $board-width + 6 * $board-margin;
//   }
// }

// @media (max-width: 3 * $board-width + 6 * $board-margin + 2 * $main-margin) {
//   .main-content {
//     width: 2 * $board-width + 4 * $board-margin;
//   }
// }
// @media (max-width: 2 * $board-width + 4 * $board-margin + 2 * $main-margin) {
//   .main-content {
//     width: $board-width + 2 * $board-margin;
//     margin: $main-margin 0;
//   }
// }

const BoardsWrapper = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
`;

const BoardLink = styled(Link)`
  box-sizing: border-box;
  width: 260px;
  height: 140px;
  margin: 8px;
  padding: 10px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 700;
  transition: background 0.1s;
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  color: white;
  overflow-wrap: break-word;
  text-decoration: none;

  ${(props) => props.color && css``}

  &:hover,
  &:focus {
    ${(props) => props.color && css``}
  }
`;

const BoardLinkTitle = styled.div`
  padding-bottom: 5px;
`;

const MiniBoard = styled.div`
  display: flex;
  height: 100%;
`;

const MiniList = styled.div`
  display: inline-block;
  box-sizing: border-box;
  width: 24px;
  height: 100%;
  margin-right: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.25);
`;

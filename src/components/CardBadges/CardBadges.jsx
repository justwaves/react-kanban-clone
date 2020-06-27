import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const CardBadges = ({ checkboxes }) => {
  const renderTaskProgress = () => {
    const { total, checked } = checkboxes;
    if (total === 0) {
      return null;
    }
    return (
      <Badge style={{ background: checked === total ? "green" : "#444" }}>
        {/* <MdDoneAll className="badge-icon" /> */}
        &nbsp;
        {checked}/{total}
      </Badge>
    );
  };

  return <CardBadgesWrapper>{renderTaskProgress()}</CardBadgesWrapper>;
};

CardBadges.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  checkboxes: PropTypes.shape({
    total: PropTypes.number.isRequired,
    checked: PropTypes.number.isRequired,
  }).isRequired,
};

export default CardBadges;

const CardBadgesWrapper = styled.div`
  display: flex;
  padding: 0px 8px 6px 8px;
  font-size: 14px;
`;

const Badge = styled.div`
  margin-right: 5px;
  padding: 3px 4px 1px 3px;
  border-radius: 3px;
  color: white;
  transition: background 0.15s;
`;

// const BadgeIcon = styled.div`
//   margin-bottom: 2px;
// `;

import { Component } from "react";
import PropTypes from "prop-types";
import onClickOutside from "react-onclickoutside";

class ClickOutsideWrapper extends Component {
  handleClickOutside = () => this.props.handleClickOutside();
  render = () => this.props.children;
}

ClickOutsideWrapper.propTypes = {
  handleClickOutside: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default onClickOutside(ClickOutsideWrapper);

import React, { Component } from "react";
import { Icon } from "antd";
import Moment from "react-moment";

class Timestamp extends Component {
  render() {
    return (
      <>
        <Icon type="calendar" style={{ marginRight: 8 }} />
        <Moment format="YYYY-MM-DD">{this.props.data}</Moment>
      </>
    );
  }
}

export default Timestamp;

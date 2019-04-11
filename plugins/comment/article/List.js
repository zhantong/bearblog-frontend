import React, { Component } from "react";
import { Icon } from "antd";

class Meta extends Component {
  render() {
    return (
      <>
        <Icon type="message" style={{ marginRight: 8 }} />
        {this.props.data}
      </>
    );
  }
}

export default Meta;

import React, { Component } from "react";
import { Icon, Tag } from "antd";

class Meta extends Component {
  render() {
    return (
      <span>
        <Icon type="tags" style={{ marginRight: 8 }} />
        {this.props.data.map(tag => (
          <Tag>{tag.name}</Tag>
        ))}
      </span>
    );
  }
}

export default Meta;

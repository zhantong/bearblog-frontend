import React, { Component } from "react";
import { Icon, Tag } from "antd";

class Meta extends Component {
  render() {
    return (
      <span>
        <Icon type="folder-open" style={{ marginRight: 8 }} />
        {this.props.data.map(category => (
          <Tag>{category.name}</Tag>
        ))}
      </span>
    );
  }
}

export default Meta;

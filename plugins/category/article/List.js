import React, { Component } from "react";
import { Icon, Tag } from "antd";
import Router from "next/router";

class Meta extends Component {
  render() {
    return (
      <span>
        <Icon type="folder-open" style={{ marginRight: 8 }} />
        {this.props.data.map(category => (
          <Tag
            key={category.slug}
            onClick={() => {
              Router.push(
                `/index?category=${category.slug}`,
                `/articles?category=${category.slug}`
              );
            }}
          >
            {category.name}
          </Tag>
        ))}
      </span>
    );
  }
}

export default Meta;

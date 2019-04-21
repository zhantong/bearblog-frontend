import React, { Component } from "react";
import { Icon, Tag } from "antd";
import Router from "next/router";

class Meta extends Component {
  render() {
    return (
      <span>
        <Icon type="tags" style={{ marginRight: 8 }} />
        {this.props.data.map(tag => (
          <Tag
            key={tag.slug}
            onClick={() => {
              Router.push(
                `/index?tag=${tag.slug}`,
                `/articles?tag=${tag.slug}`
              );
            }}
          >
            {tag.name}
          </Tag>
        ))}
      </span>
    );
  }
}

export default Meta;

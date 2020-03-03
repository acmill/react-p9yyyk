import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { TreeSelect } from "antd";

const treeData = [
  {
    title: "Asset-4538",
    value: "0-0",
    children: [
      {
        title: "Domain 0",
        value: "0-0-1"
      },
      {
        title: "Domain 1",
        value: "0-0-2"
      }
    ]
  },
  {
    title: "LM-1000",
    value: "0-1",
    children: [
      {
        title: "Domain 0",
        value: "0-1-1"
      },
      {
        title: "Domain 1",
        value: "0-1-2"
      }
    ]
  },
  {
    title: "TESTBED-002",
    value: "0-2",
    children: [
      {
        title: "Domain 0",
        value: "0-2-1"
      }
    ]
  }
];

class DomainSelect extends React.Component {
  state = {
    value: undefined
  };

  onChange = value => {
    console.log(value);
    this.setState({ value });
  };

  render() {
    return (
      <TreeSelect
        style={{ width: "100%" }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        treeData={treeData}
        placeholder="Please select a domain to deploy to"
        treeDefaultExpandAll
        onChange={this.onChange}
        treeCheckable
      />
    );
  }
}

export default DomainSelect;

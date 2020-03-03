import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Tabs, Card } from "antd";
const { Meta } = Card;

const ScreenshotTabs = () => {
  const { TabPane } = Tabs;
  function callback(key) {
    console.log(key);
  }

  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Tab 1" key="1">
        ,
      </TabPane>
      <TabPane tab="Tab 2" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  );
};

export default ScreenshotTabs;

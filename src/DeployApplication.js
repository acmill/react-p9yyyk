import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Modal, Button } from "antd";
import DomainSelect from "./DomainSelect";

class DeployApplication extends React.Component {
  state = {
    loading: false,
    visible: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Deploy Application
        </Button>
        <Modal
          visible={visible}
          title="Deploy this application to an asset/domain"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleOk}
            >
              Submit
            </Button>
          ]}
        >
          <span>Select Domains</span>
          <DomainSelect />
        </Modal>
      </div>
    );
  }
}

export default DeployApplication;

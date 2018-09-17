/* eslint-disable react/destructuring-assignment,prefer-destructuring */
import React, { PureComponent } from 'react';
import { connect } from 'dva/index';
import {
  Form ,
  Modal,
  Tabs,
} from 'antd';

const TabPane = Tabs.TabPane;

export default
@connect(({ tbConfig, loading }) => ({
  tbConfig,
  loading: loading.models.tbConfig,
}))
@Form.create()
class ListConfigForm extends PureComponent{
  constructor(props){
    super(props);
    this.state={
      visible:props.visible || false,
    };
  }

  handleOk=()=>{
    this.setState({
      visible:false,
    })
  }

  handleCancel=()=>{
    this.setState({
      visible:false,
    })
  }


  render(){
    const {onCancel} = this.props;
    return (
      <Modal
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={onCancel}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="业务说明" key="1">Content of Tab Pane 1</TabPane>
          <TabPane tab="表格配置" key="2">Content of Tab Pane 2</TabPane>
          <TabPane tab="表单配置" key="3">Content of Tab Pane 3</TabPane>
        </Tabs>
      </Modal>
    )
  }
}

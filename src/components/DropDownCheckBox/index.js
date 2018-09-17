/* eslint-disable react/prefer-stateless-function,react/destructuring-assignment */
import React, { PureComponent } from 'react';
import { Dropdown,Menu,Checkbox,Divider,Button,Col } from 'antd';


class DropDownCheckBox extends PureComponent{
  constructor(props){
    super(props);

    this.state={
      visible:false,
    }
  }

  handleMenuClick=(key)=>{
    console.info(key);
  }

  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  }

  render(){
    const {onChange,data} = this.props;

    const menu=(
      <Menu onClick={this.handleMenuClick}>
        {
          data.map((item,index)=><Menu.Item key={`m_${item.key}`}><Checkbox disabled={index===0?true:false} checked={item.checked || false} value={item.key} onChange={onChange}>{item.title}</Checkbox></Menu.Item>)
        }
      </Menu>
    );

    return (
      <Dropdown overlay={menu} onVisibleChange={this.handleVisibleChange} visible={this.state.visible}>
        <a className="ant-dropdown-link" href="#">
          <Checkbox>显示/隐藏列</Checkbox>
        </a>
      </Dropdown>
    );
  }
}

export default DropDownCheckBox;

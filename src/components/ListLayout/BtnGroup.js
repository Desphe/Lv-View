import React, { PureComponent } from 'react';
import { Button, Popconfirm, Dropdown, Icon, Menu } from 'antd';

import RenderAuthorized from '../Authorized';
import styles from './BtnGroup.less';

const Authorized = RenderAuthorized('');
const { check } = Authorized

export default class BtnGroup extends PureComponent {
  state = {

  }

  handleBtnClick = (key) => {
    const { onClick } = this.props;
    onClick(key);
  }

  handleMenuClick = (key) => {
    const { onClick } = this.props;
    if (key.key !== 'false') {
      onClick(key.key);
    }
  }

  // 手动创建
  buildSingleBtn = (btns) => btns.map(item => {
    if (item.isconfirm) {
      return (
        <Authorized key={`auth_${item.funCode}`} authority={item.authority} noMatch=''>
          <Popconfirm title={item.confirm.title} onConfirm={() => this.handleBtnClick(item.funCode)} okText={item.confirm.okText || "确定"} cancelText={item.confirm.cancelText || "取消"}>
            <Button icon={item.icon || "user-add"} type={item.type || "primary"}>{item.btn_name}</Button>
          </Popconfirm>
        </Authorized>
      );
    }
    return (
      <Authorized key={`auth_${item.funCode}`} authority={item.authority} noMatch=''>
        <Button icon={item.icon || "user-add"} type={item.type || "primary"} onClick={() => this.handleBtnClick(item.funCode)}>{item.btn_name}</Button>
      </Authorized>
    );
  }
  )

  // 配置创建
  buildSingleBtnAuto = (btns) => btns.map(item => {
    if (item.isconfirm) {
      return (
        <Popconfirm title={item.confirm.title} onConfirm={() => this.handleBtnClick(item.funCode)} okText={item.confirm.okText || "确定"} cancelText={item.confirm.cancelText || "取消"}>
          <Button icon={item.icon || "user-add"} type={item.type || "primary"}>{item.btn_name}</Button>
        </Popconfirm>
      );
    }
    return (
      <Button icon={item.icon || "user-add"} type={item.type || "primary"} onClick={() => this.handleBtnClick(item.funCode)}>{item.btn_name}</Button>
    );
  }
  )

  // 手动创建
  buildMenuBtn = (btns) => (
    <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
      {
        btns.map(item => {
          if (item.isconfirm) {
            return (
              check(item.authority, (
                <Menu.Item key='false'>
                  <Popconfirm title={item.confirm.title} onConfirm={() => this.handleBtnClick(item.funCode)} okText={item.confirm.okText || "确定"} cancelText={item.confirm.cancelText || "取消"}>{item.btn_name}
                  </Popconfirm>
                </Menu.Item>
              ))
            );
          }
          return check(item.authority, <Menu.Item key={item.funCode}>{item.btn_name}</Menu.Item>)
        })
      }
    </Menu>
  )

  // 配置创建
  buildMenuBtnAuto = (btns) => {
    if(btns.length>0){
      return (
        <Menu onClick={this.handleMenuClick}>
          {
            btns.map(item => {
              if (item.isconfirm) {
                return (
                  <Menu.Item key='false'>
                    <Popconfirm title={item.confirm.title} onConfirm={() => this.handleBtnClick(item.funCode)} okText={item.confirm.okText || "确定"} cancelText={item.confirm.cancelText || "取消"}>{item.btn_name}
                    </Popconfirm>
                  </Menu.Item>
                );
              }
              return (
                <Menu.Item key={item.funCode}>{item.btn_name}</Menu.Item>
              );
            })
          }
        </Menu>
      );
    }
    return null;
  }

  handleInstallButtons = (config)=>{
    const arrSingleBtn=[];
    const arrMenuBtn=[]
    // 独立按钮
    config.forEach(item=>{
      if (item.showType===0){
        const btnItem={};
        btnItem.type=item.type || 'primary';
        if (item.icon!==undefined){btnItem.icon=item.icon;}
        arrSingleBtn.push(item)
      } else{
        arrMenuBtn.push(item)
      }
    })
    
    return {single:arrSingleBtn,menu:arrMenuBtn};
  }

  render() {
    const { selectedRowKeys,btnConfig, buildType } = this.props;

    const btns = this.handleInstallButtons(btnConfig);
    const btnS = btns.single;
    const btnM = btns.menu;

    return (
      <div className={styles.tableListOperator}>
        {
          buildType === 1 ? this.buildSingleBtn(btnS) : this.buildSingleBtnAuto(btnS)
        }
        {
          (selectedRowKeys.length && btnM.length>0) > 0 && (
            <span>
              <Dropdown overlay={buildType === 1 ? this.buildMenuBtn(btnM) : this.buildMenuBtnAuto(btnM)}>
                <Button>
                  更多操作 <Icon type="down" />
                </Button>
              </Dropdown>
            </span>
          )
        }
      </div>
    )
  }
}
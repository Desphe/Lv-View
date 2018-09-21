import React, { PureComponent ,Fragment} from 'react';
import { connect } from 'dva/index';
import {
  Icon,
  Button,
  Dropdown,
  Menu,
  notification,
 } from 'antd';
import styles from './index.less';

export default class CurrencyButton extends PureComponent{

  // 表格上方按钮点击事件
  handleTopBtnClick =(obj)=>{
    // key = {funCode:'',key:'',source:'column/topBtn'}
    const { openForm,selectedRowKeys,buttonFun } = this.props;
      let arrKey = "";
      if(obj.isNeedSelect) {
        if(obj.isNeedSelect == "tableKey") {
          arrKey.push("tableKey");
        }else{
          if (selectedRowKeys.length===0){
            notification.error({
              message: '警告',
              description: '请选择至少一条记录！',
            });
            return;
          }
          if(obj.isNeedSelect == 1) {
            arrKey=selectedRowKeys[0];
          }else{
            arrKey=selectedRowKeys;
          }
          //....
        }
      }
      if(obj.isModal) {
        openForm(obj,arrKey)
      }else{
        let params = {
          ids:arrKey,
        }
        buttonFun(params,obj.funCode)
      }
    
  }

  handleInstallButtons = (config)=>{
    const arrSingleBtn=[];
    const arrMenuBtn=[]
    // 独立按钮
    config.forEach((item,i)=>{
      if (item.showType===0){
        const btnItem={};
        btnItem.type=item.type || 'primary';
        if (item.icon!==undefined){btnItem.icon=item.icon;}
        arrSingleBtn.push((
          <Button key={"button_"+i} {...btnItem} onClick={()=>this.handleTopBtnClick({...item})}>{item.btnName}</Button>
        ))
      } else{
        arrMenuBtn.push((
          <Menu.Item key={"button_"+i} onClick={()=>this.handleTopBtnClick({...item})}>{item.btnName}</Menu.Item>
        ))
      }
    })
    
    const menuBtn = arrMenuBtn.length>0?(
      <Menu selectedKeys={[]}>
        {
          arrMenuBtn.map(item=> item)
        }
      </Menu>
    ):"";
    return {single:arrSingleBtn,menu:menuBtn};
  }

  render() {
    const {btnConfig} = this.props;
    const installButtons = this.handleInstallButtons(btnConfig);
    return(
      <div className={styles.tableListOperator}>
        {
          installButtons.single.map(x=>x)
        }
        <span>
          {installButtons.menu?<Dropdown overlay={installButtons.menu}>
            <Button>
              更多操作 <Icon type="down" />
            </Button>
          </Dropdown>:""}
        </span>
      </div>
    )
  }
}
import React, { PureComponent ,Fragment} from 'react';
import { connect } from 'dva/index';
import { Row,
  Col,
  Card,
  Form,
  Icon,
  Button,
  Dropdown,
  Menu,
  Table,
  notification,
  Divider } from 'antd';
import styles from './index.less';
import FormTemplate from '@/components/FormTemplate';

export default class CurrencyButton extends PureComponent{

  // 表格上方按钮点击事件
  handleTopBtnClick =(obj)=>{
    // key = {funCode:'',key:'',source:'column/topBtn'}
    const { openForm,closeForm,tbCode,selectedRowKeys } = this.props;
    if (obj.funCode==='add'){
      let modal = {
        visible:true,
        content:(
          <FormTemplate visible modalWidth='60%' bCode={tbCode} dKey='' formName="company" onCancel={()=>{closeForm()} } />
        ),
      };
      openForm(modal)
    }
    else if (obj.funCode==='edit'){
      // var key  = obj.key;
      const arrKey =[];
      arrKey.push(obj.key);
      if (obj.source==='btn'){
        if (selectedRowKeys.length!==1){
          notification.error({
            message: '警告',
            description: '请选择一条记录！',
          });
          return;
        }
        arrKey.pop();
        arrKey.push(selectedRowKeys[0]);
        // var key = selectedRowKeys[0];
      }

      let modal = {
        visible:true,
        content:(
          <FormTemplate visible modalWidth='60%' bCode={tbCode} dKey={arrKey[0]} formName="company" onCancel={()=>{closeForm()} } />
        ),
      };
      openForm(modal)
    }
    else if (obj.funCode==='delete') {
      const key = [];
      key.push(obj.key||'');
      if (obj.source==='btn'){
        if (selectedRowKeys.length===0){
          notification.error({
            message: '警告',
            description: '请选择至少一条记录！',
          });
          return;
        }
        key.push(selectedRowKeys.map(item=>item));
      }
      dispatch({
        type:'formBuild/delete',
        payload:{tbCode:tbCode,ids:key},
      }).then(() => this.setState({
        selectedRowKeys:[],
      },()=>this.handleSearch({ preventDefault() { return true; }})));
    }
    else{
      console.info('other operation')
    }
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
        arrSingleBtn.push((
          <Button key={item.funCode} {...btnItem} onClick={()=>this.handleTopBtnClick({funCode:item.funCode,source:'btn'})}>{item.btnName || ''}</Button>
        ))
      } else{
        arrMenuBtn.push((
          <Menu.Item key={item.funCode}>{item.btnName}</Menu.Item>
        ))
      }
    })
    // 下拉按钮
    const menuBtn = (
      <Menu onClick={this.handleTopMenuClick} selectedKeys={[]}>
        {
          arrMenuBtn.map(item=> item)
        }
      </Menu>
    )
    return {single:arrSingleBtn,menu:menuBtn};
  }

  render() {
    const {selectedRowKeys,btnConfig} = this.props;
    const installButtons = this.handleInstallButtons(btnConfig);
    return(
      <div className={styles.tableListOperator}>
        {
          installButtons.single.map(x=>x)
        }
        {selectedRowKeys.length > 0 && (
          <span>
            <Dropdown overlay={installButtons.menu}>
              <Button>
                更多操作 <Icon type="down" />
              </Button>
            </Dropdown>
          </span>
        )}
      </div>
    )
  }
}
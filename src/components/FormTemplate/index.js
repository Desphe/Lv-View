import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Row,
  Modal,
  Table,
  Tabs,
} from 'antd';
import FormBuild from '@/components/FormBuild';
import CurrencyTable from '@/components/CurrencyTable';
import styles from './index.less'

const { TabPane } = Tabs;

/* eslint react/no-multi-comp:0 */
export default
@Form.create()
class FormTemplate extends PureComponent{

  state={

  }

  componentWillMount(){
    const {loadFields,arrKey,btnConfig} = this.props;
    let params = {}
;    if(btnConfig.modalCode) {
      params = {
        id:arrKey,
      }
    }
    loadFields(params,btnConfig.modalCode)
  }

  handleSubmit = e =>{
    const { form:{getFieldsValue},buttonFun,arrKey,btnConfig,onCancel } = this.props;
    let params = getFieldsValue();
    if(arrKey) {
      if(arrKey.constructor==Array) {
        params["ids"] = arrKey;
      }else if(arrKey.constructor==Number) {
        params["id"] = arrKey;
      }
    }
    buttonFun(params,btnConfig.funCode)
    onCancel()
  }

  onPanelChange=(value, mode)=>{
    console.info(value,mode);
  }

  ModalContent() {
    const {dataInfo,form:{getFieldDecorator}} = this.props;
    console.log(dataInfo)
    //const {fields,value} = dataInfo;
    let modalContent;
    if(dataInfo.constructor == Array) {
      modalContent = <Tabs defaultActiveKey="0">
        {dataInfo.map((data,i) => {
          return(<TabPane tab={data.tabName} key={i}>
              <Row justify="space-around" type="flex">
                {
                  data.fields.map(item=>FormBuild(item,getFieldDecorator,false,data.value))
                }
              </Row>
          </TabPane>)
        })}
      </Tabs>
    }else{
      modalContent = <Form>
        <Row justify="space-around" type="flex">
          {
            dataInfo.fields.map(item=>FormBuild(item,getFieldDecorator,false,dataInfo.value))
          }
        </Row>
      </Form>;
    }
    return modalContent;
    console.log()
    return modalContent;
  }

  render(){
    const {visible,modalWidth,onCancel,btnConfig} = this.props;
    return (
      <Modal
        title={btnConfig.btnName}
        width={modalWidth}
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={()=>onCancel(false)}
        cancelText="关闭"
        okText="提交"
        destroyOnClose
        className={styles.CustomFormClass}
      >
        {this.ModalContent()}
      </Modal>
    )
  }
}

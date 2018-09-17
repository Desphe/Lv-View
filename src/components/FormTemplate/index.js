import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Row,
  Modal,
  Table,
} from 'antd';
import FormBuild from '@/components/FormBuild';
import styles from './index.less'

/* eslint react/no-multi-comp:0 */
export default
@connect(({ menuManage,loading }) => ({
  menuManage,
  loading:loading.models.menuManage,
}))
@Form.create()
class FormTemplate extends PureComponent{

  state={

  }

  componentDidMount(){
    const {bCode, dKey,dispatch } = this.props;
    dispatch({
      type:'menuManage/loadInitFields',
      payload:dKey?{bCode,key:dKey}:{bCode},
    });
  }

  handleSubmit = e =>{
    const { form:{getFieldsValue} } = this.props;
    console.log(getFieldsValue())
    // const { menuManage:{dataInfo:{fields}},handleSave,dispatch,form,dKey } = this.props;
    // e.preventDefault();
    // handleSave();
    // form.validateFieldsAndScroll((err, values) => {
    //   if (!err) {
    //     const payload = {};
    //     payload.key = dKey;
    //     Object.keys(values).forEach(key=>{
    //       let type ;
    //       let temp={};
    //       for (let i=0;i<config.length;i+=1){
    //         if (config[i].field===key){
    //           ({type} = config[i].type);
    //           temp = config[i];
    //           break;
    //         }
    //       }
    //       if (type==='date') {
    //         payload[key] = values[key].format(temp.format);
    //       }
    //       else if (type==='autocomplete') {
    //         payload[key] = values[key].key;
    //       }else{
    //         payload[key] = values[key];
    //       }
    //     });

    //     dispatch({
    //       type:'menuManage/update',
    //       payload
    //     })
    //   }
    // });
  }

  onPanelChange=(value, mode)=>{
    console.info(value,mode);
  }

  render(){
    const {menuManage:{dataInfo:{fields,value}},visible,modalWidth,onCancel} = this.props;
    const { form:{getFieldDecorator} } = this.props;

    return(
      <Modal
        title={value?'新增':'编辑'}
        width={modalWidth}
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={()=>onCancel(false)}
        cancelText="关闭"
        okText="提交"
        destroyOnClose
        className={styles.CustomFormClass}
      >
        <Form>
          <Row justify="space-around" type="flex">
            {
              fields.map(item=>FormBuild(item,getFieldDecorator,false,value))
            }
          </Row>
          {/* <Row>
            <Table dataSource={[]} columns={[{key:'1',title:'1111'}]} />
          </Row> */}
        </Form>
      </Modal>
    )
  }
}

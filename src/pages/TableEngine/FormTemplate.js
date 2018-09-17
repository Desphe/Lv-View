import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Row,
  Modal,
  Table,
} from 'antd';
import FormBuild from '../FormEngine/FormBuild';
import styles from './FormTemplate.less'

/* eslint react/no-multi-comp:0 */
export default
@connect(({ formBuild,loading }) => ({
  formBuild,
  loading:loading.models.formBuild,
}))
@Form.create()
class FormTemplate extends PureComponent{

  state={

  }

  componentDidMount(){
    const {bCode, dKey,dispatch } = this.props;
    dispatch({
      type:'formBuild/loadConfigData',
      payload:{bCode,key:dKey}
    });
  }

  handleSubmit = e =>{
    const { formBuild:{config},handleSave,dispatch,form,dKey } = this.props;
    e.preventDefault();
    handleSave();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const payload = {};
        payload.key = dKey;
        Object.keys(values).forEach(key=>{
          let type ;
          let temp={};
          for (let i=0;i<config.length;i+=1){
            if (config[i].field===key){
              ({type} = config[i].type);
              temp = config[i];
              break;
            }
          }
          if (type==='date') {
            payload[key] = values[key].format(temp.format);
          }
          else if (type==='autocomplete') {
            payload[key] = values[key].key;
          }else{
            payload[key] = values[key];
          }
        });

        console.info(payload);
        dispatch({
          type:'formBuild/update',
          payload
        })
      }
    });
  }

  onPanelChange=(value, mode)=>{
    console.info(value,mode);
  }

  render(){
    // console.info(this.props);
    const {formBuild:{config,data},visible,modalWidth,onCancel} = this.props;
    const { form:{getFieldDecorator} } = this.props;
    /*
    const fieldConfig=[
      {
        label:'姓名',// 表单名
        field:'name',// 字段Code
        type:'text',// 表单类型 数字、文本、日期、下拉、多行文本、单选、多选...
        required:true,// 是否必填
        errorMessage:'请输入姓名',// 错误提示消息
        // options:[],// 如果为下拉，单选、多选时需要提供数据源
        value:'',// 默认值
        row:'half', // half：占一行一般，row：一整行
        disabled:false, // 是否禁用
      },
      {
        label:'年龄',// 表单名
        field:'age',// 字段Code
        type:'int',// 表单类型 数字、文本、日期、下拉、多行文本、单选、多选...
        required:true,// 是否必填
        errorMessage:'请填写年龄',// 错误提示消息
        // options:[],// 如果为下拉，单选、多选时需要提供数据源
        value:'18',// 默认值
        row:'half', // half：占一行一般，row：一整行
        min:0,
        max:100,
        disabled:false, // 是否禁用
      },
      {
        label:'出生日期',// 表单名
        field:'birthday',// 字段Code
        type:'date',// 表单类型 数字、文本、日期、下拉、多行文本、单选、多选...
        required:true,// 是否必填
        errorMessage:'请填写出生日期',// 错误提示消息
        // options:[],// 如果为下拉，单选、多选时需要提供数据源
        value:'',// 默认值
        row:'half', // half：占一行一般，row：一整行
        mode:'range', // 日期面板的状态 time|date|month|year|range
        disabled:false, // 是否禁用
        format:'YYYY-MM-DD HH:mm',
      },
      {
        label:'学历',// 表单名
        field:'degree',// 字段Code
        type:'select',// 表单类型 数字、文本、日期、下拉、多行文本、单选、多选...
        required:true,// 是否必填
        errorMessage:'请选择学历',// 错误提示消息
        options:[{text:'本科',value:0},{text:'专科',value:1},{text:'高中',value:2},{text:'初中',value:3}],// 如果为下拉，单选、多选时需要提供数据源
        // value:'',// 默认值
        row:'half', // half：占一行一般，row：一整行
        disabled:false, // 是否禁用
        mode:'tags',
      },
      {
        label:'性别',// 表单名
        field:'sex',// 字段Code
        type:'radio',// 表单类型 数字、文本、日期、下拉、多行文本、单选、多选...
        required:true,// 是否必填
        errorMessage:'请选择性别',// 错误提示消息
        options:[{text:'男',value:1},{text:'女',value:0},{text:'保密',value:2}],// 如果为下拉，单选、多选时需要提供数据源
        value:'',// 默认值
        row:'half', // half：占一行一般，row：一整行
        disabled:false, // 是否禁用
      },
      {
        type:'empty',// 表单类型 数字、文本、日期、下拉、多行文本、单选、多选...
        row:'half', // half：占一行一般，row：一整行
      },
      {
        label:'兴趣爱好',// 表单名
        field:'hobby',// 字段Code
        type:'checkbox',// 表单类型 数字、文本、日期、下拉、多行文本、单选、多选...
        required:true,// 是否必填
        errorMessage:'请选择兴趣爱好',// 错误提示消息
        options:[{text:'游泳',value:0},{text:'乒乓球',value:1},{text:'羽毛球',value:2},{text:'电影',value:3},{text:'做饭',value:4},{text:'滑雪',value:5},{text:'跳伞',value:6}],// 如果为下拉，单选、多选时需要提供数据源
        value:'',// 默认值
        row:'row', // half：占一行一般，row：一整行
        disabled:false, // 是否禁用
      },
      {
        label:'备注',// 表单名
        field:'remark',// 字段Code
        type:'textarea',// 表单类型 数字、文本、日期、下拉、多行文本、单选、多选...
        required:true,// 是否必填
        errorMessage:'请填写备注',// 错误提示消息
        // options:['游泳','乒乓球','羽毛球','电影','做饭','滑雪','跳伞',],// 如果为下拉，单选、多选时需要提供数据源
        value:'',// 默认值
        row:'row', // half：占一行一般，row：一整行
        disabled:false, // 是否禁用
      },
      {
        label:'出生地',// 表单名
        field:'address',// 字段Code
        type:'cascader',// 表单类型 数字、文本、日期、下拉、多行文本、单选、多选...
        required:true,// 是否必填
        errorMessage:'请填写备注',// 错误提示消息
        options:[
          {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [{
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [{
              value: 'xihu',
              label: 'West Lake',
            }],
          }],
        }, {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [{
            value: 'nanjing',
            label: 'Nanjing',
            children: [{
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            }],
          }],
        }],// 如果为下拉，单选、多选时需要提供数据源
        // value:'',// 默认值
        row:'half', // half：占一行一般，row：一整行
        disabled:false, // 是否禁用
      },
      {
        label:'毕业学校',// 表单名
        field:'school',// 字段Code
        type:'autocomplete',// 表单类型 数字、文本、日期、下拉、多行文本、单选、多选...
        required:true,// 是否必填
        errorMessage:'请填写毕业学校',// 错误提示消息
        options:[{text:'野城庙小学',value:0},{text:'巨光乡中心小学',value:1},{text:'静边中学',value:2},{text:'三汇中学',value:3},{text:'上海师范大学',value:4}],
        value:'',// 默认值
        row:'half', // half：占一行一般，row：一整行
        disabled:false, // 是否禁用
      },
    ]
    */
    return(
      <Modal
        title={'111' || '编辑'}
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
              config.map(item=>FormBuild(item,getFieldDecorator,false,data))
            }
          </Row>
          <Row>
            <Table dataSource={[]} columns={[{key:'1',title:'1111'}]} />
          </Row>
        </Form>
      </Modal>
    )
  }
}

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Steps,
  Radio,
  Dropdown,
  Menu,
} from 'antd';

import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;
const components = {
  DatePicker: DatePicker,
};

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleClick, handleModalVisible, columns, modalName, selectedRows } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleClick(fieldsValue);
    });
  };

  const getFormItem = () => {
    return columns.map((item,i) => {
      const InputType = components[item.inputType]||Input;
      return(
        <FormItem key={"formItem_"+i} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label={item.title}>
          {form.getFieldDecorator(item.dataIndex, {
            initialValue: modalName=="修改"&&selectedRows?selectedRows[item.dataIndex]:"",
            rules: [{ required: item.isEmpty, message: '请输入至少两个字符的规则描述！', min: 2 }],
          })(<InputType placeholder = "请输入"/>)}
        </FormItem>
      )
    })
  }

  return (
    <Modal
      destroyOnClose
      title={modalName}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      {getFormItem()}
    </Modal>
  );
});

/* eslint react/no-multi-comp:0 */
@Form.create()
class CurrencyModal extends PureComponent {
  state = {
    modalVisible: false,
    modalName: "",
  }

  handleModalVisible = (flag,name="") => {
    const { getInfomation,selectedRows,handleDelete,cleanSelectRows } = this.props;
    if(name == "删除") {
      if(selectedRows.length > 0) {
        let params = {
          key: selectedRows.map(row => row.key),
        }
        handleDelete(params)
        cleanSelectRows()
      }else{
        return;
      }
    }else{
      if(flag&&name == "修改") {
        if(selectedRows.length > 0) {
          let params = {
            key: [selectedRows[0].key],
          }
          getInfomation(params)
        }else{
          return;
        }
      }
      this.setState({
        modalVisible: !!flag,
        modalName: name
      });
    }
  }

  handleClick = fields => {
    const { handleAdd } = this.props;
    handleAdd(fields)
    message.success('添加成功');
    this.handleModalVisible();
  };

  getAllButton(btnConfig) {
    return btnConfig.map(todo => (
      <Button key={"btn_"+todo.funCode} icon={todo.icon} type={todo.type} onClick={() => this.handleModalVisible(true,todo.btnName)}>
        {todo.btnName}
      </Button>)
    )
  }

  render() {
    const { columns,btnConfig,selectedRows } = this.props;
    const { modalVisible,modalName } = this.state;

    const parentMethods = {
      handleClick: this.handleClick,
      handleModalVisible: this.handleModalVisible,
      columns:columns,
      modalName:modalName,
      selectedRows:selectedRows,
    };
    return (
      <div className={styles.tableListOperator}>
        {btnConfig?this.getAllButton(btnConfig):null}
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </div>
    );
  }
}

export default CurrencyModal;
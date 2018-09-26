import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  Modal,
  Tabs,
  Tree,
  InputNumber,
  Table,
  Divider,
  Dropdown,
  Icon,
} from 'antd';
import { formatMessage } from 'umi/locale';

const FormItem = Form.Item;
const { TabPane } = Tabs;
const { TreeNode } = Tree;
const { TextArea } = Input;

export default
@connect(({ sysRole, loading }) => ({
  sysRole,
  loading: loading.models.sysRole
}))
@Form.create()
class RoleEditForm extends PureComponent {

  columns = [
    {
      title: '编号',
      dataIndex: 'id',
      width: 60
    },
    {
      title: '模块名称',
      dataIndex: 'module_name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 60
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
    }
  }

  componentDidMount() {
    const { dataid, dispatch } = this.props;
    console.info(dataid);
    if(dataid) {
      dispatch({
        type:'sysRole/loadData',
        payload:{id:dataid}
      });
    }
    dispatch({
      type:'sysRole/loadFormField',
    });
  }

  // 保存
  handleOk = (e) => {
    const { form: { validateFieldsAndScroll }, sysRole: { treeMenu,tbModule }, dispatch, dataid,onOk } = this.props;
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        const temp = {
          ...values,
          id:dataid,
          menu_ids: treeMenu.checkedids,
          module_ids:tbModule.checkedids
        }
        dispatch({
          type: 'sysRole/editData',
          payload: temp
        }).then(()=>onOk());
      }
    });
  }

  onCheck = (checkedKeys) => {
    const { dispatch } = this.props;
    console.log('onCheck', checkedKeys);
    dispatch({
      type:'sysRole/checkTreeMenu',
      payload:checkedKeys
    })
  }

  renderTreeNodes = (data) => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.name} key={item.id} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode {...item} />;
  })

  // 选择行CheckBox
  handleSelectRows = (selectedRowKeys) => {
    const { dispatch } = this.props;
    console.log('selectedRowKeys', selectedRowKeys);
    dispatch({
      type:'sysRole/checkTbRow',
      payload:selectedRowKeys
    })
  };

  render() {
    const { loading, form: { getFieldDecorator }, dataid, visible, onCancel, sysRole: { formValues, treeMenu, tbModule } } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
      style: { marginBottom: 5 }
    };

    // 特殊表格配置
    const tbConfig = {
      loading,
      bordered: false,
      size: 'middle',
      showHeader: true,
      footer: null,
      rowSelection: {
        selectedRowKeys:tbModule.checkedids,
        onChange: this.handleSelectRows,
      },
    };

    const pagination = {
      total: tbModule.list.length,
      pageSize:tbModule.list.length
    }
    console.log(tbModule)
    console.log(treeMenu)
    console.log(formValues)

    return (
      <Modal
        visible={visible}
        onOk={this.handleOk}
        onCancel={onCancel}
        width='600px'
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab='角色信息' key="1">
            <Form>
              <FormItem {...formItemLayout} label='角色名称'>
                {getFieldDecorator('role_name', {
                  initialValue: formValues.role_name,
                  rules: [
                    {
                      required: true,
                      message: '角色名称不能为空',
                    },
                  ],
                })(<Input placeholder='请输入角色名称' disabled={(dataid !== undefined && dataid > 0)} />)}
              </FormItem>
              <FormItem {...formItemLayout} label={formatMessage({ id: 'comm.sort' })}>
                {getFieldDecorator('sort', {
                  initialValue: formValues.sort || '0',
                })(<InputNumber placeholder='排序' />)}
              </FormItem>
              <FormItem {...formItemLayout} label="描述">
                {getFieldDecorator('role_desc', {
                  initialValue: formValues.role_desc,
                })(
                  <TextArea placeholder='描述' />
                )}
              </FormItem>
            </Form>
          </TabPane>
          <TabPane tab="菜单配置" key="2">
            <div style={{paddingLeft:50}}>
              <Tree
                checkable
                defaultExpandAll
                showLine
                onCheck={this.onCheck}
                checkedKeys={treeMenu.checkedids}
              >
                {this.renderTreeNodes(treeMenu.list)}
              </Tree>
            </div>
          </TabPane>
          <TabPane tab="功能模块配置" key="3">
            <Table {...tbConfig} columns={this.columns} pagination={pagination} dataSource={tbModule.list} onChange={this.handleTableChange} />
          </TabPane>
        </Tabs>
      </Modal>
    )
  }
}
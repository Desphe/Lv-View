import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  Modal,
  Tabs,
  Tree,
  Row,
  Col,
  InputNumber,
  Table,
  Checkbox,
  Dropdown,
  Icon,
} from 'antd';
import { formatMessage } from 'umi/locale';
import EditTable from '@/components/EditTable';

const FormItem = Form.Item;
const { TabPane } = Tabs;
const { TreeNode } = Tree;
const { TextArea } = Input;

const formItemLayout = {
  xs:{span:20},
  sm:{span:20},
  md:{span:10},
  lg:{span:10},
  xl:{span:10},
  xxl:{span:10},
};

export default
@connect(({ funModule, loading }) => ({
  funModule,
  loading: loading.models.funModule
}))
@Form.create()
class FunModuleEditForm extends PureComponent {

  columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '模块名称',
      dataIndex: 'module_name',
      key: 'module_name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
  ];

  btnColumns = [
    {
      title: '编号',
      dataIndex: 'btnTypeId',
      key: 'btnTypeId',
    },
    {
      title: '名称',
      dataIndex: 'btnName',
      key: 'btnName',
    },
    {
      title: '资源索引',
      dataIndex: 'resIndex',
      key: 'resIndex',
    },
    {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
    },
    {
      title: '弹窗',
      dataIndex: 'isModal',
      key: 'isModal',
    },
    {
      title: '弹窗数据接口',
      dataIndex: 'modalCode',
      key: 'modalCode',
    },
    {
      title: '选择数据',
      dataIndex: 'isNeedSelect',
      key: 'isNeedSelect',
    },
    {
      title: '弹窗操作接口',
      dataIndex: 'funCode',
      key: 'funCode',
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
    if(dataid) {
      dispatch({
        type:'funModule/loadData',
        payload:{id:dataid}
      });
    }
    dispatch({
      type:'funModule/loadModalData',
    });
  }

  // 保存
  handleOk = (e) => {
    const { form: { validateFieldsAndScroll }, funModule: { treeMenu,tbModule }, dispatch, dataid,onOk } = this.props;
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
          type: 'funModule/editData',
          payload: temp
        }).then(()=>onOk());
      }
    });
  }

  onCheck = (checkedKeys) => {
    const { dispatch } = this.props;
    dispatch({
      type:'funModule/checkTreeMenu',
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
    dispatch({
      type:'funModule/checkTbRow',
      payload:selectedRowKeys
    })
  };

  render() {
    const { loading, form: { getFieldDecorator }, dataid, visible, onCancel, funModule: { formValues, modalField, tbModule } } = this.props;

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
    return (
      <Modal
        visible={visible}
        onOk={this.handleOk}
        onCancel={onCancel}
        width='60%'
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab='模块配置' key="1">
            <Form>
              <Row justify="space-around" type="flex">
                <Col {...formItemLayout}>
                  <FormItem label='表编号'>
                    {getFieldDecorator('tableId', {
                      initialValue: formValues.tableId,
                      rules: [
                        {
                          required: true,
                          message: '表编号不能为空',
                        },
                      ],
                    })(<Input placeholder='请选择表编号' disabled={(dataid !== undefined && dataid > 0)} />)}
                  </FormItem>
                </Col>
                <Col {...formItemLayout}>
                  <FormItem label='模块名称'>
                    {getFieldDecorator('name', {
                      initialValue: formValues.name,
                      rules: [
                        {
                          required: true,
                          message: '模块名称不能为空',
                        },
                      ],
                    })(<Input placeholder='请输入模块名称' />)}
                  </FormItem>
                </Col>
                <Col {...formItemLayout}>
                  <FormItem label="资源索引">
                    {getFieldDecorator('resIndex', {
                      initialValue: formValues.resIndex,
                      rules: [
                        {
                          required: true,
                          message: '资源索引不能为空',
                        },
                      ],
                    })(
                      <Input placeholder='请输入资源索引' />
                    )}
                  </FormItem>
                </Col>
                <Col {...formItemLayout}>
                  <FormItem label="过滤条件">
                    {getFieldDecorator('filter', {
                      initialValue: formValues.filter,
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
                <Col {...formItemLayout}>
                  <FormItem label="模块类型">
                    {getFieldDecorator('type', {
                      initialValue: formValues.type,
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
                <Col {...formItemLayout}>
                  <FormItem label="排序">
                    {getFieldDecorator('sort', {
                      initialValue: formValues.sort,
                    })(
                      <InputNumber />
                    )}
                  </FormItem>
                </Col>
                <Col {...formItemLayout}>
                  <FormItem label="备注">
                    {getFieldDecorator('remark', {
                      initialValue: formValues.remark,
                    })(
                      <TextArea />
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </TabPane>
          <TabPane tab="按钮配置" key="2">
            <EditTable columns={this.btnColumns} dataSource={modalField.btnList} rowKey="btnTypeId"/>
          </TabPane>
          <TabPane tab="列权限配置" key="3">
            <Table {...tbConfig} columns={this.columns} pagination={pagination} dataSource={tbModule.list} onChange={this.handleTableChange} />
          </TabPane>
        </Tabs>
      </Modal>
    )
  }
}
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
    Card,
    Form,
    Button,
    Table,
    Divider,
    Dropdown,
    Icon,
    Row,
    Col,
    Input,
    Menu,
    Popconfirm,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import RenderAuthorized from '../../components/Authorized';
import styles from '../List/TableList.less';
import RoleEditForm from './RoleEditForm';

const Authorized = RenderAuthorized('');
const { check } = Authorized
const FormItem = Form.Item;

/* 页面权限定义 */
const pageAuthority = {
    listRole: undefined,
    addRole: undefined,
    editRole: undefined,
    deleteRole: undefined,
}

export default
@connect(({ sysRole, loading }) => ({
    sysRole,
    loading: loading.models.sysRole
}))
@Form.create()
class RoleManage extends PureComponent {
    // 列定义
    columns = [
        {
            title: '编号',
            dataIndex: 'id',
            width: 60
        },
        {
            title: '角色名称',
            dataIndex: 'role_name',
            width: 100
        },

        {
            title: '简介',
            dataIndex: 'description',
        },
        {
            title: '操作',
            width: 120,
            render: (record) => (
              <Fragment>
                <Authorized authority={pageAuthority.editUser} noMatch=''>
                  {record.account !== 'admin' && (
                    <a href='javascript:void(0); ' onClick={() => this.handleEdit(record.id)}>编辑</a>)}
                  <Divider type="vertical" />
                </Authorized>
                <Dropdown overlay={this.initColumnMenu(record)} trigger={['click']}>
                  <a className="ant-dropdown-link" href="#">
                            更多 <Icon type="down" />
                  </a>
                </Dropdown>
              </Fragment>
            ),
            align: 'center'
        },
    ];// 列

    constructor(props) {
        super(props);
        this.state = {
            formValues: {},
            defaultPageSize: 10,
            selectedRowKeys: [],
            modal: {
                visible: false,
                content: <div />
            }
        }
    }

    componentDidMount() {
        this.loadSplitData({ pageIndex: 1, pageSize: 10 });
    }

    sureDelete = (ids) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'sysRole/deleteRoleByIds',
            payload: { ids }
        }).then(()=>this.handleSearch({preventDefault:()=>true }));
    }

    deleteMulti=()=>{
        const { selectedRowKeys } = this.state;
        this.sureDelete(selectedRowKeys);
    }

    initColumnMenu = (record) => (
      <Menu userid={record.id}>
        {
            check(pageAuthority.deleteRole, (
              <Menu.Item key="delete">
                <Popconfirm title="确定要删除吗?" onConfirm={() => this.sureDelete([record.id])} okText="确定" cancelText="取消">
                    删除
                </Popconfirm>
              </Menu.Item>
              ))
        }
      </Menu>
    )

    // 筛选表单
    renderForm = () => {
        const { form: { getFieldDecorator } } = this.props;
        return (
          <Form onSubmit={this.handleSearch} layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={16} sm={24}>
                <FormItem label='角色名称'>
                  {getFieldDecorator('role_name')(<Input placeholder='角色名称' />)}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <span className={styles.submitButtons}>
                  <Button type="primary" htmlType="submit">查询</Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                </span>
              </Col>
            </Row>
          </Form>
        );
    }

    // 重置
    handleFormReset = () => {
        const { form } = this.props;
        form.resetFields();
        this.setState({
            formValues: {}
        }, () => this.loadSplitData({ pageIndex: 1, pageSize: 10 }));
    }

    // 查询
    handleSearch = e => {
        e.preventDefault();
        const { defaultPageSize } = this.state;
        const { form } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;

            const values = {
                ...fieldsValue,
            };

            this.setState({
                formValues: values,
            }, () => this.loadSplitData({
                filter: {
                    ...values,
                },
                pageIndex: 1,
                pageSize: defaultPageSize,
            }));
        });
    };

    // 表格改变事件
    handleTableChange = (pagination, filter, sorter) => {
        const { formValues } = this.state;

        this.setState({
            defaultPageSize: pagination.pageSize
        }, () => this.loadSplitData({
            pageIndex: pagination.current,
            pageSize: pagination.pageSize,
            sortField: sorter.field,
            sortOrder: sorter.order,
            filter: {
                ...filter,
                ...formValues
            }
        }));
    }

    // 加载数据
    loadSplitData = (params) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'sysRole/loadSplitData',
            payload: params,
        });
    }

    // 选择行CheckBox
    handleSelectRows = (selectedRowKeys) => {
        this.setState({
            selectedRowKeys,
        });
    };

    // 编辑后操作
    handleAfterEdit = () => {
        console.info('编辑后刷新');
        this.setState({
            modal:{
                visible:false,
                content:<span />
            }
        },()=>this.handleSearch({preventDefault:()=>true }));
    }

    // 添加/编辑 用户
    handleEdit = (id) => {
        console.info('角色编号', id);
        this.setState({
            modal: {
                visible: true,
                content: <RoleEditForm visible dataid={id} onOk={this.handleAfterEdit} onCancel={() => this.setState({ modal: { visible: false, content: (<span />) } })} />
            }
        })
    }

    render() {
        const { loading, sysRole: { list, pagination } } = this.props;
        const { selectedRowKeys, modal } = this.state;

        const pageData = list;// 数据

        // 特殊表格配置
        const tbConfig = {
            loading,
            bordered: false,
            size: 'middle',
            showHeader: true,
            footer: null,
            rowSelection: {
                selectedRowKeys,
                onChange: this.handleSelectRows,
            },
        };

        return (
          <Authorized authority={pageAuthority.listUser} noMatch=''>
            <PageHeaderWrapper title="查询表格">
              <Card bordered={false}>
                <div className={styles.tableList}>
                  <div className={styles.tableListForm}>{this.renderForm()}</div>
                  <div className={styles.tableListOperator}>
                    <Authorized authority={pageAuthority.addRole} noMatch=''>
                      <Button icon="user-add" type="primary" onClick={() => this.handleEdit(0)}>新增</Button>
                    </Authorized>
                    {
                       selectedRowKeys.length > 0 && (
                       <Authorized authority={pageAuthority.deleteRole} noMatch=''>
                         <Popconfirm title="确定要删除吗?" onConfirm={() => this.deleteMulti()} okText="确定" cancelText="取消">
                           <Button icon="user-delete" type="danger">删除</Button>
                         </Popconfirm>
                       </Authorized>
                        )
                    }
                  </div>
                  <Table {...tbConfig} columns={this.columns} pagination={pagination} dataSource={pageData} onChange={this.handleTableChange} />
                </div>
              </Card>
            </PageHeaderWrapper>
            {
                    modal.visible && modal.content
                }
          </Authorized>
        )
    }
}
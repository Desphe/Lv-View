import React, { PureComponent,Fragment } from 'react';
import { connect } from 'dva';
import {
  Card,
  Form,
  Button,
  Table,
  Badge,
  Divider,
  Dropdown,
  Icon,
  Row,
  Col,
  Select,
  Input,
  Menu,
  Popconfirm,
} from 'antd';
import { formatMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import RenderAuthorized from '../../components/Authorized';
import styles from '../List/TableList.less';
import UserEditForm from './UserEditForm';

const Authorized = RenderAuthorized('');
const { check } = Authorized
const FormItem = Form.Item;
const { Option } = Select;

/* 页面权限定义 */
const pageAuthority={
    listUser:undefined,
    addUser:undefined,
    editUser:undefined,
    deleteUser:undefined,
}

export default
@connect(({ sysUser, loading }) => ({
    sysUser,
    loading: loading.models.sysUser
}))
@Form.create()
class UserManage extends PureComponent {
    // 列定义
    columns = [
        {
            title:formatMessage({id:'comm.unmber'}),
            dataIndex:'id',
            width:60
          },
          {
            title:formatMessage({id:'app.user.account'}),
            dataIndex:'login_name',
            width:100
          },
          {
            title:formatMessage({id:'app.user.user_name'}),
            dataIndex:'user_name',
            width:100
          },
          {
            title:'简介',
            dataIndex:'description',
          },
          {
            title:formatMessage({id:'comm.state'}),
            dataIndex:'state',
            render(val) {
              return <Badge status={(val==='1'?'success':'error')} text={(val==='1'?formatMessage({id:'button.enable'}):formatMessage({id:'button.disable'}))} />;
            },
            width:90,
            align:'center'
          },
          {
            title:formatMessage({id:'comm.create_time'}),
            dataIndex:'create_time',
            width:150,
            align:'center'
          },
          {
            title:formatMessage({id:'comm.create_user'}),
            dataIndex:'create_user',
            width:120,
            align:'center'
          },
          {
            title:formatMessage({id:'comm.options'}),
            width:120,
            render: (record) => (
              <Fragment>
                <Authorized authority={pageAuthority.editUser} noMatch=''>
                  {record.account!=='admin' && (
                    <a href='javascript:void(0); ' onClick={()=>this.handleEditUser(record.id)}>{formatMessage({id:'button.edit'})}</a>)}
                  <Divider type="vertical" />
                </Authorized>
                <Dropdown overlay={this.initColumnMenu(record)} trigger={['click']}>
                  <a className="ant-dropdown-link" href="#">
                    {formatMessage({id:'button.more'})} <Icon type="down" />
                  </a>
                </Dropdown>
              </Fragment>
            ),
            align:'center'
          },
    ];// 列

    constructor(props){
        super(props);
        this.state={
            formValues:{},
            defaultPageSize:10,
            selectedRowKeys:[],
            modal:{
                visible:false,
                content:<span />
            }
        }
    }

    componentDidMount(){
        this.loadSplitData({pageIndex:1,pageSize:10});
    }

    handleColumnMenuClick=(key)=>{
        if(key.key==='reset'){
            this.handleReSetPwd([key.item.props.parentMenu.props.userid]);
        }
    }

    handleResetPwdMulti=()=>{
        const { selectedRowKeys } = this.state;
        this.handleReSetPwd(selectedRowKeys);
    }

    handleReSetPwd=(ids)=>{
        const { dispatch } = this.props;
        dispatch({
            type:'sysUser/changeUserStateByIds',
            payload:{ids,type:3}
        });
    }
    

    sureDeleteUser=(ids)=>{
        const { dispatch } = this.props;
        dispatch({
            type:'sysUser/changeUserStateByIds',
            payload:{ids,type:0}
        }).then(()=>this.handleSearch({preventDefault:()=>true}));
    }

    deleteMulti=()=>{
        const { selectedRowKeys } = this.state;
        this.sureDeleteUser(selectedRowKeys);
    }

    initColumnMenu=(record)=>(
      <Menu onClick={this.handleColumnMenuClick} userid={record.id}>
        <Menu.Item key="reset">
                密码重置
        </Menu.Item>
        {
            check(pageAuthority.deleteUser,(
              <Menu.Item key="delete">
                <Popconfirm title="确定要删除吗?" onConfirm={()=>this.sureDeleteUser([record.id])} okText="确定" cancelText="取消">
                删除
                </Popconfirm>
              </Menu.Item>
              
            ))
        }
      </Menu>
      )

    // 筛选表单
    renderForm=()=>{
        const { form:{getFieldDecorator} } = this.props;
        return (
          <Form onSubmit={this.handleSearch} layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
                <FormItem label={formatMessage({id:'app.user.user_name'})}>
                  {getFieldDecorator('user_name')(<Input placeholder={formatMessage({id:'button.please_input'})+formatMessage({id:'app.user.user_name'})} />)}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label={formatMessage({id:'comm.state'})}>
                  {getFieldDecorator('state')(
                    <Select placeholder={formatMessage({id:'button.please_select'})} style={{ width: '100%' }}>
                      <Option value="">{formatMessage({id:'button.select_all'})}</Option>
                      <Option value="0">{formatMessage({id:'button.disable'})}</Option>
                      <Option value="1">{formatMessage({id:'button.enable'})}</Option>
                    </Select>
                )}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <span className={styles.submitButtons}>
                  <Button type="primary" htmlType="submit">
                    {formatMessage({id:'button.search'})}
                  </Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                    {formatMessage({id:'button.reset'})}
                  </Button>
                </span>
              </Col>
            </Row>
          </Form>
        );
    }

    // 重置
    handleFormReset=()=>{
        const { form } = this.props;
        form.resetFields();
        this.setState({
            formValues:{}
        },()=>this.loadSplitData({pageIndex:1,pageSize:10}));
    }

    // 查询
    handleSearch=e=>{
        e.preventDefault();
        const {defaultPageSize} = this.state;
        const { form } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;

            const values = {
                ...fieldsValue,
            };

            this.setState({
                formValues: values,
            },()=>this.loadSplitData({
                filter:{
                    ...values,
                },
                pageIndex:1,
                pageSize:defaultPageSize,
            }));
        });
    };

    // 表格改变事件
    handleTableChange=(pagination, filter, sorter)=>{
        const { formValues } = this.state;

        this.setState({
            defaultPageSize:pagination.pageSize
        },()=>this.loadSplitData({
            pageIndex:pagination.current,
            pageSize:pagination.pageSize,
            sortField:sorter.field,
            sortOrder:sorter.order,
            filter:{
                ...filter,
                ...formValues
            }
        }));
    }

    // 加载数据
    loadSplitData=(params)=>{
        const { dispatch } = this.props;
        dispatch({
            type: 'sysUser/loadSplitData',
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
    handleAfterEdit=()=>{

    }

    // 添加/编辑 用户
    handleEditUser=(uid)=>{
        console.info('用户编号',uid);
        this.setState({
            modal:{
                visible:true,
                content:<UserEditForm visible dataid={uid} onOk={this.handleAfterEdit} onCancel={()=>this.setState({modal:{visible:false,content:(<span />)}})} />
            }
        })
    }

    render(){
        const { loading,sysUser:{list,pagination} } = this.props;
        const { selectedRowKeys,modal } = this.state;
        
        const pageData = list;// 数据

        // 特殊表格配置
        const tbConfig={
            loading,
            bordered: false,
            size: 'middle',
            showHeader : true,
            footer:null,
            rowSelection: {
                selectedRowKeys,
                onChange:this.handleSelectRows,
            },
        };

        return(
          <Authorized authority={pageAuthority.listUser} noMatch=''>
            <PageHeaderWrapper title="查询表格">
              <Card bordered={false}>
                <div className={styles.tableList}>
                  <div className={styles.tableListForm}>{this.renderForm()}</div>
                  <div className={styles.tableListOperator}>
                    <Authorized authority={pageAuthority.addUser} noMatch=''>
                      <Button icon="user-add" type="primary" onClick={()=>this.handleEditUser(0)}>{formatMessage({id:'button.add'})}</Button>
                    </Authorized>
                    {
                        selectedRowKeys.length>0 && (
                        <span>
                          <Authorized authority={pageAuthority.deleteUser} noMatch=''>
                            <Popconfirm title="确定要删除吗?" onConfirm={()=>this.deleteMulti()} okText="确定" cancelText="取消">
                              <Button icon="user-delete" type="danger">{formatMessage({id:'button.delete'})}</Button>
                            </Popconfirm>
                          </Authorized>
                          <Authorized authority={pageAuthority.deleteUser} noMatch=''>
                            <Popconfirm title="确定要重置密码吗?" onConfirm={()=>this.handleResetPwdMulti()} okText="确定" cancelText="取消">
                              <Button icon="setting" type="primary">{formatMessage({id:'button.reset_pwd'})}</Button>
                            </Popconfirm>
                          </Authorized>
                        </span>
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
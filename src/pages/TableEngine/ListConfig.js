/* eslint-disable react/destructuring-assignment,react/no-access-state-in-setstate,no-unused-vars,import/no-named-as-default,import/no-named-as-default-member */
import React, { PureComponent,Fragment } from 'react';
import { connect } from 'dva/index';
import {
  Card,
  Form,
  Icon,
  Button,
  Dropdown,
  Table,
  Menu,
  Divider,
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../List/TableList.less';
import ListConfigForm from './ListConfigForm';

export default
@connect(({ tbConfig, loading }) => ({
  tbConfig,
  loading: loading.models.tbConfig,
}))
@Form.create()
class ListConfig extends  PureComponent{
  constructor(props){
    super(props);
    this.state={
      selectedRowKeys:[],
      modal:{
        visible:false,
        content:'',
      }
    }
  }

  // 表格checkbox选择事件
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  renderSimpleForm=(config)=>{
    console.info(config);
  }

  handleShowModal=()=>{
    this.setState({
      modal:{
        visible:true,
        content:(
          <ListConfigForm visible modalWidth='60%' formName="company" onCancel={()=>{ this.setState({modal:{visible:false,content:''}}) }} />
        )
      }
    })
  }

  render(){
    const { loading } = this.props;
    const { selectedRowKeys } = this.state;

    const data={
      list:[
        {
          key:'1',
          title:'用户管理',
          code:'user_management',
          desc:'用户描述'
        },
        {
          key:'2',
          title:'部门管理',
          code:'dept_management',
          desc:'部门描述'
        }
      ],
    };
    const columns=[
      {
        title: '标题',
        dataIndex: 'title',
      },
      {
        title: '编码',
        dataIndex: 'code',
      },
      {
        title: '描述',
        dataIndex: 'desc',
      },
      {
        title: '操作',
        width:200,
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.handleUpdateModalVisible(true, record)}>配置</a>
            <Divider type="vertical" />
            <a href="">订阅警报</a>
          </Fragment>
        ),
      },
    ];

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return(
      <PageHeaderWrapper title="业务配置">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm({})}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={this.handleShowModal}>
                新建
              </Button>
              {selectedRowKeys.length > 0 && (
                <span>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <Table
              loading={loading}
              dataSource={data.list}
              columns={columns}
              pagination={data.pagination}
              rowSelection={rowSelection}
              size='middle'
              onChange={this.handleTableChange}
            />
          </div>
        </Card>
        {
          this.state.modal.visible &&(
            this.state.modal.content
          )
        }
      </PageHeaderWrapper>
    )
  }
}

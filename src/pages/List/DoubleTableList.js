/* eslint-disable import/named,import/no-named-as-default,import/no-named-as-default-member */
import React, { PureComponent } from 'react';
import { connect } from 'dva/index';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
} from 'antd';
import DoubleTable from '../../components/DoubleTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './TableList.less';

const FormItem = Form.Item;
const { Option } = Select;

export default
@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
class TableList extends PureComponent{

  state={
    selectedRowKeysOne:[],
    selectedRowKeysTwo:[],
    totalAmountOne:0,
    totalAmountTwo:0,
  }

  onSelectChangeOne=(selectedRowKeys,selectedRows)=>{
    let total = 0;
    selectedRows.forEach(item=>{
      total+=item.amount;
    })
    this.setState({
      selectedRowKeysOne:selectedRowKeys,
      totalAmountOne:total,
    })
  }

  onSelectChangeTwo=(selectedRowKeys,selectedRows)=>{
    let total = 0;
    selectedRows.forEach(item=>{
      total+=item.amount;
    })
    this.setState({
      selectedRowKeysTwo:selectedRowKeys,
      totalAmountTwo:total,
    })
  }

  handleTableOneChange= (pagination, filtersArg, sorter) => {
    console.info('table1',pagination,filtersArg,sorter);
  };

  handleTableTwoChange= (pagination, filtersArg, sorter) => {
    console.info('table2',pagination,filtersArg,sorter);
  };

  renderForm=()=>{
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render(){
    const {selectedRowKeysOne,selectedRowKeysTwo,totalAmountOne,totalAmountTwo} = this.state;

    const rowSelectionOne = {
      selectedRowKeys:selectedRowKeysOne,
      onChange: this.onSelectChangeOne,
    };
    const rowSelectionTwo = {
      selectedRowKeys:selectedRowKeysTwo,
      onChange: this.onSelectChangeTwo,
    };

    const columnsOne=[
      {
        key:'LColumn1',
        title:'合同号',
        dataIndex:'LColumn1',
        width: 100,
        sorter:true,
      },
      {
        key:'LColumn5',
        title:'发票号',
        dataIndex:'LColumn5',
        width: 100,
        sorter:true,
      },
      {
        key:'LColumn2',
        title:'品牌',
        dataIndex:'LColumn2',
        width: 100,
        filters: [{
          text: 'London',
          value: 'London',
        }, {
          text: 'New York',
          value: 'New York',
        }],
        sorter:true,
      },
      {
        key:'amount',
        title:'金额',
        dataIndex:'amount',
        width: 100,
      },
      {
        key:'LColumn4',
        title:'日期',
        dataIndex:'LColumn4'
      },
    ];
    const columnsTwo=[
      {
        key:'RColumn1',
        title:'客户名称',
        dataIndex:'RColumn1',
        width: 100,
        sorter:true,
      },
      {
        key:'amount',
        title:'金额',
        dataIndex:'amount',
        width: 100,
        filters: [{
          text: 'London',
          value: 'London',
        }, {
          text: 'New York',
          value: 'New York',
        }],
      },
      {
        key:'RColumn3',
        title:'日期',
        dataIndex:'RColumn3',
        width: 100,
      },
      {
        key:'RColumn4',
        title:'备注',
        dataIndex:'RColumn4'
      },
    ];

    const dataOne=[
      {
        key:1,
        LColumn1:'1111',
        LColumn2:'1111',
        amount:500,
        LColumn4:'1111',
      },
      {
        key:2,
        LColumn1:'2222',
        LColumn2:'2222',
        amount:2000,
        LColumn4:'2222',
      },
    ];
    const dataTwo=[
      {
        key:1,
        RColumn1:'1111',
        amount:200,
        RColumn3:'1111',
        RColumn4:'1111',
      },
      {
        key:2,
        RColumn1:'2222',
        amount:300,
        RColumn3:'2222',
        RColumn4:'2222',
      },
    ];


    return (
      <PageHeaderWrapper title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => console.info('新建')}>
                新建
              </Button>
            </div>
            <DoubleTable columnsOne={columnsOne} columnsTwo={columnsTwo} dataOne={dataOne} dataTwo={dataTwo} rowSelectionOne={rowSelectionOne} rowSelectionTwo={rowSelectionTwo} onChangeOne={this.handleTableOneChange} onChangeTwo={this.handleTableTwoChange} footerOne={()=><span>金额：{totalAmountOne}</span>} footerTwo={()=><span>金额：{totalAmountTwo}</span>} totalEqual={totalAmountOne!==0 && totalAmountOne===totalAmountTwo} />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

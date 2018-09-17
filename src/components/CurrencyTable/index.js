import React, { PureComponent ,Fragment} from 'react';
import { connect } from 'dva/index';
import { Row,
  Col,
  Card,
  Form,
  Icon,
  Button,
  Dropdown,
  Menu,
  Table,
  notification,
  Divider } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './index.less';
import FormBuild from '@/components/FormBuild';
import CurrencyButton from '@/components/CurrencyButton';
// import notices from '../../../mock/notices';

export default
@connect(({ formBuild }) => ({
  formBuild,
}))
@Form.create()
class CurrencyTable extends PureComponent{
  constructor(props){
    super();
    const { tbCode } = props;
    this.state = {
      tbCode,
      selectedRowKeys: [],
      pagination:{
        showSizeChanger:true,
      },
      modal:{
        visible:false,
        content:(<div>&nbsp;</div>),
      },
    };
  }

  // 列表数据
  loadPageSplit = (filter,page,sort)=> {
    const { loadPageSplit } = this.props;
    const { tbCode } = this.state;
    let params = {
      tbCode,
      filter:{...filter},
      sortField:sort.sortField || null,
      sortOrder:sort.sortOrder || null,
      pageIndex:page.current,
      pageSize:page.pageSize,
    }
    loadPageSplit(params)
  }

  // componentWillReceiveProps(nextProp){
  //   const { match:{params} } = nextProp;
  //   const { tbCode } = this.state;
  //   if (tbCode!==params.tbCode) {
  //     this.setState({
  //       tbCode:params.tbCode,
  //     },this.loadData);
  //   }
  // }

  // 表格上方下拉菜单点击事件
  handleTopMenuClick=(obj)=>{
    this.handleTopBtnClick({funCode:obj.key,key:'',source:'btn'});
  }

  // 表格checkbox选择事件
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  // 分页
  handleTableChange = (paginationarg, filters, sorter) => {
    const { form } = this.props;
    // const { pagination } = this.state;

    form.validateFields((err, fieldsValue) =>{
      if (err) return;

      const arrFv = {};
      Object.keys(fieldsValue).forEach(key=>{
        if (fieldsValue[key]!==null && fieldsValue[key]!=='') {
          arrFv[key] = fieldsValue[key];
        }
      });

      this.setState({
        pagination:paginationarg
      },()=>this.loadPageSplit({...filters,...arrFv},paginationarg,{sortField:sorter.field,sortOrder:sorter.order}));
    });
  }

  // 查询按钮
  handleSearch = e => {
    e.preventDefault();
    const { form } = this.props;
    const { pagination } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const arrFv = {};
      Object.keys(fieldsValue).forEach(key=>{
        if (fieldsValue[key]!==null && fieldsValue[key]!=='') {
          arrFv[key] = fieldsValue[key];
        }
      });

      this.loadPageSplit({...arrFv},{current:1,pageSize:pagination.pageSize},{});
    });
  };

  // 搜索表单
  renderSimpleForm(fieldConfig) {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {
            fieldConfig.map(item=>FormBuild(item,getFieldDecorator,true))
          }
          <Col md={6} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  openForm = (modal) => {
    this.setState({modal:modal})
  }

  closeForm = () => {
    this.setState({modal:{visible:false,content:''}})
  }

  // 页面渲染
  render(){
    const { loading,config,data,tbCode } = this.props;
    const { selectedRowKeys,pagination,modal } = this.state;

    const tableMethod = {
      loadPageSplit:this.loadPageSplit,
      loadData:this.loadData,
    }

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const page={
      ...pagination,
      ...data.pagination,
    }

    const columns =(config.columnConfig || []).map(item=>item);

    const currencyButton = {
      openForm:this.openForm,
      closeForm:this.closeForm,
      btnConfig:config.btnConfig,
      selectedRowKeys:selectedRowKeys,
      tbCode:tbCode,
    }

    return (
      <PageHeaderWrapper title="菜单配置">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm(config.searchConfig)}</div>
            <CurrencyButton {...currencyButton}/>
            <Table
              loading={loading}
              dataSource={data.list}
              columns={columns}
              pagination={page}
              rowSelection={rowSelection}
              size='middle'
              onChange={this.handleTableChange}
            />
          </div>
        </Card>
        {
          modal.visible &&(
            modal.content
          )
        }
      </PageHeaderWrapper>
    );
  }
}

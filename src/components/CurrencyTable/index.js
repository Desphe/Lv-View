import React, { PureComponent ,Fragment} from 'react';
import { connect } from 'dva/index';
import { Row,
  Col,
  Card,
  Form,
  Icon,
  Button,
  Table,
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './index.less';
import FormBuild from '@/components/FormBuild';
import CurrencyButton from '@/components/CurrencyButton';
import FormTemplate from '@/components/FormTemplate';
import EditTable from '@/components/EditTable';
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
      pagination:{
        showSizeChanger:true,
      },
      modal:{
        visible:false,
        arrKey:"",
        btnConfig:"",
      },
      expandForm: false,
    };
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

  handleThChange(sorter) {
    const { searchParams } = this.props;
    let params = searchParams;
    params["sortField"] = sorter.columnKey;
    params["sortOrder"] = sorter.order.substring(0,sorter.order.indexOf("end"));
    return params;
  }

  handlePageChange(paginationarg) {
    const { searchParams } = this.props;
    let params = searchParams;
    params["pageIndex"] = paginationarg.current;
    params["pageSize"] = paginationarg.pageSize;
    return params;
  }

  // 分页
  handleTableChange = (paginationarg, filters, sorter) => {
    const { form,loadPageSplit } = this.props;
    form.validateFields((err, fieldsValue) =>{
      if (err) return;
      let params = {};
      if(Object.keys(sorter).length != 0) {
        params = this.handleThChange(sorter);
      }else{
        params = this.handlePageChange(paginationarg)
      }
      loadPageSplit(params)
    });
  }

  // 查询按钮
  handleSearch = e => {
    e.preventDefault();
    const { form,loadPageSplit } = this.props;
    const { searchParams } = this.props;
    const { getFieldsValue } = form;
    let params = searchParams;
    for(var key in getFieldsValue()) {
      if(getFieldsValue()[key]) {
        params[key] = getFieldsValue()[key];
      }
    }
    params["pageIndex"] = 1;

    loadPageSplit(params)
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
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
            fieldConfig.map((item,i)=>{
              if(i<3) {
                return FormBuild(item,getFieldDecorator,true)
              }
            })
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

  renderAdvancedForm(fieldConfig) {
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
                收起 <Icon type="up" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm(fieldConfig) {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm(fieldConfig) : this.renderSimpleForm(fieldConfig);
  }

  openForm = (obj,arrKey) => {
    let modal = {
      visible:true,
      arrKey:arrKey,
      btnConfig:obj,
    };
    this.setState({modal:modal})
  }

  closeForm = () => {
    this.setState({modal:{visible:false,arrKey:"",btnConfig:""}})
  }

  // 页面渲染
  render(){
    const { table,loadFields,dataInfo,buttonFun,loading,tbCode,selectedRowKeys,onSelectChange } = this.props;
    const { config,list,title } = table;
    console.log(list)
    const { modal,pagination } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
    const page={
      ...pagination,
      ...list.pagination,
    }
    const tableMethod = {
      loading:loading,
      dataSource:list.data,
      columns:config.columnConfig,
      pagination:list.pagination?page:false,
      rowSelection:rowSelection,
      size:'middle',
      onChange:this.handleTableChange,
    };
    const currencyButton = {
      openForm:this.openForm,
      closeForm:this.closeForm,
      btnConfig:config.btnConfig,
      selectedRowKeys:selectedRowKeys,
      tbCode:tbCode,
      buttonFun:buttonFun,
    }
    let formMethod = {
      loadFields,
      ...modal,
      dataInfo,
      buttonFun,
    }
    return (
      <PageHeaderWrapper title={title}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{config.searchConfig?this.renderForm(config.searchConfig):""}</div>
            {config.btnConfig?<CurrencyButton {...currencyButton}/>:""}
              <Table {...tableMethod} rowKey="id"/>
          </div>
        </Card>
        {modal.visible && modal.btnConfig && <FormTemplate visible modalWidth='60%' {...formMethod} formName="company" onCancel={()=>{this.closeForm()} } />}
      </PageHeaderWrapper>
    );
  }
}

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
import styles from '../List/TableList.less';
import CurrencyTable from '@/components/CurrencyTable';
// import notices from '../../../mock/notices';

export default
@connect(({ tbBuild, loading,formBuild }) => ({
  tbBuild,
  formBuild,
  loading: loading.models.tbBuild,
}))
@Form.create()
class TableTemplate extends PureComponent{
  constructor(props){
    super();
    const { match:{params:{tbCode}} } = props;
    this.state = {
      tbCode,
    };
  }

  // 加载数据
  componentDidMount(){
    // 获取列表业务code
    this.loadData();
  }
  
  // 初始数据加载
  loadData=()=> {
    const { dispatch } = this.props;
    const { tbCode } = this.state;
    // console.info(tbCode);
    dispatch({
      type:'tbBuild/loadConfigData',
      payload:{tbCode},
    });
  }

  // 列表数据
  loadPageSplit = (params)=> {
    const { dispatch } = this.props;
    const { tbCode } = this.state;
    dispatch({
      type:'tbBuild/loadSplitData',
      payload:params
    });
  }

  componentWillReceiveProps(nextProp){
    const { match:{params} } = nextProp;
    const { tbCode } = this.state;
    if (tbCode!==params.tbCode) {
      this.setState({
        tbCode:params.tbCode,
      },this.loadData);
    }
  }

  // 页面渲染
  render(){
    const { loading,tbBuild:{config,data } } = this.props;
    console.log(this.props)

    const tableMethod = {
      loadPageSplit:this.loadPageSplit,
      config:config,
      data:data,
      loading:loading,
      tbCode:this.state.tbCode,
    }

    return (
      <CurrencyTable {...tableMethod} />
    );
  }
}

import React, { PureComponent ,Fragment} from 'react';
import { connect } from 'dva/index';
import styles from '../List/TableList.less';
import CurrencyTable from '@/components/CurrencyTable';
// import notices from '../../../mock/notices';

export default
@connect(({ system, loading }) => ({
  system,
  loading: loading.models.system,
}))
class FunModule extends PureComponent{
  constructor(props){
    super();
    const { match:{params:{tbCode}} } = props;
    this.state = {
      tbCode,
      searchParams: {
        sortField: "id",
        sortOrder: "desc",
        pageIndex: 10,
        pageSize: 0,
      },
      selectedRowKeys:[],
    };
  }

  // 加载数据
  componentDidMount(){
    // 获取列表业务code
    this.loadData();
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  cleanSelectedKeys = () => {
    this.onSelectChange([]);
  };
  
  // 初始数据加载
  loadData=()=> {
    const { dispatch,match:{path} } = this.props;
    const { tbCode } = this.state;
    dispatch({
      type:'system/loadConfigData',
      payload:{tbCode},
      path:path,
    });
  }

  // 列表数据
  loadPageSplit = (params)=> {
    const { dispatch } = this.props;
    const { tbCode } = this.state;
    dispatch({
      type:'system/loadSplitData',
      payload:params
    });
  }

  loadFields = (dKey,modalCode) => {
    const {tbCode,dispatch,match:{path}} = this.props;
    let params = {};
    dispatch({
      type:'system/loadInitFields',
      payload:params,
      path:`${path}/${modalCode}`,
    });
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

  // 页面渲染
  render(){
    const { loading,system } = this.props;
    const { searchParams,selectedRowKeys } = this.state;

    const tableMethod = {
      loadPageSplit:this.loadPageSplit,
      loadFields:this.loadFields,
      ...system,
      loading:loading,
      tbCode:this.state.tbCode,
      searchParams:searchParams,
      onSelectChange:this.onSelectChange,
      selectedRowKeys:selectedRowKeys,
    }

    return (
      <CurrencyTable {...tableMethod} />
    );
  }
}

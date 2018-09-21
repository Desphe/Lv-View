import React, { PureComponent ,Fragment} from 'react';
import { connect } from 'dva/index';
import styles from '../List/TableList.less';
import CurrencyTable from '@/components/CurrencyTable';
// import notices from '../../../mock/notices';

export default
@connect(({ funModule, loading }) => ({
  funModule,
  loading: loading.models.funModule,
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
    let params = {
      sortField: "id",
      sortOrder: "desc",
      pageIndex: 1,
      pageSize: 10
    }
    this.loadPageSplit(params);
  }

  // 列表数据
  loadPageSplit = (params)=> {
    const { dispatch } = this.props;
    const { tbCode } = this.state;
    dispatch({
      type:'funModule/loadSplitData',
      path:'LoadSplitData',
      payload:params
    });
    this.setState({searchParams:params})
  }

  loadFields = (params,modalCode) => {
    const {tbCode,dispatch,match:{path}} = this.props;
    dispatch({
      type:'funModule/loadInitFields',
      payload:params,
      path:`${modalCode}`,
    });
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  cleanSelectedKeys = () => {
    this.onSelectChange([]);
  };

  buttonFun = (params,funCode) => {
    const {tbCode,dispatch,match:{path}} = this.props;
    const { searchParams } = this.state;
    dispatch({
      type:'funModule/buttonFun',
      payload:params,
      path:`${funCode}`,
      callBackPayload:searchParams,
      callBackPath:'LoadSplitData',
    });
    this.cleanSelectedKeys();
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
    const { loading,funModule } = this.props;
    const { searchParams,selectedRowKeys } = this.state;

    const tableMethod = {
      loadPageSplit:this.loadPageSplit,
      loadFields:this.loadFields,
      buttonFun:this.buttonFun,
      loading:loading,
      tbCode:this.state.tbCode,
      ...funModule,
      searchParams:searchParams,
      onSelectChange:this.onSelectChange,
      selectedRowKeys:selectedRowKeys,
    }

    return (
      <CurrencyTable {...tableMethod} />
    );
  }
}

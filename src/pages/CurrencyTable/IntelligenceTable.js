import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Form,
} from 'antd';
import CurrencyTable from '@/components/CurrencyTable';
import styles from './IntelligenceTable.less';

/* eslint react/no-multi-comp:0 */
export default
@connect(({ intelligenceTable, loading }) => ({
  intelligenceTable,
  loading: loading.models.intelligenceTable,
}))
@Form.create()
class IntelligenceTable extends PureComponent {

  componentDidMount() {
    this.loadData()
  }

  loadData = (params) => {
    const { dispatch, location:{pathname} } = this.props;
    dispatch({
      type: 'intelligenceTable/fetch',
      path: pathname,
      payload: params,
    });
  }

  getInfomation = params => {
    const { dispatch, location:{pathname} } = this.props;
    dispatch({
      type: 'intelligenceTable/getInfo',
      payload: params,
      path: pathname,
    });
  }

  handleAdd = fields => {
    console.log(fields)
    const { dispatch, location:{pathname} } = this.props;
    dispatch({
      type: 'intelligenceTable/add',
      payload: fields,
      path: pathname,
    });
  };

  handleDelete = params => {
    const { dispatch, location:{pathname} } = this.props;
    dispatch({
      type: 'intelligenceTable/remove',
      payload: params,
      path: pathname,
    });
  }

  render() {
    const tableMethod = {
      getInfomation:this.getInfomation,
      handleAdd:this.handleAdd,
      handleDelete:this.handleDelete,
      loadData:this.loadData,
    }

    return (
      <CurrencyTable {...this.props} {...tableMethod}/>
    );
  }
}

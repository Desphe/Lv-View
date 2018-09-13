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
class CurrencyTable1 extends PureComponent {

  componentDidMount() {
    console.log(this.props)
    const { dispatch, route:{path} } = this.props;
    dispatch({
      type: 'intelligenceTable/fetch',
      path: path,
    });
  }

  getInfomation = params => {
    console.log(params)
    const { dispatch, route:{path} } = this.props;
    dispatch({
      type: 'intelligenceTable/getInfo',
      payload: params,
      path: path,
    });
  }

  handleAdd = fields => {
    const { dispatch, route:{path} } = this.props;
    dispatch({
      type: 'intelligenceTable/add',
      payload: {
        desc: fields.desc,
      },
      path: path,
    });
  };

  handleDelete = params => {
    const { dispatch, route:{path} } = this.props;
    dispatch({
      type: 'intelligenceTable/remove',
      payload: params,
      path: path,
    });
  }

  render() {
    const tableMethod = {
      getInfomation:this.getInfomation,
      handleAdd:this.handleAdd,
      handleDelete:this.handleDelete,
    }

    return (
      <CurrencyTable {...this.props} {...tableMethod}/>
    );
  }
}

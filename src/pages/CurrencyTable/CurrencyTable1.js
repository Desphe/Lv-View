import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Form,
} from 'antd';
import CurrencyTable from '@/components/CurrencyTable';
import styles from './CurrencyTable1.less';

/* eslint react/no-multi-comp:0 */
export default
@connect(({ currencyTable1, loading }) => ({
  currencyTable1,
  loading: loading.models.currencyTable1,
}))
@Form.create()
class CurrencyTable1 extends PureComponent {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'currencyTable1/fetch',
    });
  }

  getInfomation = params => {
    console.log(params)
    const { dispatch } = this.props;
    dispatch({
      type: 'currencyTable1/getInfo',
      payload: params,
    });
  }

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'currencyTable1/add',
      payload: {
        desc: fields.desc,
      },
    });
  };

  render() {
    const tableMethod = {
      getInfomation:this.getInfomation,
      handleAdd:this.handleAdd,
    }

    return (
      <CurrencyTable {...this.props} {...tableMethod}/>
    );
  }
}

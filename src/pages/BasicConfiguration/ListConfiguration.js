import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Form,
} from 'antd';
import CurrencyTable from '@/components/CurrencyTable';

/* eslint react/no-multi-comp:0 */
export default
@connect(({ listConfiguration, loading }) => ({
  listConfiguration,
  loading: loading.models.listConfiguration,
}))
@Form.create()
class ListConfiguration extends PureComponent {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'listConfiguration/fetch',
    });
  }

  getInfomation = params => {
    const { dispatch } = this.props;
    dispatch({
      type: 'listConfiguration/getInfo',
      payload: params,
    });
  }

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'listConfiguration/add',
      payload: {
        desc: fields.desc,
      },
    });
  };

  handleDelete = params => {
    const { dispatch } = this.props;
    dispatch({
      type: 'listConfiguration/remove',
      payload: params,
    });
  }

  render() {
    const tableMethod = {
      getInfomation:this.getInfomation,
      handleAdd:this.handleAdd,
      handleDelete:this.handleDelete,
      title:name,
    }

    return (
      <CurrencyTable {...this.props} {...tableMethod}/>
    );
  }
}

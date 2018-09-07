import React, { PureComponent } from 'react';
import { Table } from 'antd';

class ViewTable extends PureComponent {

  cols = [{
    title: '表头字段',
    dataIndex: 'name',
  }];

  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
    }
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys,selectedRows });
  };

  render() {
    const { columns,rows } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
    };
    return (
      <Table
        dataSource={rows}
        columns={columns}
        pagination={false}
        scroll = {{y:400}}
        rowSelection={rowSelection}
      />
    )
  }
}

export default ViewTable;
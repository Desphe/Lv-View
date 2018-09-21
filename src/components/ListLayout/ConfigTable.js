import React, { PureComponent } from 'react';
import { Table} from 'antd';

export default class ConfigTable extends PureComponent{

    // 表格改变事件
    handleTableChange = (pagination, filter, sorter) => {
        const {onChange} = this.props;
        onChange(pagination.pageSize,
            {
                pageIndex: pagination.current,
                pageSize: pagination.pageSize,
                sortField: sorter.field,
                sortOrder: sorter.order,
                filter: {
                    ...filter,
                }
            }
        );
    }

    // 选择行CheckBox
    handleSelectRows = (selectedRowKeys) => {
        const {onSelectRows} = this.props;
        onSelectRows(selectedRowKeys);
    };

    render(){
        const { loading, columns,data,pagination,selectedRowKeys } = this.props;
        // 特殊表格配置
        const tbConfig = {
            loading,
            bordered: false,
            size: 'middle',
            showHeader: true,
            footer: null,
            rowSelection: {
                selectedRowKeys,
                onChange: this.handleSelectRows,
            },
        };

        return (
          <Table rowKey='id' {...tbConfig} columns={columns} pagination={pagination} dataSource={data} onChange={this.handleTableChange} />
        );
    }

}
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
    Card,
    Form,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ListTemplate.less';
import BtnGroup from '@/components/ListLayout/BtnGroup';
import SearchForm from '@/components/ListLayout/SearchForm';
import ConfigTable from '@/components/ListLayout/ConfigTable';

export default 
@connect(({ tbBuild, loading }) => ({
    tbBuild,
    loading: loading.models.tbBuild
}))
@Form.create()
class ListTemplate extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            formValues: {},
            defaultPageSize: 10,
            selectedRowKeys: [],
            modal: {
                visible: false,
                content: <div />
            }
        }
    }

    componentDidMount() {
        const { bCode } = this.props;
        this.loadSplitData({ bCode,pageIndex: 1, pageSize: 10 });
    }

    // 查询
    handleSearch = e => {
        const { bCode } = this.props;
        const { defaultPageSize } = this.state;
        this.setState({
            formValues: e
        }, () => this.loadSplitData({
            bCode,
            pageIndex: 1,
            pageSize: defaultPageSize,
            filter: { ...e }
        }));
    };

    // 表格改变事件
    handleTableChange = (pageSize, values) => {
        const { bCode } = this.props;
        const { formValues } = this.state;

        this.setState({
            defaultPageSize: pageSize
        }, () => this.loadSplitData({
            bCode,
            ...values,
            filter: {
                ...values.filter,
                ...formValues
            }
        }));
    }

    // 加载数据
    loadSplitData = (params) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'tbBuild/loadConfigData',
            payload: params,
        });
    }

    // 选择行CheckBox
    handleSelectRows = (selectedRowKeys) => {
        this.setState({
            selectedRowKeys,
        });
    };

    // 按钮事件
    btnGroupClick = (funCode) => {
        const { btnClick } = this.props;
        const { selectedRowKeys } = this.state;

        if(funCode==='add'){
            console.info(funCode)
        }else if(funCode==='edit'){
            console.info(funCode)
        }else{
            console.info('调用父级组件事件');
        }
        btnClick(selectedRowKeys);
    }

    render() {
        const { loading, tbBuild: { config, data } } = this.props;
        const { selectedRowKeys, modal } = this.state;

        return (
          <PageHeaderWrapper title="查询表格">
            <Card bordered={false}>
              <div className={styles.tableList}>
                {
                    config.searchConfig.length > 0 && <SearchForm fields={config.searchConfig} handleSearch={this.handleSearch} />
                }
                <BtnGroup buildType={1} btnConfig={config.btnConfig} selectedRowKeys={selectedRowKeys} onClick={this.btnGroupClick} />
                <ConfigTable loading={loading} columns={this.columns} pagination={data.pagination} data={data.list} onChange={this.handleTableChange} onSelectRows={this.handleSelectRows} selectedRowKeys={selectedRowKeys} />
              </div>
            </Card>
            {
                modal.visible && modal.content
            }
          </PageHeaderWrapper>
        )
    }
}
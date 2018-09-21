import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
    Card,
    Form,
    Button,
    Table,
    Row,
    Col,
    Input,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import RenderAuthorized from '../../components/Authorized';
import styles from '../List/TableList.less';
import BtnGroup from '@/components/ListLayout/BtnGroup';
import SearchForm from '@/components/ListLayout/SearchForm';
import ConfigTable from '@/components/ListLayout/ConfigTable';

const Authorized = RenderAuthorized('');

/* 页面权限定义 */
const pageAuthority = {
    listRole: undefined,
    addRole: undefined,
    editRole: undefined,
    deleteRole: undefined,
}

export default
@connect(({ sysRole, loading }) => ({
    sysRole,
    loading: loading.models.sysRole
}))
@Form.create()
class TableManage extends PureComponent {
    
    // 菜单按钮
    btnM=[
        {
            authority:'',
            btn_name:'删除',
            funCode:'delete'
        },
        {
            authority:'',
            btn_name:'密码重置',
            funCode:'reset',
            isconfirm:true,
            confirm:{
                title:'确定需要编辑么？'
            }
        }
    ];

    // 独立按钮
    btnS=[
        {
            authority:'',
            btn_name:'新增',
            funCode:'add'
        },
        {
            authority:'',
            btn_name:'编辑',
            funCode:'edit',
            isconfirm:true,
            confirm:{
                title:'确定需要编辑么？'
            }
        }
    ];

    // 列定义
    columns = [
        {
            title: '编号',
            dataIndex: 'id',
            width: 60
        },
        {
            title: '角色名称',
            dataIndex: 'role_name',
            width: 100
        },

        {
            title: '简介',
            dataIndex: 'description',
        },
    ];

    // 筛选表单
    searchFields=[
        {
            type:'text',
            label:'姓名',
            field:'name',
            row:'half',
            required:false,
            errorMessage:'请输入姓名'
        },
        {
            type:'int',
            label:'年龄',
            field:'age',
            row:'half',
            required:false,
            errorMessage:'请输入年龄'
        },
        {
            type:'radio',
            label:'性别',
            field:'sex',
            row:'half',
            required:false,
            errorMessage:'请输入姓名',
            options:[{value:'1',text:'男'},{value:'0',text:'女'}],
            initValue:'1'
        }
    ];

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
        this.loadSplitData({ pageIndex: 1, pageSize: 10 });
    }

    // 查询
    handleSearch = e => {
        const { defaultPageSize } = this.state;
        this.setState({
            formValues:e
        },()=>this.loadSplitData({
            pageIndex:1,
            pageSize:defaultPageSize,
            filter:{...e}
        }));
    };

    // 表格改变事件
    handleTableChange = (pageSize,values) => {
        const { formValues } = this.state;
        
        this.setState({
            defaultPageSize:pageSize
        },()=>this.loadSplitData({
            ...values,
            filter:{
                ...values.filter,
                ...formValues
            }
        }));
    }

    // 加载数据
    loadSplitData = (params) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'sysRole/loadSplitData',
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
    btnGroupClick=(funCode)=>{
        console.info(funCode);
    }

    render() {
        const { loading, sysRole: { list, pagination } } = this.props;
        const { selectedRowKeys, modal } = this.state;

        return (
          <Authorized authority={pageAuthority.listUser} noMatch=''>
            <PageHeaderWrapper title="查询表格">
              <Card bordered={false}>
                <div className={styles.tableList}>
                  {
                      this.searchFields.length>0 && <SearchForm fields={this.searchFields} handleSearch={this.handleSearch} />
                  }
                  <BtnGroup buildType={1} btnS={this.btnS} btnM={this.btnM} selectedRowKeys={selectedRowKeys} onClick={this.btnGroupClick} />
                  <ConfigTable loading={loading} columns={this.columns} pagination={pagination} data={list} onChange={this.handleTableChange} onSelectRows={this.handleSelectRows} selectedRowKeys={selectedRowKeys} />
                </div>
              </Card>
            </PageHeaderWrapper>
            {
                modal.visible && modal.content
            }
          </Authorized>
        )
    }
}
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
    Card,
    Form,
    notification,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import RenderAuthorized from '../../components/Authorized';
import styles from '../List/TableList.less';
import BtnGroup from '@/components/ListLayout/BtnGroup';
import SearchForm from '@/components/ListLayout/SearchForm';
import ConfigTable from '@/components/ListLayout/ConfigTable';
import LanguageEditForm from './LanguageEditForm';

const Authorized = RenderAuthorized('');

/* 页面权限定义 */
const pageAuthority = {
    listRole: undefined,
    addRole: undefined,
    editRole: undefined,
    deleteRole: undefined,
}

export default
@connect(({ sysLang, loading }) => ({
    sysLang,
    loading: loading.models.sysLang
}))
@Form.create()
class LanguageManage extends PureComponent {

    // 独立按钮
    btnS=[
        {
            authority:'',
            btn_name:'新增',
            funCode:'add',
            showType:0
        },
        {
            authority:'',
            btn_name:'编辑',
            funCode:'edit',
            showType:0
        }
    ];

    // 筛选表单
    searchFields=[
        {
            type:'text',
            label:'关键字查询',
            field:'keyword',
            row:'half',
            required:false,
            errorMessage:'请输入索引或内容'
        },
    ];

    constructor(props) {
        super(props);
        this.state = {
            flag:false,
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
        const { dispatch } = this.props;
        dispatch({
            type: 'sysLang/loadConfig',
            payload: { pageIndex: 1, pageSize: 10 },
        });
    }

    // 查询
    handleSearch = e => {
        const { defaultPageSize,flag } = this.state;
        this.setState({
            flag:!flag,
            formValues:e
        },()=>this.loadSplitData({
            pageIndex:1,
            pageSize:defaultPageSize,
            ...e
        }));
    };

    // 表格改变事件
    handleTableChange = (pageSize,values) => {
        const { formValues } = this.state;
        
        this.setState({
            defaultPageSize:pageSize
        },()=>this.loadSplitData({
            ...values,
            ...values.filter,
            ...formValues
        }));
    }

    // 加载数据
    loadSplitData = (params) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'sysLang/loadSplitData',
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
        if(funCode==='add'){
            this.setState({
                modal:{
                    visible:true,
                    content:<LanguageEditForm visible onCancel={()=>this.setState({modal:{visible:false}})} />
                }
            })
        }else if(funCode==='edit'){
            const { selectedRowKeys } = this.state;
            console.info('selectedRowKeys',selectedRowKeys);
            if(selectedRowKeys.length===1){
                this.setState({
                    modal:{
                        visible:true,
                        content:<LanguageEditForm code={selectedRowKeys[0]} visible onOk={this.btnGroupClick} onCancel={()=>this.setState({modal:{visible:false}})} />
                    }
                })
            }else{
                notification.warning({
                    message:'提示',
                    description:'请选择一条记录'
                });
            }
        }else if(funCode==='refresh'){
            this.setState({
                modal:{
                    visible:false
                }
            },()=>this.handleSearch({}))    ;
        }
    }

    render() {
        const { loading, sysLang: { columns,data:{list, pagination}  } } = this.props;
        const { selectedRowKeys, modal } = this.state;

        return (
          <Authorized authority={pageAuthority.listUser} noMatch=''>
            <PageHeaderWrapper title="查询表格">
              <Card bordered={false}>
                <div className={styles.tableList}>
                  {
                      this.searchFields.length>0 && <SearchForm fields={this.searchFields} handleSearch={this.handleSearch} />
                  }
                  <BtnGroup buildType={1} btnConfig={this.btnS} selectedRowKeys={selectedRowKeys} onClick={this.btnGroupClick} />
                  <ConfigTable loading={loading} columns={columns} pagination={pagination} data={list} onChange={this.handleTableChange} onSelectRows={this.handleSelectRows} selectedRowKeys={selectedRowKeys} />
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
import { stringify } from 'qs';
import request from '@/utils/request';
import apiUrl from '@/utils/apiUrl';

export async function loadSplitData(params){
    console.info('加载语言数据参数：',params);

    /* return {
        code:200,
        result:{
            data:[
                {
                    key:1,
                    code:'add',
                    zh_cn:'新增',
                    en:'New'
                },
                {
                    key:2,
                    code:'edit',
                    zh_cn:'编辑',
                    en:'Edit'
                },
            ],
            pagination:{current:1,pageSize:10,total:100}
        }
    } */


    return request(apiUrl.systemManage.loadLanguageSplitData,{
        method: 'POST',
        body: params,
    });
}

// 获取用户角色
export async function loadColumnsConfig(){
    console.info('获取语言列');
    /* return {
        code:200,
        result:[
            {
                key:'code',
                dataIndex:'code',
                title:'索引'
            },
            {
                key:'zh_cn',
                dataIndex:'zh_cn',
                title:'中文'
            },
            {
                key:'en',
                dataIndex:'en',
                title:'英文'
            }
        ]
    } */
    return request(`${apiUrl.systemManage.getLanguageColumnsConfig}`);
}

export async function loadDetail(params){
    console.info('加载语言详情参数：',params);
    /* return {
        code:200,
        result:{
            id:1,
            code:'add',
            lang_values:{'zh_cn':'新增','en':'New'}
        }
    } */
    return request(`${apiUrl.systemManage.loadLanguageDetail}?${stringify(params)}`);
}

export async function editDetail(params){
    console.info('加载语言详情参数：',params);
    /* return {
        code:200,
        message:''
    } */
    
    return request(apiUrl.systemManage.editLanguage,{
        method: 'POST',
        body: params,
    });
}


export async function loadLanguageList(){
    console.info('加载语言列表：');
    return request(`${apiUrl.systemManage.loadLanguageList}`);
}

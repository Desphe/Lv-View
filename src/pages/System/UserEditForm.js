import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Select,
  Input,
  Modal,
  Tabs,
  Transfer,
  Radio,
  InputNumber,
} from 'antd';
import { formatMessage } from 'umi/locale';
import { formatString } from '../../utils/utils';

const FormItem = Form.Item;
const {TabPane} = Tabs;
const { Option } = Select;

export default
@connect(({ sysUser, loading }) => ({
    sysUser,
    loading: loading.models.sysUser
}))
@Form.create()
class UserEditForm extends PureComponent{

    constructor(props){
        super(props);
        this.state={
            
        }
    }

    componentDidMount(){
        const { dataid,dispatch } = this.props;
        dispatch({
          type:'sysUser/loadRoleData',
        })
        if(dataid) {
          dispatch({
            type:'sysUser/LoadUserData',
            payload:{id:dataid}
          })
        }
    }

    // 保存
    handleOk=(e)=>{
        const { form:{validateFieldsAndScroll},sysUser:{role},dispatch,dataid } = this.props;
        e.preventDefault();
        validateFieldsAndScroll((err, values) => {
            if (!err) {
                const temp = {
                    ...values,
                    id:dataid,
                    roleid:role.targets
                }
                dispatch({
                    type:'sysUser/editUserData',
                    payload:temp
                })
            }
        });
    }

    filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1;

    handleChange = (targetKeys) => {
        const { dispatch } = this.props;
        dispatch({
          type:'sysUser/changeRoleTransfer',
          payload:targetKeys,
        })
    }

    render(){
        const { form:{getFieldDecorator},dataid,visible,onCancel,sysUser:{formValues,role,dept} } = this.props;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 7 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 12 },
              md: { span: 10 },
            },
            style:{marginBottom:5}
        };

        const deptOptions=dept.map(item=><Option key={item.key}>{item.title}</Option>);
        console.log(role)
        if(Object.keys(formValues).length>0) {
          return (
            <Modal
              visible={visible}
              onOk={this.handleOk}
              onCancel={onCancel}
            >
              <Tabs defaultActiveKey="1">
                <TabPane tab={formatMessage({id:'app.user.userinfo'})} key="1">
                  <Form>
                    <FormItem {...formItemLayout} label={formatMessage({id:'app.user.account'})}>
                      {getFieldDecorator('loginName', {
                          initialValue:formValues.loginName,
                          rules: [
                              {
                              required: true,
                              message: formatString(formatMessage({id:'comm.no_empty'}),formatMessage({id:'app.user.account'})),
                              },
                          ],
                          })(<Input placeholder={formatString(formatMessage({id:'comm.please_input'}),formatMessage({id:'app.user.account'}))} disabled={(dataid!==undefined && dataid>0)} />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label={formatMessage({id:'app.user.user_name'})}>
                      {getFieldDecorator('userName', {
                          initialValue:formValues.userName,
                          rules: [
                              {
                              required: true,
                              message: formatString(formatMessage({id:'comm.no_empty'}),formatMessage({id:'app.user.user_name'})),
                              },
                          ],
                          })(<Input placeholder={formatString(formatMessage({id:'comm.please_input'}),formatMessage({id:'app.user.user_name'}))} />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label={formatMessage({id:'comm.email'})}>
                      {getFieldDecorator('email', {
                          initialValue:formValues.email,
                          })(<Input placeholder={formatString(formatMessage({id:'comm.please_input'}),formatMessage({id:'comm.email'}))} />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label={formatMessage({id:'comm.mobile'})}>
                      {getFieldDecorator('phone', {
                          initialValue:formValues.phone,
                          })(<Input placeholder={formatString(formatMessage({id:'comm.please_input'}),formatMessage({id:'comm.mobile'}))} />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label={formatMessage({id:'comm.state'})}>
                      <div>
                        {getFieldDecorator('state', {
                              initialValue:(''+formValues.state) || '1',
                          })(
                            <Radio.Group>
                              <Radio value="1">{formatMessage({id:'button.enable'})}</Radio>
                              <Radio value="0">{formatMessage({id:'button.disable'})}</Radio>
                            </Radio.Group>
                          )}
                      </div>
                    </FormItem>
                    <FormItem {...formItemLayout} label={formatMessage({id:'comm.sort'})}>
                      {getFieldDecorator('sort', {
                          initialValue:formValues.sort || '0',
                          })(<InputNumber placeholder={formatString(formatMessage({id:'comm.please_input'}),formatMessage({id:'comm.sort'}))} />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="所属部门">
                      {getFieldDecorator('dept_id',{
                          initialValue:formValues.dept_id,
                          })(
                            <Select placeholder="所属部门" showSearch>
                              {deptOptions}
                            </Select>
                          )}
                    </FormItem>
                  </Form>
                </TabPane>
                <TabPane tab="角色" key="2">
                  <Transfer
                    dataSource={role.list||[]}
                    listStyle={{
                          width:'45%',
                          height: 300,
                      }}
                    showSearch
                    titles={['未选角色','已选角色']}
                    targetKeys={role.targets||[]}
                    render={item => item.title}
                    filterOption={this.filterOption}
                    onChange={this.handleChange}
                  />
                </TabPane>
              </Tabs>
            </Modal>
          )
        }else{
          return<div></div>
        }
    }
}
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
    Form,
    Select,
    Input,
    Modal,
} from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

export default
@connect(({ sysLang, loading }) => ({
    sysLang,
    loading: loading.models.sysLang
}))
@Form.create()
class LanguageEditForm extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        const { code, dispatch } = this.props;
        dispatch({
            type: 'sysLang/loadDetail',
            payload: { code:code || '' }
        })
    }

    // 保存
    handleOk = (e) => {
        const { form: { validateFieldsAndScroll }, dispatch, dataid,onOk } = this.props;
        e.preventDefault();
        validateFieldsAndScroll((err, values) => {
            if (!err) {
                const temp = {
                    ...values,
                    id: dataid
                }
                dispatch({
                    type: 'sysLang/editData',
                    payload: temp
                }).then(()=>onOk('refresh'));
            }
        });
    }

    handleChange=(value)=>{
        const { dispatch } = this.props;
        dispatch({
            type:'sysLang/changeLanguage',
            payload:value
        })
    }

    render() {
        const { form: { getFieldDecorator }, code, visible, onCancel, sysLang: { formValues,language } } = this.props;
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
            style: { marginBottom: 5 }
        };

        const langOptions = language.map(item => <Option key={item.key}>{item.title}</Option>);

        return (
          <Modal
            visible={visible}
            onOk={this.handleOk}
            onCancel={onCancel}
          >
            <Form>
              <FormItem {...formItemLayout} label='索引值'>
                {getFieldDecorator('code', {
                    initialValue: formValues.code,
                    rules: [
                        {
                            required: true,
                            message: '请输入索引值',
                        },
                    ],
                })(<Input placeholder='请输入索引值' disabled={(code !== undefined)} />)}        
              </FormItem>
              <FormItem {...formItemLayout} label="选择语言">
                {getFieldDecorator('language', {
                    initialValue: formValues.language,
                    })(
                      <Select placeholder="选择语言" showSearch onSelect={this.handleChange}>
                        {langOptions}
                      </Select>
                    )}    
              </FormItem>
              <FormItem {...formItemLayout} label='值'>
                {getFieldDecorator('value', {
                    initialValue: formValues.value,
                    rules: [
                        {
                            required: true,
                            message: '请输入对应值',
                        },
                    ],
                })(<Input placeholder='请输入对应值' />)}        
              </FormItem>
            </Form>
          </Modal>
        )
    }
}
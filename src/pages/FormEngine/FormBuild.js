import React from 'react';
import {
  Form,
  Col,
  Input,
  DatePicker,
  Select,
  Checkbox,
  InputNumber,
  Radio,
  // AutoComplete,
  Cascader,
} from 'antd';
import moment from 'moment';
import EAutoComplete from '../../elements/EAutoComplete';

const { Option } = Select;
const { TextArea } = Input;
const { MonthPicker, RangePicker } = DatePicker;

const halfItemLayout = {
  xs:{span:20},
  sm:{ span:20 },
  md:{span:10},
  lg:{span:10},
  xl:{span:10},
  xxl:{span:10},
  // span:12
};
const rowItemLayout={
  span:22,
}

// 表单布局配置，一种是新增编辑表单，一种是查询表单
const halfSearchItemLayout = {
  xs:{span:24},
  sm:{ span:24 },
  md:{span:12},
  lg:{span:6},
  xl:{span:6},
  xxl:{span:6},
}
const rowSearchItemLayout = {
  span:24,
}

function BuildItem(config,getFieldDecorator,formItemLayout,dom,newdata) {
  return(
    <Col key={`col_${config.field}`} {...formItemLayout}>
      <Form.Item label={config.label}>
        {getFieldDecorator(config.field, {
          rules: [{ required: !!config.required, message: config.errorMessage }],
          initialValue: newdata[config.field] || config.initValue,
        })(dom)}
      </Form.Item>
    </Col>
  )
}

// 自动筛选不为空检测
function checkAutoComplete(rule, value, callback) {
  if (rule.required && (!value.flag || (value.key==='' || value.key===undefined))) {
    callback(rule.message);
    return;
  }
  callback();
}
// CheckBox 不为空检测
function checkCheckBox(rule, value, callback) {
  if (!Array.isArray(value) || (rule.required && ( value.length===0 || (value.length===1 && value[0]==='')))) {
    callback(rule.message);
    return;
  }
  callback();
}
// 创建表单,isSearchForm 是否是查询表单
export default function FormBuild(config,getFieldDecorator,isSearchForm,data) {
  const newdata = data ||{};
  let formItemLayout = config.row==='half'?halfItemLayout:rowItemLayout;
  if (isSearchForm) {formItemLayout = config.row==='half'?halfSearchItemLayout:rowSearchItemLayout}
  switch (config.type){
    case 'empty':{
      return (
        <Col key={`col_${config.field}`} {...formItemLayout} />
      );
    }
    case 'int':{
      const op={};
      if (typeof config.min ==='number') {
        op.min = config.min;
      }
      if (typeof config.max ==='number') {
        op.max = config.max;
      }
      return (
        BuildItem(config,getFieldDecorator,formItemLayout,<InputNumber {...op} placeholder={config.errorMessage} disabled={config.disabled} style={{ width: '100%' }} />,newdata)
        /* <Col key={`col_${config.field}`} {...formItemLayout}>
          <Form.Item label={config.label}>
            {getFieldDecorator(config.field, {
              rules: [{ required: !!config.required, message: config.errorMessage }],
              initialValue: newdata[config.field],// config.value,
            })(<InputNumber {...op} placeholder={config.errorMessage} disabled={config.disabled} style={{ width: '100%' }} />)}
          </Form.Item>
        </Col> */
      );
    }
    case 'date':{
      const mode = config.mode ||'date';
      let defaultValue;
      let warp;
      if (mode==='time'){
        const format=config.format || 'YYYY-MM-DD HH:mm:ss';
        defaultValue=newdata[config.field]==='' || newdata[config.field]===undefined ? undefined:moment(newdata[config.field],config.format)
        warp=<DatePicker showTime format={format} placeholder={config.errorMessage} disabled={config.disabled} style={{ width: '100%' }} />
      }
      else if (mode==='date'){
        const format=config.format || 'YYYY-MM-DD';
        defaultValue=newdata[config.field]==='' || newdata[config.field]===undefined ? undefined:moment(newdata[config.field],config.format)
        warp=<DatePicker format={format} placeholder={config.errorMessage} disabled={config.disabled} style={{ width: '100%' }} />
      }
      else if (mode==='month'){
        const format=config.format || 'YYYY-MM';
        defaultValue=newdata[config.field]==='' || newdata[config.field]===undefined ? undefined:moment(newdata[config.field],config.format)
        warp=<MonthPicker format={format} placeholder={config.errorMessage} style={{ width: '100%' }} />
      }
      else if (mode==='year'){
        const format='YYYY';
        defaultValue=newdata[config.field]==='' || newdata[config.field]===undefined ? undefined:moment(newdata[config.field],config.format)
        warp=<DatePicker mode='year' format={format} placeholder={config.errorMessage} disabled={config.disabled} style={{ width: '100%' }} />
      }
      else if (mode==='range'){
        const format=config.format || 'YYYY-MM-DD HH:mm:ss';
        if (newdata[config.field]!=='' && newdata[config.field]!==undefined){
          defaultValue = newdata[config.field].split(',').map(t=>moment(t,format))
        }
        warp=<RangePicker showTime format={format} disabled={config.disabled} style={{ width: '100%' }} />
      }else{
        const format='YYYY-MM-DD';
        defaultValue=newdata[config.field]==='' || newdata[config.field]===undefined ? undefined:moment(newdata[config.field],config.format)
        warp=<DatePicker format={format} placeholder={config.errorMessage} disabled={config.disabled} style={{ width: '100%' }} />
      }
      defaultValue = defaultValue || (config.initValue?moment(config.initValue,config.format):undefined);
      return (
        // BuildItem(config,getFieldDecorator,formItemLayout,warp,newdata)
        <Col key={`col_${config.field}`} {...formItemLayout}>
          <Form.Item label={config.label}>
            {getFieldDecorator(config.field, {
              rules: [{ required: !!config.required, message: config.errorMessage }],
              initialValue: defaultValue,
            })(warp)}
          </Form.Item>
        </Col>
      );
    }
    case 'select':{
      const pro={};
      if (config.mode!==undefined && config.mode!=='') {
        pro.mode='tags';
      }

      const warp = (
        <Select {...pro} placeholder={config.errorMessage} disabled={config.disabled}>
          {
            (config.options||[]).map(p=><Option key={p.value}>{p.text}</Option>)
          }
        </Select>
      );
      return (
        BuildItem(config,getFieldDecorator,formItemLayout,warp,newdata)
        /* <Col key={`col_${config.field}`} {...formItemLayout}>
          <Form.Item label={config.label}>
            {getFieldDecorator(config.field, {
              rules: [{ required: !!config.required, message: config.errorMessage }],
              initialValue: newdata[config.field],
            })(
              <Select {...pro} placeholder={config.errorMessage} disabled={config.disabled}>
                {
                  (config.options||[]).map(p=><Option key={p.value}>{p.text}</Option>)
                }
              </Select>
            )}
          </Form.Item>
        </Col> */
      );
    }
    case 'radio':{
      const warp = (
        <Radio.Group placeholder={config.errorMessage} disabled={config.disabled}>
          {
            (config.options||[]).map(p=><Radio key={p.value} value={p.value}>{p.text}</Radio>)
          }
        </Radio.Group>
      );
      return (
        BuildItem(config,getFieldDecorator,formItemLayout,warp,newdata)
        /* <Col key={`col_${config.field}`} {...formItemLayout}>
          <Form.Item label={config.label}>
            {getFieldDecorator(config.field, {
              rules: [{ required: !!config.required, message: config.errorMessage }],
              initialValue: newdata[config.field],
            })(
              <Radio.Group placeholder={config.errorMessage} disabled={config.disabled}>
                {
                  (config.options||[]).map(p=><Radio key={p.value} value={p.value}>{p.text}</Radio>)
                }
              </Radio.Group>
            )}
          </Form.Item>
        </Col> */
      );
    }
    case 'checkbox':{
      const artType = typeof newdata[config.field];
      let arrValue=[];
      if (artType==='string'){
        arrValue = newdata[config.field].split(',');
      }
      else if(Array.isArray(newdata[config.field])){
        arrValue=newdata[config.field];
      }else {
        arrValue=config.initValue||[];
      }
      return (
        <Col key={`col_${config.field}`} {...formItemLayout}>
          <Form.Item label={config.label}>
            {getFieldDecorator(config.field, {
              rules: [{ required: !!config.required, message: config.errorMessage,validator: checkCheckBox }],
              initialValue: arrValue,
            })(
              <Checkbox.Group placeholder={config.errorMessage} disabled={config.disabled}>
                {
                  (config.options||[]).map(p=><Checkbox key={p.value} value={p.value}>{p.text}</Checkbox>)
                }
              </Checkbox.Group>
            )}
          </Form.Item>
        </Col>
      );
    }
    case 'textarea':{
      return (
        BuildItem(config,getFieldDecorator,formItemLayout,<TextArea placeholder={config.errorMessage} disabled={config.disabled} />,newdata)
        /* <Col key={`col_${config.field}`} {...formItemLayout}>
          <Form.Item label={config.label}>
            {getFieldDecorator(config.field, {
              rules: [{ required: !!config.required, message: config.errorMessage }],
              initialValue: newdata[config.field],
            })(<TextArea placeholder={config.errorMessage} disabled={config.disabled} />)}
          </Form.Item>
        </Col> */
      );
    }
    case 'autocomplete':{
      const value = newdata[config.field] || config.initValue;
      return(
        <Col key={`col_${config.field}`} {...formItemLayout}>
          <Form.Item label={config.label}>
            {getFieldDecorator(config.field, {
              rules: [{ required: !!config.required, message: config.errorMessage,validator: checkAutoComplete }],
              initialValue: {key:value,flag:(value!==undefined)},
            })(<EAutoComplete dataSource={(config.options||[])} placeholder={config.errorMessage} />)}
          </Form.Item>
        </Col>
      );
    }
    case 'cascader':{ // 级联选择
      return (
        BuildItem(config,getFieldDecorator,formItemLayout,(
          <Cascader options={(config.options||[])} placeholder={config.errorMessage} />
        ),newdata)
      )
    }
    case 'text':
    default:{
      return (
        BuildItem(config,getFieldDecorator,formItemLayout,(
          <Input placeholder={config.errorMessage} disabled={config.disabled} />
        ),newdata)
        /* <Col key={`col_${config.field}`} {...formItemLayout}>
          <Form.Item label={config.label}>
            {getFieldDecorator(config.field, {
              rules: [{ required: !!config.required, message: config.errorMessage }],
              initialValue: newdata[config.field],
            })(<Input placeholder={config.errorMessage} disabled={config.disabled} />)}
          </Form.Item>
        </Col> */
      );
    }
  }
}

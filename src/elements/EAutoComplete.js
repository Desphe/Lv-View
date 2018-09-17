/* eslint-disable prefer-destructuring,react/destructuring-assignment */
import React from 'react';
import { AutoComplete } from 'antd';

const Option = AutoComplete.Option;

export default class EAutoComplete extends React.Component{
  constructor(props) {
    super(props);

    const value = props.value || undefined;
    this.state = {
      value:value.key || undefined,
      data:props.dataSource || [],
      sData:props.dataSource || [],
    };
  }

  componentDidMount(){

  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const val = nextProps.value;
      this.setState({
        value:val.key,
      });
    }
  }

  handleSearch = (val)=> {
    const {sData} = this.state;
    const arr=[];
    sData.forEach(item=>{
      if (item.text.indexOf(val)>=0){
        arr.push(item);
      }
    })
    this.setState({
      data:arr,
    });
    this.triggerChange({key:val,flag:false});
  }

  handleSelect=(val)=>{
    this.triggerChange({key:val,flag:true});
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      // onChange(Object.assign({}, this.state, changedValue));
      onChange(changedValue);
    }
  }


  render(){
    const {placeholder} = this.props;
    const {data,value} = this.state;
    return(
      <AutoComplete dataSource={data} placeholder={placeholder} onSearch={this.handleSearch} onSelect={this.handleSelect} value={value}>
        {
          data.map(p=><Option key={p.value}>{p.text}</Option>)
        }
      </AutoComplete>
    )
  }
}

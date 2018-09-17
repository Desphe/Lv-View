/* eslint-disable react/require-render-return,no-param-reassign,no-plusplus,no-continue,react/destructuring-assignment,react/no-access-state-in-setstate */
import React, { PureComponent } from 'react';
import { Table, Row, Col } from 'antd';
import { Resizable } from 'react-resizable';

import DropDownCheckBox from "../DropDownCheckBox";
import styles from './index.less';

const ResizeableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps} />
    </Resizable>
  );
};


class DoubleTable extends PureComponent{
  
  components = {
    header: {
      cell: ResizeableTitle,
    },
  }

  constructor(props) {
    super(props);

    const {columnsOne,columnsTwo} = props;
    this.state = {
      columnsOne:columnsOne || [],
      columnsTwo:columnsTwo || [],
      showColumnsOne:(columnsOne || []).map(item=>({key:item.key,title:item.title,checked:true})),
      showColumnsTwo:(columnsTwo || []).map(item=>({key:item.key,title:item.title,checked:true})),
    };
  }

 

  onChangeOne=(e)=>{
    const { showColumnsOne } = this.state;
    for (let i=0;i<showColumnsOne.length;i++){
      if (showColumnsOne[i].key===e.target.value){
        showColumnsOne[i].checked=e.target.checked;
        break;
      }
    }
    this.setState({
      flag:!this.state.flag,
      // showColumnsOne
    })
  }

  onChangeTwo=(e)=>{
    const { showColumnsTwo } = this.state;
    console.info(e);
    for (let i=0;i<showColumnsTwo.length;i++){
      if (showColumnsTwo[i].key===e.target.value){
        showColumnsTwo[i].checked=e.target.checked;
        break;
      }
    }
    this.setState({
      flag:!this.state.flag,
      // showColumnsTwo
    })
  }

  initTableOne=(currentPageData)=>{
    console.info(currentPageData);
    const { showColumnsOne } = this.state;
    const data = showColumnsOne.map(item=>({key:item.key,title:item.title,checked:item.checked}))
    return (
      <div>
        <DropDownCheckBox data={data} onChange={this.onChangeOne} />
        <strong>合同</strong>
      </div>

    )
  }

  initTableTwo=(currentPageData)=>{
    console.info(currentPageData);
    const { showColumnsTwo } = this.state;
    const data = showColumnsTwo.map(item=>({key:item.key,title:item.title,checked:item.checked}))
    return (
      <div>
        <DropDownCheckBox data={data} onChange={this.onChangeTwo} />
        <strong>银行流水</strong>
      </div>

    )
  }

  handleShowColumn=(columns,judge)=>{
    const newColumns=[];
    for (let i=0;i<judge.length;i++){
      if (judge[i].checked) {
        for (let j=0;j<columns.length;j++){
          if (judge[i].key===columns[j].key){
            newColumns.push(columns[j]);
            break;
          }
        }
      } else {
        continue;
      }
    }
    return newColumns;
  }

  handleResize = index => (e, { size }) => {
    this.setState(({ columnsOne }) => {
      const nextColumns = [...columnsOne];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columnsOne: nextColumns };
    });
  };

  handleResizeTwo = index => (e, { size }) => {
    this.setState(({ columnsTwo }) => {
      const nextColumns = [...columnsTwo];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columnsOne: columnsTwo };
    });
  };

  render(){
    const { columnsOne,columnsTwo } = this.state;
    const { loading,rowSelectionOne,rowSelectionTwo,dataOne,dataTwo,onChangeOne,onChangeTwo,footerOne,footerTwo,totalEqual  } = this.props;

    const f1 = {};
    if (footerOne!==undefined){f1.footer=footerOne;}
    const f2 = {};
    if (footerTwo!==undefined){f2.footer=footerTwo;}

    const arrColumnsOne = this.handleShowColumn(columnsOne,this.state.showColumnsOne).map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));

    const arrColumnsTwo = this.handleShowColumn(columnsTwo,this.state.showColumnsTwo).map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResizeTwo(index),
      }),
    }));

    const tbProps={
      pagination:{size:'small',total:100,showSizeChanger:true},
      size:'middle',
      bordered:true,
      components:this.components,
      loading,

    }

    return (
      <div className={`${styles.resizableTable} ${totalEqual && styles.tableFooterGreen}`}>
        <Row>
          <Col span={12} style={{paddingRight:2}}>
            <Table {...tbProps} title={this.initTableOne} dataSource={dataOne} {...f1} columns={arrColumnsOne} rowSelection={rowSelectionOne} onChange={onChangeOne} />
          </Col>
          <Col span={12} style={{paddingLeft:2}}>
            <Table {...tbProps} title={this.initTableTwo} dataSource={dataTwo} {...f2} columns={arrColumnsTwo} rowSelection={rowSelectionTwo} onChange={onChangeTwo} />
          </Col>
        </Row>
      </div>
    )
  }

}

export default DoubleTable;

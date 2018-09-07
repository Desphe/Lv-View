import React, { PureComponent } from 'react';
import { Modal,Table,Icon } from 'antd';
import styles from './index.less';

class ViewEditor extends PureComponent {

  cols = [{
    title: '表头字段',
    dataIndex: 'name',
  }];

  constructor(props) {
    super(props);
    const {columns} = props;
    this.state = {
      leftRows:this.getRows(columns),
      rightRows:[],
    }
  }

  getRows(columns) {
    let rows = [];
    for(var i in columns) {
      rows.push({
        name:columns[i].title,
        key:i,
      })
    }
    return rows;
  }

  static getDerivedStateFromProps(nextProps,nextState) {
    return {
      nextState
    };
  }

  onMoveCols(record,type) {
    let rows = this.state[type];
    const { leftRows,rightRows } = this.state;
    let index = rows.indexOf(record);
    rows.splice(index,1);
    switch(type) {
      case "leftRows":
        rightRows.push(record)
        this.setState({leftRows:rows,rightRows:rightRows})
        break;
      case "rightRows":
        leftRows.push(record)
        this.setState({rightRows:rows,leftRows:leftRows})
        break;
    }
  }

  onSureClick = () => {
    alert(1)
  }

  render() {
    const { viewVisible,handleViewVisible } = this.props;
    const { leftRows,rightRows } = this.state;
    return (
      <Modal
        title="视图设置"
        visible={viewVisible}
        onOk={this.onSureClick}
        onCancel={() => handleViewVisible()}
        width={840}
        destroyOnClose
      >
        <div className={styles.modal}>
          <Table
            dataSource={leftRows}
            columns={this.cols}
            pagination={false}
            scroll = {{y:400}}
            onRow={(record) => ({
              onClick: () => {
                this.onMoveCols(record,"leftRows");
              },
            })}
          />
          <div className={styles.icon}>
            <Icon type="double-right" theme="outlined" style={{fontSize:"30px"}}/>
            <Icon type="double-left" theme="outlined" style={{fontSize:"30px"}}/>
          </div>
          <Table
            dataSource={rightRows}
            columns={this.cols}
            pagination={false}
            scroll = {{y:400}}
            onRow={(record) => ({
              onClick: () => {
                this.onMoveCols(record,"rightRows");
              },
            })}
          />
        </div>
      </Modal>
    )
  }
}

export default ViewEditor;
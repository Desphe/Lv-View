import { Table, Input, Button, Popconfirm, Form } from 'antd';
import styles from './EditTable.less'; 

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  }

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  }

  handleClickOutside = (e) => {
    const { editing } = this.state;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save();
    }
  }

  save = () => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  }

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      required,
      handleSave,
      ...restProps
    } = this.props;
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                      rules: [{
                        required: required,
                        message: `${title} 不能为空.`,
                      }],
                      initialValue: record[dataIndex],
                    })(
                      <Input
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                      />
                    )}
                  </FormItem>
                ) : (
                  <div
                    className={styles.editableWrap}
                    style={{ paddingRight: 24 }}
                    onClick={this.toggleEdit}
                  >
                    {restProps.children}
                  </div>
                )
              );
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      count: 2,
    };
  }

  componentDidUpdate() {
    const { dataSource } = this.props;
    if(dataSource.length>0&&this.state.dataSource.length==0) {
      this.setState({dataSource:this.props.dataSource})
    }
  }

  handleDelete = (id) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.id !== id) });
  }

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      id: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  }

  render() {
    const { rowKey,columns } = this.props;
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    console.log(columns)
    if(columns.length>0&&columns[columns.length-1].dataIndex != 'operation') {
      columns.push({
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          return (
            this.state.dataSource.length >= 1
              ? (
                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
                  <a href="javascript:;">删除</a>
                </Popconfirm>
              ) : null
          );
        },
      })
    }
    const columnsConfig = columns.map((col) => {
      if (!col.editable||col.dataIndex=='operation') {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          required: col.required,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Table
          components={components}
          rowClassName={() => {styles.editableRow}}
          dataSource={dataSource}
          columns={columnsConfig}
          rowKey={rowKey}
          pagination={false}
          size='middle'
        />
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          添加
        </Button>
      </div>
    );
  }
}

export default EditableTable;
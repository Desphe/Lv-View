import React, { PureComponent } from 'react';
import { Button, Col, Form, Row } from 'antd';
import FormBuild from '@/components/FormBuild';
import styles from './SearchForm.less';

export default 
@Form.create()
class SearchForm extends PureComponent {

    handleSearch = (e) => {
        e.preventDefault();
        const { form, handleSearch } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            handleSearch({ ...fieldsValue });
        });
    }

    // 重置
    handleFormReset = () => {
        const { form, handleSearch } = this.props;
        form.resetFields();
        handleSearch({});
    }

    render() {
        const { form: { getFieldDecorator }, fields } = this.props;
        return (
          <div className={styles.tableListForm}>
            <Form onSubmit={this.handleSearch} layout="inline">
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                {
                  fields.map(item => FormBuild(item, getFieldDecorator, true))
                }
                <Col md={6} sm={24}>
                  <span className={styles.submitButtons}>
                    <Button type="primary" htmlType="submit">查询</Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                  </span>
                </Col>
              </Row>
            </Form>
          </div>

        );
    }
}
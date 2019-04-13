import React from "react";

import {Row, Col, Input, Form, DatePicker, Icon, Button} from 'antd';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

class QnCreateForm extends React.Component {
  
    render() {
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 10 },
        },
      };
  
      return (
        <Form>
            <FormItem {...formItemLayout} label="问卷标题">
            {getFieldDecorator('title', {
                rules: [{
                required: true, message: '问卷标题是必要的',
                }],
            })(
                <Input onChange={this.props.titleChange}/>
            )}
            </FormItem>

            <FormItem {...formItemLayout} label="问卷起止日期" >
            {getFieldDecorator('date-picker', {
                rules: [{ required: true, message: '问卷日期是必要的' 
                }]
            })(
                <RangePicker onChange={this.props.dateChange}/>
            )}
            </FormItem>
        
            <FormItem {...formItemLayout} label="问卷描述" >
            <TextArea rows={4} />
            </FormItem>

            <FormItem style={{marginTop:32}}>
            <Row>
                <Col span={24} offset={8}>
                <Button type="primary" onClick={this.props.changeStep}>
                进入下一步<Icon type="right" />
                </Button>
                </Col>
            </Row>
            </FormItem>

        </Form>
      )
    }
  }
  
  export default Form.create()(QnCreateForm);
import React from "react";
import router from 'umi/router';

import { Card, Form, Input, Button, message, Icon, Checkbox, Spin} from "antd";
const FormItem = Form.Item;
import {getRootPath , setCookie, setLocalStorage} from '../../../utils/helper.js'

class LoginForm extends React.Component {
  handleSubmit = () => {
    let userInfo = this.props.form.getFieldsValue();
    this.props.form.validateFields((err,values) => {
      if(!err){
        this.setState({ loading: true});
        const request = new Request('https://kvv.me/qnAPI/login.php', {
          method: 'POST',
          body : JSON.stringify({
            'user' : userInfo.username,
            'pass' : userInfo.password
          }),
          headers: new Headers({ 'Content-Type': 'application/json' }),
        });

        fetch(request)
        .then( response => response.json())
        .then( data => {
          if(data.success){
            setCookie('utoken',data.utoken);
            setLocalStorage('userid',data.userid);
            setLocalStorage('username',userInfo.username);
            message.success('登录成功，跳转中...');
            router.push('/panel/');
          }else{
            message.error('登录失败，请检查账号或密码');
            this.setState({ loading: false});
          }
        });
      }}
    )
  };

  state = { loading: false };

  render(){
  const { getFieldDecorator } = this.props.form;
  return (
    <div>
      <Spin spinning={this.state.loading}>
      <Card title="登录您的账号">
        <Form style={{width:300}}>
          <FormItem>
            {getFieldDecorator('username',{
              initialValue:'',
              rules:[{required:true,message:'用户名不能为空'}]
            })(
              <Input prefix={<Icon type="user"/>} placeholder="请输入用户名" />
            )}
          </FormItem>
                    
          <FormItem>
            {getFieldDecorator('password',{
              initialValue:'',
              rules:[{required:true,message:'密码不能为空'}]
            })(
              <Input prefix={<Icon type="lock" />} type="password" placeholder="请输入密码" />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName:'checked',
              initialValue: true
            })(
              <Checkbox>记住密码</Checkbox>
            )}
            <a href="#" style={{float:'right'}}>注册账号</a>
          </FormItem>

          <FormItem>
            <Button type="primary" block onClick={this.handleSubmit}>
                {this.state.loading ? '正在登录..' : '登录'}
            </Button>
          </FormItem>
        </Form>
      </Card>
      </Spin>
    </div>
    );
    }
}

export default Form.create()(LoginForm);
import React from "react";

import {List, Form, Input, Divider, Avatar ,Icon, Select, Button} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

import Panel from '../components/Panel';
import styles from './security.css';

class SecurityPanel extends React.Component {

  state = {
      changepw : false
  }


  render() {

    const inner = (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
     
        <div className={styles.title}>
          <span>安全中心</span>
        </div>
        <Divider />
        
        <List style={{'marginTop':-12}} itemLayout="horizontal">
            
            <List.Item actions={[<a onClick={() => this.setState({changepw:true})}>修改</a>]}>
                <List.Item.Meta title="账户密码"
                description={<div>当前密码强度：<span style={{color:'#52c41a'}}>强</span></div>}
                />
                {this.state.changepw ? (
                <div>
                    <Input placeholder="新密码" type="password" style={{width:250,marginRight:15}} />
                    <Button type="primary">提交</Button>
                </div>
                ):''}  
            </List.Item>
            <List.Item actions={[<a>修改</a>]}>
                <List.Item.Meta title="密保手机"
                description="已绑定密保手机：13111111111"
                />
            </List.Item>
            <List.Item actions={[<a>修改</a>]}>
                <List.Item.Meta title="密保邮箱"
                description="已绑定邮箱：test@163.com"
                />
            </List.Item>
            <List.Item actions={[<a>设置</a>]}>
                <List.Item.Meta title="密保问题"
                description="未设置密保问题，密保问题可有效保护账户安全"
                />
            </List.Item>
            
        </List>
        

      </div>
    );

    return (
      <Panel indexKeys={['6']} innerPanel = {inner} />
    )
  }
}

export default SecurityPanel;

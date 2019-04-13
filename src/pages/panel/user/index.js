import React from "react";

import { Form, Input, Divider, Avatar ,Icon, Select, Button} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

import Panel from '../components/Panel';
import styles from './user.css';

const provinceData = ['浙江', '江苏'];
const cityData = {
  '浙江': ['杭州', '宁波', '温州'],
  '江苏': ['南京', '苏州', '镇江'],
};

class UserPanel extends React.Component {

  state = {
    cities: cityData[provinceData[0]],
    secondCity: cityData[provinceData[0]][0],
  }

  handleProvinceChange = (value) => {
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0],
    });
  }

  onSecondCityChange = (value) => {
    this.setState({
      secondCity: value,
    });
  }

  render() {
    const { cities } = this.state;

    const inner = (
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
     
        <div className={styles.title}>
          <span>基本信息</span>
        </div>
        <Divider />

        <div style={{'display':'flex','paddingTop':12}}>
        <div className={styles.left}>
        <Form >
          <FormItem label="邮箱" style={{'marginTop':-15}}>
            <Input defaultValue="test@163.com" />
          </FormItem>
          <FormItem label="昵称" style={{'marginTop':-15}}>
            <Input defaultValue="test" />
          </FormItem>
          <FormItem label="手机号" style={{'marginTop':-15}}>
            <Input addonBefore={
              (<Select defaultValue="+86" style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
              </Select>)
            } style={{ width: '100%' }} />
          </FormItem>
          <FormItem label="个人简介" style={{'marginTop':-15}}>
            <TextArea rows={4} />
          </FormItem>
          <FormItem label="国家/地区" style={{'marginTop':-15}}>
            <Select defaultValue="中国" style={{ width: 120 }}>
              <Option value="中国">中国</Option>
            </Select>
          </FormItem>
          <FormItem label="所在省市" style={{'marginTop':-15}}>
            <Select
              defaultValue={provinceData[0]}
              style={{width:120}}
              onChange={this.handleProvinceChange}
            >
              {provinceData.map(province => <Option key={province}>{province}</Option>)}
            </Select>
            <Select
              style={{width:120,'marginLeft':15}}
              value={this.state.secondCity}
              onChange={this.onSecondCityChange}
            >
              {cities.map(city => <Option key={city}>{city}</Option>)}
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">更新基本信息</Button>
          </FormItem>
        </Form>
        </div>

        <div className={styles.right}>
          <span className={styles.avrt}>头像</span>
          <div className={styles.avr}>
            <Avatar size={128} icon="user" />
          </div>
          <Button><Icon type="cloud-upload" />更换头像</Button>
        </div>

        </div>
      </div>
    );

    return (
      <Panel indexKeys={['5']} innerPanel = {inner} />
    )
  }
}

export default UserPanel;

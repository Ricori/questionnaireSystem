import React from "react";

import { Layout, Menu, Icon, Dropdown, Avatar} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
import Link from 'umi/link';

import {authenticated, logOut} from '../../../utils/auth.js'
import {getLocalStorage} from '../../../utils/helper.js'
import styles from './panel.css';

class Panel extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    collapsed: false, //侧标栏是否收起
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {

    //authenticated();

    const {indexKeys, innerPanel} = this.props;

    const usermenu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="/panel/user">个人中心</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" onClick={logOut}>退出登录</a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className={styles.logo} style={{display:this.state.collapsed ? "none" : "block"}}>
            <h1 className={styles.logoh1}> 
              问卷管理系统 </h1>
          </div>

          <Menu theme="dark" 
            defaultSelectedKeys={indexKeys} 
            defaultOpenKeys={['sub1','sub2']}
            mode="inline" 
            style={{padding:'20px 0px'}}>

            <Menu.Item key="1">
              <Link to="/panel/">
                <Icon type="pie-chart" />
                <span>主页面</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="form" /><span>问卷管理</span></span>}
            >
              <Menu.Item key="2"><Link to="/panel/list/">问卷列表</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/panel/create/">生成问卷</Link></Menu.Item>
              <Menu.Item key="4"><Link to="/panel/publish/">发布问卷</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="user" /><span>个人中心</span></span>}
            >
              <Menu.Item key="5"><Link to="/panel/user/">个人资料</Link></Menu.Item>
              <Menu.Item key="6"><Link to="/panel/security/">安全中心</Link></Menu.Item>
            </SubMenu>
            
            <Menu.Item key="7">
              <Icon type="logout" />
              <span onClick={logOut}>退出登录</span>
            </Menu.Item>
           </Menu>
        </Sider>
        <Layout>
          <Header className={styles.header}>
            <Icon
              className={styles.trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />

            <Dropdown overlay={usermenu} className={styles.user}>
              <a className="ant-dropdown-link" href="#">
                <Avatar size="small" style={{ backgroundColor: '#87d068' }} icon="user" />
                <span>   {getLocalStorage('username')}</span>
              </a>
            </Dropdown>

          </Header>

          <Content style={{ margin: '16px' }}>

            {innerPanel}

          </Content>
          <Footer style={{ textAlign: 'center' }}>
            问卷管理系统 ver1.0.0
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Panel;

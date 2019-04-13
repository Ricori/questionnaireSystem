import React from "react";
import {connect} from 'dva';

import {Card,Radio,Input,Modal,} from 'antd';
const { Search } = Input;
const confirm = Modal.confirm;

import Panel from '../components/Panel';
import QnPbList from './components/QnPbList';
import QnDetail from './components/QnDetail';
import styles from './list.css';

class PublishPanel extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    loading: false ,
    searchText: '',
    modalVisible: false,
    modalId: 1,
  }

  handleSearchText = (text) => {
    this.setState({searchText: text});
  }

  showModal = (id) => {
    this.setState({
      modalVisible: true,
      modalId: id
    });
  }

  publishQn = (id) => {
    const qn = this.props.Qn.find(function(qn){
      return qn.id == id;
    },this);

    confirm({
      title: '确定要发布该问卷吗？',
      content: (
        <>
          <div>问卷编号：{qn.id} </div>
          <div>问卷标题：{qn.name} </div>
          <div>问卷日期：{qn.date} </div>
          <div>问卷题目数量：{qn.questions.length} </div>
        </>
      ),
      onOk() {
        Modal.success({
          title: '问卷发布成功',
          content: (
          <>
            该问卷链接为：
            <a href={window.rootPath + '/questionnaire/' + id} target={'_blank'}>
              {window.rootPath + '/questionnaire/' + id}
            </a>
          </>
          ),
        });
      },
      onCancel() {}
    });

  }

  render() {
    
    const extraSearch = (
      <div className={styles.extraContent}>
        <Search className={styles.extraContentSearch} placeholder="请输入" 
          onSearch={value => this.handleSearchText(value)} 
        />
      </div>
    );

    const openQn = this.props.Qn.find(function(qn){
      return qn.id == this.state.modalId;
    },this);

    const inner = (
      <div>
        <Card
          className={styles.listCard}
          bordered={false}
          title="待发布问卷"
          bodyStyle={{ padding: '0 32px 40px 32px' }}
          extra={extraSearch}
        >

        <QnPbList 
          loading = {this.state.loading} 
          Qn = {this.props.Qn}
          searchText = {this.state.searchText}
          showModal = {this.showModal}
          publishQn = {this.publishQn}
        />

        </Card>

        <Modal
          title={openQn ? openQn.name : ''}
          visible={this.state.modalVisible}
          footer={null}
          onCancel={() => {
            this.setState({
              modalVisible: false,
            });
          }}
          destroyOnClose={true}
        >

          <QnDetail questions={openQn ? openQn.questions : ''}/>
          
        </Modal>

      </div>
    );


    return (
      <Panel indexKeys={['4']} innerPanel = {inner} />
    )
  }
}

export default connect(
  ({Qn}) => ({Qn, })
)(PublishPanel);

import React from "react";
import {connect} from 'dva';

import {Card,Radio,Input,Modal,} from 'antd';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search} = Input;

import Panel from '../components/Panel';
import QnList from './components/QnList';
import QnDetail from './components/QnDetail';
import styles from './list.css';

class QnListPanel extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    loading: false ,
    searchState: 'all',
    searchText: '',
    modalVisible: false,
    modalId: 1,
  }

  handleSearchState = (e) => {
    this.setState({searchState: e.target.value});
  }

  handleSearchText = (text) => {
    this.setState({searchText: text});
  }

  qnDelete = (id) => {
    this.props.dispatch({
        type : 'Qn/deleteQn',
        payload : {qnid : id}
    });
  }

  showModal = (id) =>{
    this.setState({
      modalVisible: true,
      modalId: id
    });
  }

  render() {

    const extraSearch = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue={this.state.searchState} onChange={this.handleSearchState}>
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="waiting">待发布</RadioButton>
          <RadioButton value="publishing">已发布</RadioButton>
        </RadioGroup>
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
          title="问卷列表"
          bodyStyle={{ padding: '0 32px 40px 32px' }}
          extra={extraSearch}
        >
          
        <QnList 
          loading={this.state.loading} 
          Qn={this.props.Qn}
          searchState = {this.state.searchState}
          searchText = {this.state.searchText}
          onDelete={this.qnDelete}
          showModal={this.showModal}
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
      <Panel indexKeys={['2']} innerPanel = {inner} />
    )
  }
}

export default connect(
  ({Qn}) => ({Qn, })
)(QnListPanel);

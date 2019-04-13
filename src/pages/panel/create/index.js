import React from "react";
import {connect} from 'dva';

import { Button, Card , Icon, Steps} from 'antd';
const Step = Steps.Step;
import Link from 'umi/link';

import Panel from '../components/Panel';
import QnCreateForm from "./components/QnCreateForm";
import QnDesign from "./components/QnDesign";
import CreateFin from "./components/CreateFin";

import styles from './create.css';

class CreatePanel extends React.Component {
  
  constructor(props) {
    super(props);
  }

  state = {
    step : 1,
    questionNaire:{
      id: 1 ,
      name: '' ,
      state: 'waiting' ,
      date: "2018-11-11",
      questions:[]
    }
  }

  changeStep = (step) => {
    if(step == 3){
      this.submitQn()
    }else{

    }
    this.setState({step : step});
    //console.log(this.state.questionNaire);
  }

  //STEP1
  titleChange = (e) => {
    this.state.questionNaire.name = e.target.value;
    //this.setState({});
  }
  dateChange = (e) => {
    this.state.questionNaire.date = e[0].format('YYYY-MM-DD');
  }
  //STEP2
  questionsChange = (questions) =>{
    this.state.questionNaire.questions = questions;
  }

  //提交问卷信息
  submitQn = () =>{
    this.props.dispatch({
      type : 'Qn/addQn',
      payload : { qs : this.state.questionNaire}
    });
  }


  render() {

    const inner = (
      <div>
        <div className={styles.header}>
          <div style={{marginTop:10}}>
            <h1 className={styles.title}>生成问卷</h1>
          </div>
          <div style={{marginBottom:20}}>
              <span>本向导将指导您一步步生成自己的问卷</span>
          </div>
        </div>

        <div className={styles.content}>
          <Card bodyStyle={{ padding: '24px 32px' }} >

          <Steps current={this.state.step-1} style={{maxWidth:750,margin:'8px auto 32px'}}>
            <Step title="填写问卷基本信息"  />
            <Step title="设计问卷" />
            <Step title="完成"  />
          </Steps>

            { this.state.step == 1 ?
              <QnCreateForm 
                changeStep={() => this.changeStep(2)} 
                titleChange={this.titleChange}
                dateChange={this.dateChange} /> : ''
            }
            { this.state.step == 2 ?
              (
                <div style={{maxWidth:750,margin:'16px auto'}}>
                <QnDesign questionsChange={this.questionsChange}/>
                
                <div style={{marginTop:10}}>
                <Button onClick={() => this.changeStep(1)}>
                  <Icon type="left" />返回上一步
                </Button>
                <Button type="primary" style={{marginLeft:20}}
                  onClick={() => this.changeStep(3)}>
                下一步<Icon type="right" />
                </Button>
                </div>

                </div>
              ) : ''
            }
             { this.state.step == 3 ?
              (
                <div style={{maxWidth:750,margin:'16px auto'}}>
                <CreateFin data={{name : this.state.questionNaire.name,
                                date : this.state.questionNaire.date,
                                questionCount : this.state.questionNaire.questions.length}}
                />
                
                <div style={{textAlign:'center'}}>
                  <Link to="/panel/list">
                    <Button type="primary" >
                      <Icon type="ordered-list" />查看问卷列表
                    </Button>
                  </Link>
                  <Button style={{marginLeft:20}} >
                    查看该问卷
                  </Button>
                </div>

                </div>
              ) : ''
            }

          </Card>        
        </div>
      </div>
    );

    return (
      <Panel indexKeys={['3']} innerPanel = {inner} />
    )
  }
}

export default connect(
  ({Qn}) => ({Qn, })
)(CreatePanel);
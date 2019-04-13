import React from "react";

import {Select,Popconfirm,Tooltip,Row,Col,Radio,Checkbox,Input,List,Card,Icon,Button} from 'antd';
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;

import styles from './QnDesign.css';

class QnDesign extends React.Component {
  
  constructor(props) {
    super(props);
  }

  state = {
      nowadd : false,
      questions : [],
      nowaddItem : {
        type : 'single',
        title : '',
        option : ['',''],
      },
  }

  questionOpChange = (id,event) => {
    //console.log('question' + id + ' Option:' + event.target.value);
    this.state.questions[id-1].check = event.target.value;
    this.setState({});
  }

  addConfirm = () => {
    this.state.questions.push(this.state.nowaddItem);
    this.state.nowaddItem = {
        type : 'single',
        title : '',
        option : ['',''],
    };
    this.state.nowadd = false;
    this.setState({});
  }

  delQuestion = (id) => {
    this.state.questions.splice(id,1);
    this.setState({});
    //console.log(this.state);
  }

  qustionTypeChange = (value) =>{
    this.state.nowaddItem.type = value;
    this.setState({});
  }

  qustionTitleChange = (event) =>{
    this.state.nowaddItem.title = event.target.value;
    this.setState({});
  }

  addOption = (id) => {
    this.state.nowaddItem.option.splice(id,0,'');
    //console.log(this.state.nowadd.option);
    this.setState({});
  }
  
  delOption = (id) => {
    this.state.nowaddItem.option.splice(id-1,1);
    this.setState({});
  }

  optionTitleChange = (id,event) => {
    this.state.nowaddItem.option[id] = event.target.value;
    this.setState({});
  }

  render() {

    const data = [];
   
    let questions = this.state.questions;
    questions.map(
        (question,key) => 
        {
            if(question.type == 'single'){
                data[key] = {
                    title: (key+1) + '.【单选题】' + question.title,
                    delete: (
                    <Popconfirm key={key} title="确定删除该题目?" onConfirm={() => this.delQuestion(key)}>
                        <Button>删除</Button>
                    </Popconfirm>
                    ),
                    content : (
                    <div>
                    <RadioGroup key={key} onChange={this.questionOpChange.bind(this,key+1)} 
                        value={question.check}
                    >
                    {question.option.map((option,opkey) => {
                        return <Radio key={opkey} className={styles.radioStyle} value={opkey+1}>{option}</Radio>
                    })}
                    </RadioGroup>
                    </div>
                    )
                }
            }else if(question.type == 'multiple'){
                data[key] = {
                    title: (key+1) + '.【多选题】' + question.title,
                    delete: (
                        <Popconfirm key={key} title="确定删除该题目?" onConfirm={() => this.delQuestion(key)}>
                            <Button>删除</Button>
                        </Popconfirm>
                    ),
                    content : (
                       <Checkbox.Group key={key} style={{ width: '100%' }} defaultValue={question.check}>
                        <Row key={key}>
                        {question.option.map((option,opkey) => {
                            return (
                            <Col key={opkey} span={16}>
                                <Checkbox key={opkey} value={opkey+1}>{option}</Checkbox>
                            </Col>
                            )
                        })}
                        </Row>
                      </Checkbox.Group>
                    )
                }
            }else if(question.type == 'singleline'){
                data[key] = {
                    title: (key+1) + '.【单行文本题】' + question.title,
                    delete: (
                        <Popconfirm key={key} title="确定删除该题目?" onConfirm={() => this.delQuestion(key)}>
                            <Button>删除</Button>
                        </Popconfirm>
                    ),
                    content : (
                        <Input key={key} />
                    )
                }
            }else if(question.type == 'multiline'){
                data[key] = {
                    title: (key+1) + '.【多行文本题】' + question.title,
                    delete: (
                        <Popconfirm key={key} title="确定删除该题目?" onConfirm={() => this.delQuestion(key)}>
                            <Button>删除</Button>
                        </Popconfirm>
                    ),
                    content : (
                        <TextArea key={key} rows={4} />
                    )
                }
            }
        }
    )


    
    let nowaddoption = this.state.nowaddItem.option;
    let addOptionCol = [];
    nowaddoption.map(
        (value,index) => {
            addOptionCol[index] = (<Col span={24} className={styles.addcol}>
            <span>第{index+1}项：</span>
            <Input placeholder = {"选项" + (index+1)}
                value = {value}
                onChange = {this.optionTitleChange.bind(this,index)}
                style = {{width:400}} />
            <Tooltip title="在此选项下面添加一个新的选项">
                <Icon type="plus-circle" onClick={() => this.addOption(index+1)}/>
            </Tooltip>
            <Tooltip title="删除此选项">
                <Icon type="minus-circle" onClick={() => this.delOption(index+1)}/>
            </Tooltip>
            </Col>)
        }
    );

    //console.log(this.state);
    if(this.state.nowadd){
        let qcontent;
        let qtype = this.state.nowaddItem.type;
        if(qtype == 'single' || qtype == 'multiple'){
            qcontent = addOptionCol.map((value,key) => <Row key={key}>{value}</Row>)
        }else if(qtype == 'singleline'){
            qcontent = <Input />
        }else if(qtype == 'multiline'){
            qcontent = <TextArea rows={4} />
        };

        data.push({
            title: (
                <div>
                <Select defaultValue="single" 
                    onChange={this.qustionTypeChange} 
                    style={{width: 120,marginRight:8}}
                >
                    <Option value="single">单选题</Option>
                    <Option value="multiple">多选题</Option>
                    <Option value="singleline">单行文本题</Option>
                    <Option value="multiline">多行文本题</Option>
                </Select>
                <Input placeholder="请输入问卷标题" 
                    onChange={this.qustionTitleChange}
                    style={{width:500}} 
                />
                </div>
            ),
            delete: '',
            content : (
                <div>          
                    { qcontent }
                    <Row style={{marginTop:20}}><Col>
                        <Button type="primary" onClick={this.addConfirm}>确定添加</Button>
                        <Button onClick={() => this.setState({nowadd:false})} 
                            style={{marginLeft:20}}>取消
                        </Button>
                    </Col></Row>
                </div>
            )
        })
    }else{
        data.push({
            content : (
                <Button type="dashed" ghost 
                    className={styles.addQs} 
                    onClick={() => this.setState({nowadd:true})}
                > 
                    <Icon type="plus" /> 新增题目
                </Button>
            )
        })
    }

    this.props.questionsChange(this.state.questions);

      return (
        <div>
          <List
            grid={{ gutter: 16}}
            dataSource={data}
            renderItem={item => (
            <List.Item>
              <Card title={item.title} extra={item.delete}>
                {item.content}
              </Card>
            </List.Item>
            )}
        />


        </div>
      )
    }
  }
  
export default QnDesign;
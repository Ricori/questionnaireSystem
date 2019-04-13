import React from "react";

import {Select,Popconfirm,Tooltip,Row,Col,Radio,Checkbox,Input,List,Card,Icon,Button} from 'antd';
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;

import styles from './QnList.css';

class QnDetail extends React.Component {

    state = {
        questions : [],
    }

    constructor(props) {
        super(props);
        this.state = {questions: this.props.questions};
    }

    questionOpChange = (id,event) => {
        console.log('question' + id + ' Option:' + event.target.value);
        this.state.questions[id-1].check = event.target.value;
        this.setState({});
    }
    
    render() {
        
        const data = [];
        const questions = this.state.questions;
        
        questions.map(
            (question,key) => 
            {
                if(question.type == 'single'){
                    data[key] = {
                        title: (key+1) + '.【单选题】' + question.title,
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
                        content : (
                            <Input key={key} />
                        )
                    }
                }else if(question.type == 'multiline'){
                    data[key] = {
                        title: (key+1) + '.【多行文本题】' + question.title,
                        content : (
                            <TextArea key={key} rows={4} />
                        )
                    }
                }
            }
        )

        return (
            <div>
              <List
                grid={{ gutter: 16}}
                dataSource={data}
                renderItem={item => (
                <List.Item>
                  <Card title={item.title}>
                    {item.content}
                  </Card>
                </List.Item>
                )}
            />
            </div>
          )

    }

}

export default QnDetail;
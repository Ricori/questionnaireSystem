import React from "react";

import {Card , Row, Col, Input, Form, DatePicker, Icon, Button} from 'antd';
import styles from './CreateFin.css';

class CreateFin extends React.Component {
  
    constructor(props) {
        super(props);
    }

    render() {
     
  
      return (

                
        <div style={{marginBottom:30}}>
                
            <div className={styles.iconDiv}>
                <Icon type="check-circle" theme="filled" className={styles.icon}/>
            </div>
            
            <div className={styles.title}>
            问卷生成完毕
            </div>
            
            <div className={styles.description}>
            问卷已经生成完毕，当前为未发布状态。<br />
            你可以在问卷列表中查看到生成的问卷，在发布页面进行问卷发布。
            </div>


            <div className={styles.extra}>
                <div className={styles.extraTitle}>
                问卷信息
                </div>
                <div>
                <p>问卷名称：{this.props.data.name}</p>
                <p>问卷生成日期：{this.props.data.date}</p>
                <p>问卷描述：无</p>
                <p>问卷所含题数：{this.props.data.questionCount}</p>
                </div>
            </div>
        </div>

    
        
      )
    }
  }
  
  export default CreateFin;
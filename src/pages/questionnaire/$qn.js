import React from "react";
import {connect} from 'dva';

import {Card,Radio,Input,Modal,Button,Icon} from 'antd';
import QnDetail from './components/QnDetail';
import styles from './qn.css';

class Questionnaire extends React.Component {

    constructor(props) {
        super(props);
        this.props.dispatch({
            type: 'Qn/findQn',
            payload: {qnid : this.props.match.params.qn},
            callback: (qn) => {
                this.setState({
                    loading : false,
                    qn : JSON.parse(qn)
                });
                this.forceUpdate();
            }
        })

    }

    state = {
        loading : true,
        qn : []
    }

    submitQn = () =>{
        Modal.success({
            title: '答案提交成功！',
            onOk : function(){
                window.close();
            }
        });
    }

    render(){

        const qnid = this.props.match.params.qn;

        //console.log(this.state.qn);
        
        const openQn = this.state.qn;
        
        const content = this.state.loading ? '' : (<>
            <QnDetail questions={ openQn.questions } />
            <div style={{textAlign:'center',marginTop:10}}>       
                <Button type="primary" onClick={this.submitQn}>
                    <Icon type="check" />提交答案
                </Button>
            </div>
            </>);


        return (
            <Card
                title= {openQn ? openQn.name : ''}
                className={styles.card}
                loading = {this.state.loading}
            >
                {content}
            </Card>
        )
    }

}

export default connect(
    ({Qn}) => ({Qn, })
)(Questionnaire);
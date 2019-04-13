import React from "react";
import {connect} from 'dva';

import { Card, Row, Col, Progress, Timeline, Collapse, Table, Icon } from 'antd';
const { Meta } = Card;
import Link from 'umi/link';

import Panel from './components/Panel'
import styles from './index.css';

class IndexPanel extends React.Component {

  state = {
    loading: false,
  }

  render() {
    
    const { loading } = this.state;
    const qn = this.props.Qn;
    let pbcount = 0;
    for(let i = 0;i < qn.length ; i++) {
      if(qn[i].state == 'publishing') {
        pbcount++;
      }
    }
    
    const inner = (

    <div className='mindex'>
        <Row gutter={16}>
            <Col md={6}>
                <Card style={{marginBottom:16}} loading={loading}>
                  <Meta
                      style={{fontSize:28}}
                      title={"问卷总数"}
                      description={qn.length}
                  />
                </Card>
            </Col>
            <Col md={6}>
                <Card style={{marginBottom:16}} loading={loading}>
                  <Meta
                      style={{fontSize:28}}
                      title={"已发布的问卷总数"}
                      description={pbcount}/
                  >
                </Card>
            </Col>
            <Col md={6}>
                <Card style={{marginBottom:16}} loading={loading}>
                  <Meta
                      style={{fontSize:28}}
                      title={"问卷总点击量"}
                      description={"???"}/
                  >
                </Card>
            </Col>
            <Col md={6}>
                <Card style={{marginBottom:16}} loading={loading}>
                  <Meta
                      style={{fontSize:28}}
                      title={"今日问卷点击量"}
                      description={"???"}/
                  >
                </Card>
            </Col>
        </Row>

        <Row gutter={16}>
            <Col md={24}>
                <Card bodyStyle={{padding: 0,height:'530px',overflow:'hidden'}}
                    loading={loading}>

                    <div className={styles.qk}>
                        <Link to="/panel/create/">
                        <div className={styles.qkicon}>
                            <Icon type="form" />
                            <div className={styles.qktext}>生成问卷</div>
                        </div>
                        </Link>
                        <Link to="/panel/list/">
                        <div className={styles.qkicon} style={{marginLeft:80}}>
                            <Icon type="ordered-list" />
                            <div className={styles.qktext}>问卷列表</div>
                        </div>
                        </Link>
                        <Link to="/panel/publish/">
                        <div className={styles.qkicon} style={{marginLeft:80}}>
                            <Icon type="link" />
                            <div className={styles.qktext}>发布问卷</div>
                        </div>
                        </Link>
                    </div>

                </Card>
            </Col>
        </Row>
    </div>

    );

    return (
      <Panel indexKeys={['1']} innerPanel = {inner} />
    )
  }
};

export default connect(
  ({Qn}) => ({Qn, })
)(IndexPanel);
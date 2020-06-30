import React from 'react'
import {Card, Col, Row} from 'antd'
import ReactEcharts from 'echarts-for-react'
import styles from './index.less';
import {pieOptions,lineOptions} from "./mock";

export default () => {
    return (
        <div className={styles.wrapper}>
            <Row gutter={12}>
                <Col span={5}>
                    <Card className={styles.card}>
                        <p className={styles.title}>待我审批</p>
                        <p className={`${styles.text} ${styles.orange}`}>2</p>
                    </Card>
                </Col>
                <Col span={5}>
                    <Card className={styles.card}>
                        <p className={styles.title}>本周登录次数</p>
                        <p className={`${styles.text} ${styles.gray}`}>5</p>
                    </Card>
                </Col>
                <Col span={14}>
                    <div className={styles.image}/>
                </Col>
            </Row>
            <div className={styles.chartsWrapper}>
                <Row gutter={12}>
                    <Col span={10}>
                        <Card className={styles.chart}>
                            <ReactEcharts option={pieOptions} />
                        </Card>
                    </Col>
                    <Col span={14}>
                        <Card className={styles.chart}>
                            <ReactEcharts option={lineOptions} />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

import React from 'react';
import {Card, Col, message, Modal, Pagination, Row, Spin, Tooltip} from 'antd';
import {DeleteOutlined, FileOutlined} from '@ant-design/icons'
import {connect} from 'dva';
import {history} from 'umi'
import styles from './index.less';

const Index = ({reportList, loading, page, total, dispatch}: any) => {


    // 查看
    const onCheck = (id: number) => {
        history.push(`/report/write/${id}`)
    }

    //删除
    const onDel = (id: number) => {
        Modal.confirm({
            title: '温馨提示',
            content: '确定要删除该日报？',
            onOk() {
                handleDelete(id)
            }
        })
    }


    // 删除请求
    const handleDelete = (id: number) => {
        dispatch({type: 'report/deleteReport', payload: {id}}).then((res: any) => {
            if (res.err_code === 0) {
                message.success('删除成功');
                onPageChange(1)
            } else {
                message.success(res.msg);
            }
        })
    }

    // 渲染卡片
    const colSpan = {span: 12}
    const renderCards = () => (
        reportList.map((item: any) =>
            <Col key={item.date} {...colSpan}>
                <Card title={item.date}
                      className={styles.card}
                      extra={
                          <>
                              <Tooltip placement={"top"} title={'查看'} overlay={''}>
                                  <FileOutlined
                                      className={`${styles.icon} ${styles.blue}`}
                                      onClick={() => onCheck(item.id)}
                                  />
                              </Tooltip>
                              <Tooltip placement={"top"} title={'删除'} overlay={''}>
                                  <DeleteOutlined
                                      className={`${styles.icon} ${styles.red}`}
                                      onClick={() => onDel(item.id)}
                                  />
                              </Tooltip>
                          </>
                      }
                >
                    <p className={styles.title}>{item.title}</p>
                    <p className={styles.receiver}>接收人：{item.receiver}</p>
                </Card>
            </Col>
        )
    )

    //分页
    const onPageChange = (pageNo: number) => {
        dispatch({
            type: 'report/getReportList',
            payload: {page: pageNo}
        })
    }

    return (
        <div className={styles.cardWrapper}>
            <Spin spinning={loading}>
                <Row gutter={20}>
                    {renderCards()}
                </Row>
            </Spin>
            {
                total > 0 &&
				<Pagination
					style={{textAlign: 'right'}}
					size={"small"}
					current={page}
					total={total}
					onChange={onPageChange}
				/>
            }
        </div>
    )
}

export default connect(({report, loading}: any) => ({
    ...report,
    loading: loading.models.report
}))(Index)

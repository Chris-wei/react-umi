import React from 'react'
// @ts-ignore
import Banner from '@/assets/app_images/banner.jpg';
import styles from './index.less'

const Index = () => {
    return (
        <div className={styles.wrapper}>
            <img className={styles.img} src={Banner} alt=""/>
            <div className={styles.title}>我是一个动态页面~~~</div>
        </div>
    )
}

export default Index;

import React from 'react'
import styles from './index.less'

export default ({className, ...rest}: any) => {
    return (
        <div className={`${styles.wrapper} ${className}`} {...rest}/>
    )
}

import React from 'react'

export default () => {
    return (
        <div style={{
            height: '100vh',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', flexDirection: 'column'
        }}>
            <h1 className={'not-found'}>404</h1>
            <h4 className={'not-found-text'}>你访问的页面不见了</h4>
        </div>
    )
}

import React, {useEffect, useState} from 'react';
import styles from './index.less';
import {Affix,Dropdown, Menu} from 'antd';
import {UserOutlined} from '@ant-design/icons'
import {Link, useLocation,history} from "umi";

const MenuItem = Menu.Item;

const Menus = [{
    name: '首页',
    key: '/dashboard'
},{
    name: '用户',
    key: '/user'
},{
    name: '日报',
    key: '/report'
},{
    name: '动态页面',
    key: '/dynamic'
}]

export default () => {
    // 选中的key
    const [selectedKeys, setSelectedKeys] = useState([]);
    // 当前路径
    const {pathname} = useLocation();

    useEffect(() => {
        const key: string = pathname.length > 1 ? ('/' + pathname.split('/')[1]) : '/dashboard';
        setSelectedKeys([key] as never)
    }, [pathname])


    // 事件
    const handleLogOutClick = ()=>{
        localStorage.clear()
        history.replace('/login')
    }

    // 导航菜单
    const MemoMenu = React.memo(() =>
        <Menu className={styles.menu} theme={"dark"} mode={"horizontal"}
              selectedKeys={selectedKeys}>
            {
                Menus.map(menu =>
                    <MenuItem key={menu.key}><Link to={menu.key}>{menu.name}</Link></MenuItem>
                )
            }
        </Menu>
    )


    // 下拉菜单
    const DropMenu = (
        <Menu>
            <Menu.Item>
                <div className={styles.logout} onClick={handleLogOutClick}>退出</div>
            </Menu.Item>
        </Menu>
    )

    const MemoDropDown = React.memo(() =>
        <Dropdown overlay={DropMenu}>
            <div className={styles.dropBox}>
                <UserOutlined style={{fontSize: '18px', color: "#fff"}}/>
                <span className={styles.username}>admin</span>
            </div>
        </Dropdown>
    )

    return (
        <Affix offsetTop={0}>
			<div className={styles.header}>
				<img className={styles.logo} src={require('../../../assets/app_images/logo.png')} alt=""/>
				<MemoMenu/>
				<MemoDropDown/>
			</div>
        </Affix>
    )

}

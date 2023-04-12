import React, { useState } from 'react';
import {
    HomeOutlined,
    SettingOutlined,
    FormOutlined,
    OrderedListOutlined,
    BarChartOutlined,
    FundOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Menu, Tooltip, Spin } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authGetData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import allActions from '~/store/actions';

function getItem(label, key, icon, children, type, link) {
    return {
        key,
        icon,
        children,
        label,
        type,
        link,
    };
}

export default function Sidebar() {
    const [loading, setLoading] = useState(false);
    let location = useLocation();
    const token = localStorage.getItem('accessToken');

    const [dataMenu, setDataMenu] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        authGetData({
            url: `${Endpoint.LIST_MENU}`,
            setLoading,
            onSuccess: (res) => {
                if (res.statusCode === 200) {
                    dispatch(allActions.moduleActions.setModule(res.data));
                    setDataMenu(res.data);
                }
            },
        });
    }, [token]);

    const navigate = useNavigate();

    const items = dataMenu.map((array, index) => {
        const icons = {
            SettingOutlined: <SettingOutlined />,
            FormOutlined: <FormOutlined />,
            OrderedListOutlined: <OrderedListOutlined />,
            BarChartOutlined: <BarChartOutlined />,
            FundOutlined: <FundOutlined />,
            PieChartOutlined: <PieChartOutlined />,
        }[array.icon];
        return getItem(
            <Tooltip placement="right" title={array.name}>
                {array.name}
            </Tooltip>,
            array.name,
            icons,
            array.subItems.map((item, index2) => {
                return getItem(
                    <Tooltip placement="right" title={item.name}>
                        <Link to={item.url} className="link" key={item.link}>
                            {item.name}
                        </Link>
                    </Tooltip>,
                    item.url,
                );
            }),
        );
    });
    const trangchu = getItem(
        <Tooltip placement="right" title="Trang chủ">
            <Link to="/" className="link" key="/">
                Trang chủ
            </Link>
        </Tooltip>,
        'Trang chủ',
        <HomeOutlined />,
        null,
        null,
    );
    items.unshift(trangchu);

    const logoutHanlder = () => {
        localStorage.clear();
        navigate('/login');
    };

    const [submenu, setSubmenu] = useState([]);

    useEffect(() => {
        if (!dataMenu.find((item) => item.url === location.pathname)) {
            if (
                dataMenu.find((item) => item.subItems && item.subItems.find((item) => item.url === location.pathname))
            ) {
                const currentSubItem = dataMenu.find(
                    (item) => item.subItems && item.subItems.find((item) => item.url === location.pathname),
                );
                setSubmenu([currentSubItem.name]);
            } else {
                setSubmenu([]);
            }
            return;
        }
    }, [dataMenu, location.pathname]);

    // const onClick = (e) => {
    //     console.log('click ', e.keyPath[1]);
    // };

    return (
        <Spin spinning={loading}>
            <Menu
                // onClick={onClick}
                style={
                    {
                        // width: 256,
                    }
                }
                theme="dark"
                mode="inline"
                items={items}
                selectedKeys={location.pathname}
                openKeys={submenu}
                onOpenChange={(openKeys) => {
                    setSubmenu(openKeys);
                }}
            />
            <div></div>
        </Spin>
    );
}

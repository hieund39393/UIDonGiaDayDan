import React from 'react';
import { Button, notification, Space } from 'antd';

export default function Notification(props) {
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (props) => {
        console.log('vao');
        api[props.type]({
            message: props.message,
        });
    };
    return openNotificationWithIcon(props);
}

// const Notification = (props) => {
//     const [api, contextHolder] = notification.useNotification();
//     const openNotificationWithIcon = (message = props.message) => {
//         console.log('vao');
//         api[props.type]({
//             message: { message },
//         });
//     };
//     return console.log('ok');
// };
// export default Notification;

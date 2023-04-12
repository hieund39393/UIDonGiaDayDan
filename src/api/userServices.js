import * as request from '../utils/request';
import { notification } from 'antd';
import { authGetData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';

export const listUser = async (params) => {
    authGetData({
        url: `${Endpoint.LIST_USERS}?${params}`,
        onSuccess: (res) => {
            if (res.statusCode === 200) {
                return res.data;
            }
        },
    });

    // try {
    //     const res = await request.get(`/user?${params}`);
    //     return res;
    // } catch (error) {
    //     console.log(error);
    // }
};

// export const createUser = async (values) => {
//     try {
//         const res = await request.post('/auth/login', values);
//         return res.data;
//     } catch (error) {
//         console.log(error);
//     }
// };

// export const login = async (values) => {
//     try {
//         const res = await request.post('/auth/login', values);
//         console.log('resAPI: ' + res);
//         return res;
//     } catch (error) {
//         notification.error({ message: error.response.data.message });
//     }
// };

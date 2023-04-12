import * as request from '../utils/request';
import { Endpoint } from '~/utils/endpoint';
import { authGetData } from '~/utils/request';

export const listPosition = async () => {
    authGetData({
        url: `${Endpoint.LIST_POSITION}`,
        onSuccess: (res) => {
            if (res.statusCode === 200) {
                return res.data;
            }
        },
    });

    // try {
    //     const res = await request.get('/common/list-position', {
    //         params: {},
    //     });
    //     return res.data;
    // } catch (error) {
    //     console.log(error);
    // }
};

export const listViTriCuaHang = async () => {
    authGetData({
        url: `${Endpoint.LIST_LOCATION_STORE}`,
        onSuccess: (res) => {
            if (res.statusCode === 200) {
                return res.data;
            }
        },
    });

    // try {
    //     const res = await request.get('/common/vi-tri-cua-hang', {
    //         params: {},
    //     });
    //     return res.data;
    // } catch (error) {
    //     console.log(error);
    // }
};

export const listMenuBaoCao = async () => {
    authGetData({
        url: `${Endpoint.LIST_MENU_BAOCAO}`,
        onSuccess: (res) => {
            if (res.statusCode === 200) {
                return res.data;
            }
        },
    });

    // try {
    //     const res = await request.get('/common/list-menu-baocao', {
    //         params: {},
    //     });
    //     return res.data;
    // } catch (error) {
    //     console.log(error);
    // }
};

export const listMenu = async () => {
    authGetData({
        url: `${Endpoint.LIST_MENU}`,
        onSuccess: (res) => {
            if (res.statusCode === 200) {
                console.log('res menu: ' + JSON.stringify(res.data));
                return res.data;
            }
        },
    });

    // try {
    //     const res = await request.get('/common/list-menu', {
    //         params: {},
    //     });
    //     return res.data;
    // } catch (error) {
    //     console.log(error);
    // }
};

export const listPhongBan = async () => {
    authGetData({
        url: `${Endpoint.LIST_DEPARTMENT}`,
        onSuccess: (res) => {
            if (res.statusCode === 200) {
                return res.data;
            }
        },
    });

    // try {
    //     const res = await request.get('/common/list-department', {
    //         params: {},
    //     });
    //     return res.data;
    // } catch (error) {
    //     console.log(error);
    // }
};

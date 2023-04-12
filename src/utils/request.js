import {
    DEBOUNCE_INPUT_SEARCH_DELAY,
    METHOD_DELETE,
    METHOD_GET,
    METHOD_POST,
    NAVIGATE_DANGNHAP,
    STATUSCODE_200,
    STATUSCODE_401,
    STATUSCODE_500,
    TOKEN_NAME,
    BASE_API_URL,
} from './constants';
import { Modal, notification } from 'antd';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { alertMessage, debounce } from './function';
notification.config({
    maxCount: 1,
    duration: 2,
});

Axios.interceptors.response.use(
    (response) => {
        // do something with the response data
        if (response && response.data.statusCode === STATUSCODE_500) {
            notification.error({
                message: 'Thông báo!',
                description: response.data.message,
            });
        }
        if (response && response.data.statusCode === STATUSCODE_200 && response.data.message) {
            notification.success({
                message: 'Thông báo!',
                description: response.data.message,
            });
        }
        return response;
    },
    (error) => {
        notification.config({
            maxCount: 1,
            duration: 2,
        });
        let mess = '';
        if (error.response.status === STATUSCODE_401) {
            window.location.href = NAVIGATE_DANGNHAP;
            localStorage.clear();
            return;
        }
        if (error && error.response) {
            mess = error.response.data.message;
            if (mess) {
                console.log('res', mess);

                notification.error({
                    message: 'Thông báo!',
                    description: (
                        <p
                            dangerouslySetInnerHTML={{
                                __html: mess,
                            }}
                        />
                    ),
                });
            }
        } else {
            notification.error({
                message: 'Thông báo!',
                description: 'Lỗi hệ thống',
                maxCount: 1,
            });
        }
        return error.response;
    },
);

async function defaultGet(endpoint) {
    return await Axios({
        method: METHOD_GET,
        url: endpoint,
    });
}
export async function getData({ url, onSuccess }) {
    // setLoading(true);
    try {
        const res = await defaultGet(url);
        if (res && res.data) {
            onSuccess(res.data);
        }
    } catch (err) {
    } finally {
        // setLoading(false);
    }
}

async function defaultPost(endpoint, method, payload) {
    const body = {};
    Object.keys(payload).forEach((key) => {
        body[key] = payload[key];

        if (payload[key] || typeof payload[key] === 'boolean' || typeof payload[key] === 'number') {
            body[key] = payload[key];
        }
        return null;
    });
    return await Axios({
        headers: {},
        method: method,
        url: endpoint,
        data: body,
    });
}
export async function authGetData({ url, onSuccess, setLoading }) {
    setLoading(true);
    try {
        const res = await authGet(url);
        if (res && res.data) {
            onSuccess(res.data);
        }
    } catch (err) {
    } finally {
        setLoading(false);
    }
}

export async function postData({ url, payload, method = METHOD_POST, onSuccess, setLoading }) {
    setLoading(true);
    try {
        const res = await defaultPost(url, method, payload);
        if (res && res.data) {
            onSuccess(res.data);
        }
    } catch (err) {
        console.log('err' + err);
    } finally {
        setLoading(false);
    }
}

export async function authGet(endpoint) {
    const token = localStorage.getItem(TOKEN_NAME);
    return await Axios({
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: METHOD_GET,
        url: endpoint,
    });
}

async function authPost(endpoint, method, payload) {
    const token = localStorage.getItem(TOKEN_NAME);
    const body = {};
    Object.keys(payload).forEach((key) => {
        if (payload[key] || typeof payload[key] === 'boolean' || typeof payload[key] === 'number') {
            body[key] = payload[key];
        }
        return {};
    });
    return await Axios({
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: method,
        url: endpoint,
        data: body,
    });
}
export async function authPostData({ url, method, payload, setLoading, onSuccess }) {
    setLoading(true);
    try {
        const res = await authPost(url, method, payload);
        if (res && res.data) {
            onSuccess(res.data);
        }
    } catch (err) {
    } finally {
        setLoading(false);
    }
}

/// delete
async function authDelete(endpoint) {
    const token = localStorage.getItem(TOKEN_NAME);
    return await Axios({
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: METHOD_DELETE,
        url: endpoint,
    });
}
export async function startDelete({ url, setLoading, onSuccess }) {
    setLoading(true);
    try {
        const res = await authDelete(url);
        if (res && res.data) {
            onSuccess(res.data);
        }
    } catch (err) {
    } finally {
        setLoading(false);
    }
}
export function authDeleteData({
    url,
    setLoading,
    onSuccess,
    content = 'Bạn có chắc chắn muốn xóa !',
    title = 'Xác nhận',
}) {
    Modal.confirm({
        centered: true,
        title,
        content,
        onOk() {
            startDelete({ url, setLoading, onSuccess });
        },
        onCancel() {},
        okText: 'Đồng ý',
        okButtonProps: { type: 'danger' },
        cancelText: 'Hủy',
    });
}

export const downLoadFile = async (parmas) => {
    const res = Axios({
        headers: {
            Accept: 'application/json',
            // Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
        method: 'GET',
        url: `${BASE_API_URL}${parmas}`,
    });
    return res;
};
// export default request;

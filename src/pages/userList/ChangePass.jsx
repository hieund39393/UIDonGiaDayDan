import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Form, Input, Modal, Spin } from 'antd';
import { Endpoint } from '~/utils/endpoint';
import { authPostData } from '~/utils/request';
import { getErrorForm } from '~/utils/function';

export default function ChangPass(props) {
    const [form] = Form.useForm();
    const { close, detailData } = props;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(detailData);
    }, [detailData]);

    const onFinish = (values) => {
        console.log('ookkkkk');
        authPostData({
            url: `${Endpoint.USERS_CHANGE_MYPASS}`,
            method: 'PUT',
            setLoading,
            payload: {
                ...values,
            },
            onSuccess: (res) => {
                if (res.statusCode === 200 && res.data) {
                    form.resetFields();
                    close();
                } else {
                    getErrorForm(res, form);
                }
            },
        });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Spin spinning={loading}>
            <Form
                name="basic"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 16,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    label="Mật khẩu cũ"
                    name="oldPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Mật khẩu cũ không được để trống!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu mới"
                    name="newPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Mật khẩu mới không được để trống!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Xác nhận mật khẩu"
                    name="confirmNewPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Xác nhận mật khẩu không được để trống!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 11,
                        span: 11,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
}

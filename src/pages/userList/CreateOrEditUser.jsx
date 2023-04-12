import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Form, Input, Checkbox } from 'antd';
import { authPostData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import { getErrorForm } from '~/utils/function';
import Selection from '~/components/Select';

export default function CreateOrEditUser(props) {
    const [defaultPass, setDefaultPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { getUserList, close, detailData } = props;

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(detailData);
    }, [detailData]);

    const onFinish = (values) => {
        authPostData({
            url: `${Endpoint.LIST_USERS}`,
            method: 'POST',
            setLoading,
            payload: {
                ...values,
                defaultPassword: defaultPass,
            },
            onSuccess: (res) => {
                if (res.statusCode === 200 && res.data) {
                    form.resetFields();
                    close();
                    getUserList();
                } else {
                    getErrorForm(res, form);
                }
            },
        });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    console.log(defaultPass);

    return (
        <Form
            name="basic"
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                ...detailData,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
        >
            <Row>
                <Col span={12}>
                    <Form.Item name="id" style={{ display: 'none' }}></Form.Item>
                    <Form.Item
                        label="Tên đăng nhập"
                        name="userName"
                        rules={[
                            {
                                required: true,
                                message: 'Tên đăng nhập không được để trống!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    {detailData.id || defaultPass ? (
                        <></>
                    ) : (
                        <Form.Item label="Mật khẩu" name="password">
                            <Input.Password
                            //  placeholder="Tối thiểu 6 ký tự" minLength={6}
                            />
                        </Form.Item>
                    )}

                    <Form.Item
                        label="Họ và tên"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Họ và tên không được để trống!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="positionCode" label="Chức vụ">
                        <Selection
                            url={Endpoint.LIST_POSITION}
                            formKey="positionCode"
                            form={form}
                            placeholder="Chọn chức vụ"
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Mật khẩu mặc định" name="defaultPassword">
                        <Checkbox onChange={(values) => setDefaultPass(values.target.checked)} />
                    </Form.Item>

                    {detailData.id || defaultPass ? (
                        <></>
                    ) : (
                        <Form.Item label="Xác nhận mật khẩu" name="confirmPassword">
                            <Input.Password />
                        </Form.Item>
                    )}

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Email không được để trống!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Điện thoại" name="phone">
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

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
    );
}

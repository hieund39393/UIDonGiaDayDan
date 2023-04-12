import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Form, Input, Select, Option, Spin, EditOutlined } from 'antd';
import { width } from '@mui/system';
import { authPostData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import { getErrorForm } from '~/utils/function';
import Selection from '~/components/Select';

export default function CreateOrEditCongViec(props) {
    const [form] = Form.useForm();
    const { getCongViecList, close, detailData } = props;

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(detailData);
    }, [detailData]);

    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        console.log(values);
        authPostData({
            url: `${Endpoint.CRUD_CONGVIEC}`,

            method: detailData.id ? 'PUT' : 'POST',
            setLoading,
            payload: {
                ...values,
            },
            onSuccess: (res) => {
                if (res.statusCode === 200 && res.data) {
                    form.resetFields();
                    close();
                    getCongViecList();
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
            <Form.Item name="id" style={{ display: 'none' }}></Form.Item>

            <Form.Item
                label="Mã công việc"
                name="maCongViec"
                rules={[
                    {
                        required: true,
                        message: 'Mã công việc không được để trống!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Tên công việc"
                name="tenCongViec"
                rules={[
                    {
                        required: true,
                        message: 'Tên công việc không được để trống!',
                    },
                ]}
            >
                <Input />
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
    );
}

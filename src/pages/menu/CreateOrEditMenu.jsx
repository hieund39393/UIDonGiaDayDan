import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Switch } from 'antd';
import { authPostData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import { getErrorForm } from '~/utils/function';
import Selection from '~/components/Select';

export default function CreateOrEditMenu(props) {
    const [form] = Form.useForm();
    const { getMenuList, close, detailData } = props;

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(detailData);
    }, [detailData]);

    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        console.log(values);
        authPostData({
            url: `${Endpoint.CRUD_MENU}`,
            method: 'POST',
            setLoading,
            payload: {
                ...values,
            },
            onSuccess: (res) => {
                if (res.statusCode === 200 && res.data) {
                    form.resetFields();
                    close();
                    getMenuList();
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
                name="moduleId"
                label="Chức năng"
                rules={[
                    {
                        required: true,
                        message: 'Chức năng không được để trống!',
                    },
                ]}
            >
                <Selection
                    url={Endpoint.LIST_MODULE}
                    formKey="moduleId"
                    form={form}
                    placeholder="--- Chọn chức năng ---"
                />
            </Form.Item>
            <Form.Item
                label="Tên trang"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Tên trang không được để trống!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Mã trang"
                name="code"
                rules={[
                    {
                        required: true,
                        message: 'Mã trang không được để trống!',
                    },
                ]}
            >
                <Input readOnly={detailData.id ? true : false} />
            </Form.Item>

            <Form.Item label="Trạng thái" name="isActive">
                <Switch defaultChecked={detailData.isActive ? true : false} />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Xác nhận
                </Button>
            </Form.Item>
        </Form>
    );
}

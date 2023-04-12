import React, { useEffect, useState, useCallback } from 'react';
import { Button, Form, Input, Tree } from 'antd';
import { authPostData, authGetData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import { getErrorForm } from '~/utils/function';
import { STATUSCODE_200 } from '~/utils/constants';
export default function CreateOrEditRole(props) {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { getRoleList, close, detailData } = props;
    console.log(detailData);
    const [treeData, setTreeData] = useState([]);
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState(detailData.permissions);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    // GetList Permission
    const getListPermission = useCallback(() => {
        authGetData({
            url: `${Endpoint.LIST_PERMISSION}`,
            setLoading,
            onSuccess: (res) => {
                if (res.statusCode === STATUSCODE_200) {
                    setTreeData(res.data);
                }
            },
        });
    }, []);

    useEffect(() => {
        getListPermission();
        form.resetFields();
        form.setFieldsValue(detailData);
        setExpandedKeys(detailData.permissions);
        setAutoExpandParent(false);
    }, [detailData]);

    const onExpand = (expandedKeysValue) => {
        console.log('onExpand', expandedKeysValue);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };
    const onCheck = (checkedKeysValue) => {
        console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
    };
    const onSelect = (selectedKeysValue, info) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };

    const onFinish = (values) => {
        authPostData({
            url: `${Endpoint.CRUD_ROLE}`,
            method: 'POST',
            setLoading,
            payload: {
                ...values,
                permissions: checkedKeys,
            },
            onSuccess: (res) => {
                if (res.statusCode === 200 && res.data) {
                    form.resetFields();
                    close();
                    getRoleList();
                } else {
                    getErrorForm(res, form);
                }
            },
        });
    };
    return (
        <Form
            name="basic"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                ...detailData,
            }}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
        >
            <Form.Item name="id" style={{ display: 'none' }}></Form.Item>
            <Form.Item
                label="Tên quyền"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Tên nhóm quyền không được để trống!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <div className="tree-container">
                {treeData ? (
                    <Tree
                        checkable
                        onExpand={onExpand}
                        expandedKeys={expandedKeys}
                        autoExpandParent={autoExpandParent}
                        onCheck={onCheck}
                        checkedKeys={checkedKeys}
                        onSelect={onSelect}
                        selectedKeys={selectedKeys}
                        treeData={treeData}
                    />
                ) : (
                    <></>
                )}
            </div>

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

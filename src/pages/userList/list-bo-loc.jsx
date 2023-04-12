import { Button, Col, Form, Input, Row, Tooltip } from 'antd';
import React, { useEffect } from 'react';
import { InfoCircleOutlined, SearchOutlined } from '@ant-design/icons';

export function FormBoLoc(props) {
    const { handleSearch, form, handleOpenModal } = props;

    useEffect(() => {
        form.resetFields();
    }, []);

    return (
        <Form form={form} name="filter-form" onFinish={handleSearch} layout="vertical" autoComplete="off">
            <Row gutter={24} justify="space-between" align="middle">
                <Col span={24} sm={12} xl={8}>
                    <Form.Item name="searchTerm" label="Tìm kiếm dữ liệu" className="form-filter-table">
                        <Input
                            prefix={<SearchOutlined />}
                            suffix={
                                <Tooltip
                                    title={'Hỗ trợ tìm kiếm theo Tên đăng nhập, Tên đầy đủ, Mã nhân viên, Mã quản lý'}
                                >
                                    <InfoCircleOutlined />
                                </Tooltip>
                            }
                        />
                    </Form.Item>
                </Col>

                <Col span={24} sm={12} xl={8} style={{ textAlign: 'right', paddingTop: '15px' }}>
                    <Button type="primary" htmlType="submit" style={{ marginRight: '15px' }} form="filter-form">
                        Tìm kiếm
                    </Button>

                    <Button type="primary" onClick={() => handleOpenModal()}>
                        Thêm mới
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

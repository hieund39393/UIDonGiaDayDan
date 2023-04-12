import React, { useCallback, useEffect, useState, map, useForm } from 'react';
import { Col, Form, Row, Button, DatePicker, Space, Input, Select } from 'antd';
import FormComponent from './Form';
import * as commonServices from '../api/commonServices';
import { buildQueryString, parseParams } from '../utils/function';

const onChange = (date, dateString) => {
    console.log(date, dateString);
};

export function FormBaoCao(props) {
    const [switchMenu, setSwitchMenu] = useState(props);

    const { handleSearch } = props;
    console.log(props);
    const [form] = Form.useForm();

    useEffect(() => {
        console.log('reset');
        form.resetFields();
    }, []);

    const [dataCH, setListViTriCuaHang] = useState([]);
    const [dataPB, setListPhongBan] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await commonServices.listViTriCuaHang();
            setListViTriCuaHang(result);
        };
        fetchApi();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await commonServices.listPhongBan();
            setListPhongBan(result);
        };
        fetchApi();
    }, []);

    return (
        <FormComponent
            width="1200px"
            form={form}
            name="filter-form"
            onFinish={handleSearch}
            layout="vertical"
            autoComplete="off"
        >
            <Row gutter={24}>
                <Col span={24} xl={8}>
                    <Form.Item
                        label="Mã nhân viên"
                        name="userId"
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24} xl={8}>
                    <Form.Item
                        name="fromDate"
                        label="Từ ngày"
                        rules={[
                            {
                                message: 'Từ ngày không được để trống!',
                                required: true,
                            },
                        ]}
                    >
                        <DatePicker style={{ width: '100%' }}></DatePicker>
                    </Form.Item>
                </Col>
                <Col span={24} xl={8}>
                    <Form.Item
                        name="toDate"
                        label="Đến ngày"
                        rules={[
                            {
                                required: true,
                                message: 'Đến ngày không được để trống! ',
                            },
                        ]}
                    >
                        <DatePicker name="toDate" style={{ width: '100%' }}></DatePicker>
                    </Form.Item>
                </Col>

                <Col span={24} xl={8}>
                    <Form.Item label="Vị trí" name="position">
                        <Select
                            defaultValue=""
                            showSearch
                            placeholder="--- Chọn vị trí ---"
                            style={{ width: '100%' }}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {Object.entries(dataCH).map(([key, value]) => (
                                <Select.Option key={key} value={value.value}>
                                    {value.text}
                                </Select.Option>
                            ))}
                            ;
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={24} xl={8}>
                    <Form.Item label="Phòng ban" name="department">
                        <Select
                            defaultValue=""
                            showSearch
                            placeholder="--- Chọn vị trí ---"
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {Object.entries(dataPB).map(([key, value]) => (
                                <Select.Option key={key} value={value.value}>
                                    {value.text}
                                </Select.Option>
                            ))}
                            ;
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Button type="primary" htmlType="submit" form="filter-form">
                Xuất Excel
            </Button>
        </FormComponent>
    );
}

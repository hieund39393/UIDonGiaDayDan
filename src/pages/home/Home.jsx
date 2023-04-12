import { Table, Input } from 'antd';
import React, { useState } from 'react';

import './home.css';
export default function Home() {
    const [data, setData] = useState([
        {
            stt: '1',
            ma: 'ma',
            noiDungCongViec: 'Công việc 1',
            donVi: 'Đơn vị 1',
            soLuong: 1,
            k1nc: 1,
            k2nc: 2,
            kmtc: 3,
            vatLieu: 100000,
            nCong: 20000,
            mTC: 30000,
            cpChung: 40000,
            cpNhaTam: 50000,
            cpCongViec: 60000,
            thuNhapChiuThueTT: 70000,
            donGiaTruocThue: 80000,
            giaTriTruocThue: 90000,
        },
        {
            stt: '2',
            ma: 'Joe Black',
            noiDungCongViec: 'Công việc 2',
            donVi: 'Đơn vị 2',
            soLuong: 2,
            k1nc: 2,
            k2nc: 3,
            kmtc: 4,
            vatLieu: 200000,
            nCong: 30000,
            mTC: 40000,
            cpChung: 50000,
            cpNhaTam: 60000,
            cpCongViec: 70000,
            thuNhapChiuThueTT: 80000,
            donGiaTruocThue: 90000,
            giaTriTruocThue: 100000,
        },
    ]);

    const handleInputChange = (event, record, dataIndex) => {
        const newValue = event.target.value;
        const newData = [...data];

        console.log(dataIndex);
        console.log('record' + JSON.stringify(newData));

        const recordIndex = newData.findIndex((item) => item.stt === record.stt);
        newData[recordIndex][dataIndex] = newValue;
        setData(newData);
    };

    const columns = [
        { title: 'Số TT', dataIndex: 'stt', key: 'stt' },
        {
            title: 'Mã',
            dataIndex: 'ma',
            key: 'ma',
        },
        {
            title: 'Nội dung công việc',
            dataIndex: 'noiDungCongViec',
            key: 'noiDungCongViec',
        },
        {
            title: 'Đơn vị',
            dataIndex: 'donVi',
            key: 'donVi',
        },
        {
            title: 'Số lượng',
            dataIndex: 'soLuong',
            key: 'soLuong',
            render: (text, record) => (
                <Input value={text} onChange={(event) => handleInputChange(event, record, 'soLuong')} />
            ),
        },
        {
            title: 'Hệ số điều chỉnh',
            children: [
                {
                    title: 'K1nc',
                    dataIndex: 'k1nc',
                    key: 'k1nc',
                    render: (text, record) => (
                        <Input value={text} onChange={(event) => handleInputChange(event, record, 'k1nc')} />
                    ),
                },
                {
                    title: 'K2nc',
                    dataIndex: 'k2nc',
                    key: 'k2nc',
                    render: (text, record) => (
                        <Input value={text} onChange={(event) => handleInputChange(event, record, 'k2nc')} />
                    ),
                },
                {
                    title: 'Kmtc',
                    dataIndex: 'kmtc',
                    key: 'kmtc',
                    render: (text, record) => (
                        <Input value={text} onChange={(event) => handleInputChange(event, record, 'kmtc')} />
                    ),
                },
            ],
        },
        {
            title: 'Đơn giá',
            children: [
                {
                    title: 'Vật liệu',
                    dataIndex: 'vatLieu',
                    key: 'vatLieu',
                    render: (text, record) => (
                        <Input value={text} onChange={(event) => handleInputChange(event, record, 'vatLieu')} />
                    ),
                },
                {
                    title: 'N/công',
                    dataIndex: 'nCong',
                    key: 'nCong',
                    render: (text, record) => (
                        <Input value={text} onChange={(event) => handleInputChange(event, record, 'nCong')} />
                    ),
                },
                {
                    title: 'MTC',
                    dataIndex: 'mTC',
                    key: 'mTC',
                    render: (text, record) => (
                        <Input value={text} onChange={(event) => handleInputChange(event, record, 'mTC')} />
                    ),
                },
            ],
        },
        {
            title: 'CP gián tiếp',
            children: [
                {
                    title: 'CP Chung',
                    dataIndex: 'cpChung',
                    key: 'cpChung',
                    render: (text, record) => (
                        <Input value={text} onChange={(event) => handleInputChange(event, record, 'cpChung')} />
                    ),
                },
                {
                    title: 'CP nhà tạm',
                    dataIndex: 'cpNhaTam',
                    key: 'cpNhaTam',
                    render: (text, record) => (
                        <Input value={text} onChange={(event) => handleInputChange(event, record, 'cpNhaTam')} />
                    ),
                },
                {
                    title: 'CP công việc không XĐ được từ thiết kế',
                    dataIndex: 'cpCongViec',
                    key: 'cpCongViec',
                    render: (text, record) => (
                        <Input value={text} onChange={(event) => handleInputChange(event, record, 'cpCongViec')} />
                    ),
                },
            ],
        },
        {
            title: 'Thu nhập chịu thuế TT',
            dataIndex: 'thuNhapChiuThue',
            key: 'thuNhapChiuThue',
            render: (text, record) => (
                <Input value={text} onChange={(event) => handleInputChange(event, record, 'thuNhapChiuThue')} />
            ),
        },
        {
            title: 'Đơn giá trước thuế',
            dataIndex: 'donGiaTruocThue',
            key: 'donGiaTruocThue',
            render: (text, record) => (
                <Input value={text} onChange={(event) => handleInputChange(event, record, 'donGiaTruocThue')} />
            ),
        },
        {
            title: 'Giá trị trước thuế',
            dataIndex: 'giaTriTruocThue',
            key: 'giaTriTruocThue',
            render: (text, record) => (
                <Input value={text} onChange={(event) => handleInputChange(event, record, 'giaTriTruocThue')} />
            ),
        },
    ];

    return <Table dataSource={data} pagination={false} columns={columns} rowKey={(record) => record.stt} bordered />;
}

import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Form, Spin, Modal, Tooltip } from 'antd';
import { buildQueryString, parseParams, handlePagination, removeUndefinedAttribute } from '~/utils/function';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { STATUSCODE_200 } from '~/utils/constants';
import { authGetData, authDeleteData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import moment from 'moment';
import { FORMAT_DATE } from '~/utils/constants';
import FormBoLoc from './list-bo-loc';
import { DEFAULT_PAGESIZE, DEFAULT_PAGEINDEX } from '~/utils/constants';
import CreateOrEditBieuGia from './CreateOrEditBieuGia';
import { permission } from '~/permissions/index';
import CheckPermission from '~/components/CheckPermission';

export default function BieuGia() {
    const [open, setOpen] = useState(false);
    const [detailData, setDetailData] = useState({});

    const [loading, setLoading] = useState(false);
    const [, setSearchParams] = useSearchParams();
    const location = useLocation();
    const [data, setData] = useState([]);
    const [total, setTotal] = useState();
    const [isDoubleClick] = useState(true);
    const [form] = Form.useForm();

    const [filterConditions, setFilterConditions] = useState({
        pageSize: DEFAULT_PAGESIZE,
        pageIndex: DEFAULT_PAGEINDEX,
        ...parseParams(location.search),
    });

    // Get List BieuGia
    const getBieuGiaList = useCallback(() => {
        const query = buildQueryString(filterConditions);
        authGetData({
            url: `${Endpoint.CRUD_BIEUGIA}?${query}`,
            setLoading,
            onSuccess: (res) => {
                if (res.statusCode === STATUSCODE_200) {
                    // setData(res.data);
                    setData(
                        res.data.map((item, index) => {
                            return {
                                ...item,
                                STT: (filterConditions.pageIndex - 1) * filterConditions.pageSize + (index + 1),
                            };
                        }),
                    );
                    setTotal(res.paging.totalCount);
                }
            },
        });
        setSearchParams(removeUndefinedAttribute(filterConditions));
    }, [filterConditions]);
    useEffect(() => {
        getBieuGiaList();
    }, [filterConditions]);

    // Edit
    const handleOpenModal = useCallback(
        (row) => {
            if (row !== undefined) setDetailData(row);
            else setDetailData({});
            setOpen(!open);
        },
        [open],
    );

    const handleDelete = useCallback((id) => {
        authDeleteData({
            url: `${Endpoint.CRUD_BIEUGIA}/${id}`,
            setLoading,
            onSuccess: () => {
                getBieuGiaList();
            },
        });
    });

    const handleCancel = useCallback(() => {
        setOpen(false);
    }, []);

    // Handler Search

    const onChangePagination = (paging, filters, sorter) => {
        handlePagination(paging, sorter, setFilterConditions);
    };

    const handleSearch = useCallback((values) => {
        setFilterConditions((oldState) => ({
            ...oldState,
            ...values,
            pageIndex: DEFAULT_PAGEINDEX,
            pageSize: DEFAULT_PAGESIZE,
        }));
    }, []);

    const columns = [
        {
            title: 'STT',
            width: '5%',
            dataIndex: 'STT',
            fixed: 'left',
        },
        {
            title: 'Loại biểu giá',
            width: '20%',
            dataIndex: 'tenLoaiBieuGia',
            fixed: 'left',
        },
        {
            title: 'Tên',
            width: '25%',
            dataIndex: 'tenBieuGia',
            key: 'id',
            fixed: 'left',
        },
        {
            title: 'Mã',
            width: '25%',
            dataIndex: 'maBieuGia',
            fixed: 'left',
        },

        {
            title: 'Ngày tạo',
            width: '15%',
            dataIndex: 'createdDate',
            fixed: 'center',
            render: (createdDate) => <span>{createdDate ? moment(createdDate).format(FORMAT_DATE) : null}</span>,
        },
        {
            title: 'Tác vụ',
            width: '15%',
            fixed: 'center',
            render: (row) => (
                <div>
                    <CheckPermission permissionCode={permission.p_bieugia_sua}>
                        <a className="edit-icons">
                            <Tooltip title="Sửa">
                                <EditOutlined onClick={() => handleOpenModal(row)} />
                            </Tooltip>
                        </a>
                    </CheckPermission>
                    <CheckPermission permissionCode={permission.p_bieugia_xoa}>
                        <a className="delete-icons">
                            <Tooltip title="Xóa">
                                <DeleteOutlined onClick={() => handleDelete(row.id)} />
                            </Tooltip>
                        </a>
                    </CheckPermission>
                </div>
            ),
        },
    ];
    return (
        <div className="table-container">
            <Spin spinning={loading}>
                <Modal
                    destroyOnClose={true}
                    open={open}
                    title={detailData.id ? 'Cập nhật loại biểu giá' : 'Thêm mới loại biểu giá'}
                    onCancel={handleCancel}
                    footer={[]}
                    width="800px"
                >
                    <CreateOrEditBieuGia getBieuGiaList={getBieuGiaList} close={handleCancel} detailData={detailData} />
                </Modal>
                <div className="filter-table">
                    <FormBoLoc handleSearch={handleSearch} handleOpenModal={handleOpenModal} form={form} />
                </div>

                <div className="table-list">
                    <Table
                        columns={columns}
                        dataSource={data}
                        rowKey={(record) => record.id}
                        onChange={onChangePagination}
                        pagination={{
                            total: total ? total : 0,
                            defaultpageSize: DEFAULT_PAGESIZE,
                            defaultCurrent: 1,
                            current: parseInt(filterConditions.pageIndex),
                            pageSize: parseInt(filterConditions.pageSize),
                            showSizeChanger: true,
                            showLessItems: true,
                            pageSizeOptions: ['5', '10', '20', '50', '100'],
                            showTotal: (total) => `Tổng ${total} bản ghi`,
                        }}
                        bordered
                    />
                </div>
            </Spin>
        </div>
    );
}

import React from 'react';
import { EditOutlined, ApartmentOutlined } from '@ant-design/icons';
import { Table, Form, Spin, Modal, Tooltip } from 'antd';
import { buildQueryString, parseParams, handlePagination, removeUndefinedAttribute } from '~/utils/function';
import { useEffect, useState, useCallback } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { authGetData } from '~/utils/request';
import { Endpoint } from '~/utils/endpoint';
import CreateOrEditUser from './CreateOrEditUser';
import { DEFAULT_PAGEINDEX, DEFAULT_PAGESIZE, STATUSCODE_200 } from '~/utils/constants';
import { FormBoLoc } from './list-bo-loc';
import AddUserRole from './AddUserRole';
import CheckPermission from '~/components/CheckPermission';
import { permission } from '~/permissions/index';

export default function UserList() {
    const [form] = Form.useForm();

    const [openAddRole, setOpenAddRole] = useState(false);
    const [open, setOpen] = useState(false);
    const [detailData, setDetailData] = useState({});

    const [loading, setLoading] = useState(false);
    const [, setSearchParams] = useSearchParams();
    const [data, setData] = useState([]);
    const location = useLocation();
    const [total, setTotal] = useState();

    const [filterConditions, setFilterConditions] = useState({
        pageSize: DEFAULT_PAGESIZE,
        pageIndex: DEFAULT_PAGEINDEX,
        ...parseParams(location.search),
    });

    // Get List
    const getUserList = useCallback(() => {
        const query = buildQueryString(filterConditions);
        authGetData({
            url: `${Endpoint.LIST_USERS}?${query}`,
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
        getUserList();
    }, [filterConditions]);

    // Thêm sửa xóa
    const handleOpenModal = useCallback(
        (row) => {
            if (row !== undefined) setDetailData(row);
            else setDetailData({});
            setOpen(!open);
        },
        [open],
    );

    const handleCancel = useCallback(() => {
        setOpen(false);
        setOpenAddRole(false);
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

    // Phân quyền
    const handleAddRole = useCallback(
        (row) => {
            if (row !== undefined) setDetailData(row);
            else setDetailData({});
            setOpenAddRole(!openAddRole);
        },
        [openAddRole],
    );

    const columns = [
        {
            title: 'Họ và tên',
            width: 300,
            dataIndex: 'name',
            fixed: 'left',
        },
        {
            title: 'Tên đăng nhập',
            width: 200,
            dataIndex: 'userName',
            key: 'id',
            fixed: 'left',
        },
        {
            title: 'Email',
            width: 300,
            dataIndex: 'email',
            fixed: 'left',
        },
        {
            width: 300,
            title: 'Chức vụ',
            dataIndex: 'positionName',
        },
        {
            title: 'Trạng thái',
            width: 150,
            render: () => <a>Hoạt động</a>,
        },
        {
            title: 'Tác vụ',
            width: 100,
            render: (row) => (
                <div>
                    <CheckPermission permissionCode={permission.qtht1_sua}>
                        <a className="edit-icons">
                            <Tooltip title="Sửa">
                                <EditOutlined onClick={() => handleOpenModal(row)} />
                            </Tooltip>
                        </a>
                    </CheckPermission>

                    <CheckPermission permissionCode={permission.qtht1_phanquyen}>
                        <a className="edit-icons">
                            <Tooltip title="Phân quyền">
                                <ApartmentOutlined onClick={() => handleAddRole(row)} />
                            </Tooltip>
                        </a>
                    </CheckPermission>
                    {/* 
                    <a className="delete-icons">
                        <Tooltip title="Xóa">
                            <DeleteOutlined onClick={() => handleDelete(row.id)} />
                        </Tooltip>
                    </a> */}
                </div>
            ),
        },
    ];
    return (
        <div className="table-container">
            <Spin spinning={loading}>
                <div className="modal-popup">
                    <Modal
                        open={openAddRole}
                        title="Phân quyền người dùng"
                        onCancel={handleCancel}
                        footer={[]}
                        width="1000px"
                    >
                        <AddUserRole getUserList={getUserList} close={handleCancel} detailData={detailData} />
                    </Modal>

                    <Modal
                        open={open}
                        title={detailData.id ? 'Cập nhật người dùng' : 'Thêm mới'}
                        onCancel={handleCancel}
                        footer={[]}
                        width="1200px"
                    >
                        <CreateOrEditUser getUserList={getUserList} close={handleCancel} detailData={detailData} />
                    </Modal>
                </div>
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

import { BASE_API_URL } from '~/utils/constants';
export const Endpoint = {
    //hệ thống
    LOGIN: `${BASE_API_URL}/auth/login`,

    // Common
    LIST_POSITION: `${BASE_API_URL}/common/list-chuc-vu`,
    LIST_MENU: `${BASE_API_URL}/common/list-menu`,
    LIST_MODULE: `${BASE_API_URL}/common/list-module`,

    // User
    LIST_USERS: `${BASE_API_URL}/user`,

    // Role
    CRUD_ROLE: `${BASE_API_URL}/role`,
    LIST_PERMISSION: `${BASE_API_URL}/role/list-permission`,
    LIST_ROLE: `${BASE_API_URL}/common/list-nhom-quyen`,
    ADD_USER_ROLE: `${BASE_API_URL}/user/add-user-roles`,
    // Menu
    CRUD_MENU: `${BASE_API_URL}/menu`,

    ////////// QUẢN TRỊ DANH MỤC
    GET_ALL_LOAIBIEUGIA: `${BASE_API_URL}/loaibieugia/get-all`,

    CRUD_LOAIBIEUGIA: `${BASE_API_URL}/loaibieugia`,
    CRUD_BIEUGIA: `${BASE_API_URL}/bieugia`,
    CRUD_CONGVIEC: `${BASE_API_URL}/congviec`,
    CRUD_VUNG: `${BASE_API_URL}/vung`,
    CRUD_KHUVUC: `${BASE_API_URL}/khuvuc`,
};

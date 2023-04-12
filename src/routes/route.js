import { MODULE_HETHONG } from '~/utils/constants';
import { permission } from '~/permissions/index';
import Home from '~/pages/home/Home';
import UserList from '~/pages/userList/UserList';
import QuanLyPhanQuyen from '~/pages/role/Role';
import QuanLyTrang from '~/pages/menu/Menu';
import LoaiBieuGia from '~/pagequantridanhmuc/loaibieugia/LoaiBieuGia';
import BieuGia from '~/pagequantridanhmuc/bieugia/BieuGia';
import CongViec from '~/pagequantridanhmuc/congviec/CongViec';
import Vung from '~/pagequantridanhmuc/vung/Vung';
import KhuVuc from '~/pagequantridanhmuc/khuvuc/KhuVuc';

const privateRoutes = [
    {
        title: 'Trang chủ',
        path: '/',
        component: Home,
        permissionCode: '',
        parentTitle: '',
    },
    {
        title: 'Quản lý người dùng',
        path: '/nguoi-dung',
        component: UserList,
        permissionCode: permission.p_user,
        parentTitle: 'Quản trị hệ thống',
    },
    {
        title: 'Quản lý phân quyền',
        path: '/phan-quyen',
        component: QuanLyPhanQuyen,
        privateRoute: true,
        permissionCode: permission.p_role,
        parentTitle: 'Quản trị hệ thống',
    },
    {
        title: 'Quản lý trang',
        path: '/menu',
        component: QuanLyTrang,
        privateRoute: true,
        permissionCode: permission.p_menu,
        parentTitle: 'Quản trị hệ thống',
    },
    ////// QUẢN TRỊ DANH MỤC
    {
        title: 'Quản lý loại biểu giá',
        path: '/loai-bieu-gia',
        component: LoaiBieuGia,
        privateRoute: true,
        permissionCode: permission.p_loaibieugia,
        parentTitle: 'Quản trị danh mục',
    },
    {
        title: 'Quản lý biểu giá',
        path: '/bieu-gia',
        component: BieuGia,
        privateRoute: true,
        permissionCode: permission.p_bieugia,
        parentTitle: 'Quản trị danh mục',
    },
    {
        title: 'Quản lý công viẹc',
        path: '/cong-viec',
        component: CongViec,
        privateRoute: true,
        permissionCode: permission.p_congviec,
        parentTitle: 'Quản trị danh mục',
    },
    {
        title: 'Quản lý vùng',
        path: '/vung',
        component: Vung,
        privateRoute: true,
        permissionCode: permission.p_vung,
        parentTitle: 'Quản trị danh mục',
    },
    {
        title: 'Quản lý khu vực',
        path: '/khu-vuc',
        component: KhuVuc,
        privateRoute: true,
        permissionCode: permission.p_khuvuc,
        parentTitle: 'Quản trị danh mục',
    },
];

export default privateRoutes;

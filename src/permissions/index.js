const userPage = {
    p_user: '1.user',
    p_user_xem: '1.user.v',
    p_user_tao: '1.user.c',
    p_user_sua: '1.user.u',
    p_user_xoa: '1.user.d',
};
const rolePage = {
    p_role: '1.role',
    p_role_xem: '1.role.v',
    p_role_tao: '1.role.c',
    p_role_sua: '1.role.u',
    p_role_xoa: '1.role.d',
};
const menuPage = {
    p_menu: '1.menu',
    p_menu_xem: '1.menu.v',
    p_menu_tao: '1.menu.c',
    p_menu_sua: '1.menu.u',
    p_menu_xoa: '1.menu.d',
};
///// QUẢN TRỊ DANH MỤC
const loaiBieuGiaPage = {
    p_loaibieugia: '2.lbg',
    p_loaibieugia_xem: '2.lbg.v',
    p_loaibieugia_tao: '2.lbg.c',
    p_loaibieugia_sua: '2.lbg.u',
    p_loaibieugia_xoa: '2.lbg.d',
};
const bieuGiaPage = {
    p_bieugia: '2.bg',
    p_bieugia_xem: '2.bg.v',
    p_bieugia_tao: '2.bg.c',
    p_bieugia_sua: '2.bg.u',
    p_bieugia_xoa: '2.bg.d',
};
const congViecPage = {
    p_congviec: '2.cv',
    p_congviec_xem: '2.cv.v',
    p_congviec_tao: '2.cv.c',
    p_congviec_sua: '2.cv.u',
    p_congviec_xoa: '2.cv.d',
};
const vungPage = {
    p_vung: '2.vung',
    p_vung_xem: '2.vung.v',
    p_vung_tao: '2.vung.c',
    p_vung_sua: '2.vung.u',
    p_vung_xoa: '2.vung.d',
};
const khuVucPage = {
    p_khuvuc: '2.kv',
    p_khuvuc_xem: '2.kv.v',
    p_khuvuc_tao: '2.kv.c',
    p_khuvuc_sua: '2.kv.u',
    p_khuvuc_xoa: '2.kv.d',
};

export const permission = {
    ...userPage,
    ...rolePage,
    ...menuPage,
    ...loaiBieuGiaPage,
    ...bieuGiaPage,
    ...congViecPage,
    ...vungPage,
    ...khuVucPage,
};

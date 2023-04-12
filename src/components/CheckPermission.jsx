import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
export default function CheckPermission(props) {
    const user = useSelector((state) => state.currentUser.user);
    const { permissionCode } = props;
    if (
        !user.isAdministrator &&
        permissionCode &&
        user &&
        user.permissions &&
        user.permissions.length &&
        !user.permissions.includes(permissionCode)
    )
        return null;

    return <Fragment>{props.children}</Fragment>;
}

import { ReactNode } from 'react';
import { usePermissionContext } from '../Layouts/LayoutAdmin';

const PermissionElement = ({ keyName, action, children }: { keyName: string; action: string; children: ReactNode }) => {
    const { permissions } = usePermissionContext();

    return <>{permissions?.[keyName] ? (permissions?.[keyName].includes(action) ? children : '') : ''}</>;
};

export default PermissionElement;

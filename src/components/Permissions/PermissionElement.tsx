import { ReactNode } from 'react';
import { usePermissionContext } from '../Layouts/LayoutAdmin';

const PermissionElement = ({ keyName, action, children }: { keyName: string; action: string; children: ReactNode }) => {
    const { permissions } = usePermissionContext();

    return <>{permissions?.[keyName] ? (permissions?.[keyName].includes(action) ? children : '') : <p className='text-center text-[20px] font-medium'>Unauthorized</p>}</>;
};

export default PermissionElement;

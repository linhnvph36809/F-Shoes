import { ReactNode } from 'react';
import { usePermissionContext } from '../Layouts/LayoutAdmin';

const PermissionPage = ({ keyName, action, children }: { keyName: string; action: string; children: ReactNode }) => {
    const { permissions } = usePermissionContext();
    console.log();

    return (
        <>
            {permissions?.[keyName] ? (
                permissions?.[keyName].includes(action) ? (
                    children
                ) : (
                    <h1 className="text-center">404 Not found</h1>
                )
            ) : (
                ''
            )}
        </>
    );
};

export default PermissionPage;

import { ReactNode } from 'react';
import { usePermissionContext } from '../Layouts/LayoutAdmin';
import { FormattedMessage } from 'react-intl';

const PermissionPage = ({ keyName, action, children }: { keyName: string; action: string; children: ReactNode }) => {
    const { permissions } = usePermissionContext();
    console.log();

    return (
        <>
            {permissions?.[keyName] ? (
                permissions?.[keyName].includes(action) ? (
                    children
                ) : (
                    <h1 className="text-center font-medium text-[18px]"><FormattedMessage id="page.noAccessTile" /></h1>
                )
            ) : (
                ''
            )}
        </>
    );
};

export default PermissionPage;

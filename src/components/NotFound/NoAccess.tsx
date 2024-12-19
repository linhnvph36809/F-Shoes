import { FormattedMessage } from 'react-intl';

const NoAccess = () => {
    return (
        <div>
            <p className="color-primary text-center text-[32px] font-medium">
                <FormattedMessage id="page.noAccessTile" />
            </p>
        </div>
    );
};

export default NoAccess;

import { FormattedMessage } from "react-intl";

const NotFound = () => {
    return (
        <div>
            <p className="color-primary text-center text-[32px] font-medium">
                <FormattedMessage id="page.notFoundTile" />
            </p>
        </div>
    );
};

export default NotFound;

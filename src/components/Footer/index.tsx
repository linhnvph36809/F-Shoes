import { FormattedMessage } from 'react-intl';

const Footer = () => {
    return (
        <>
            <footer>
                <div className="container mt-20 pb-20">
                    <div className="flex py-20 border-t">
                        <div className="w-10/12 grid grid-cols-3">
                            <div>
                                <h4 className="color-primary mb-10 font-medium text-[1.4rem]">
                                    {<FormattedMessage id="footer.Resources" />}
                                </h4>
                                <ul>
                                    <li>
                                        <a href="#" className="inline-block text-[1.4rem] font-medium mb-4 color-gray">
                                            {<FormattedMessage id="footer.Resources.Find A Store" />}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="inline-block text-[1.4rem] font-medium mb-4 color-gray">
                                            {<FormattedMessage id="footer.Resources.Become A Member" />}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="inline-block text-[1.4rem] font-medium mb-4 color-gray">
                                            {<FormattedMessage id="footer.Resources.Send Us Feedback" />}
                                        </a>
                                    </li>
                                   
                                    <li>
                                        <a href="#" className="inline-block text-[1.4rem] font-medium mb-4 color-gray">
                                            {<FormattedMessage id="footer.Resources.Gift Cards" />}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="color-primary mb-10 font-medium text-[1.4rem]">
                                    {<FormattedMessage id="footer.Help" />}
                                </h4>
                                <ul>
                                    <li>
                                        <a href="#" className="inline-block text-[1.4rem] font-medium mb-4 color-gray">
                                            {<FormattedMessage id="footer.Help.Get Help" />}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="inline-block text-[1.4rem] font-medium mb-4 color-gray">
                                            {<FormattedMessage id="footer.Help.Order Status" />}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="inline-block text-[1.4rem] font-medium mb-4 color-gray">
                                            {<FormattedMessage id="footer.Help.Delivery" />}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="inline-block text-[1.4rem] font-medium mb-4 color-gray">
                                            {<FormattedMessage id="footer.Help.Returns" />}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="inline-block text-[1.4rem] font-medium mb-4 color-gray">
                                            {<FormattedMessage id="footer.Help.Payment Options" />}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="inline-block text-[1.4rem] font-medium mb-4 color-gray">
                                            {<FormattedMessage id="footer.Help.Contact Us" />}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="color-primary mb-10 font-medium text-[1.4rem]">
                                    {<FormattedMessage id="footer.About Nike" />}
                                </h4>
                                <ul>
                                    <li>
                                        <a href="#" className="inline-block text-[1.4rem] font-medium mb-4 color-gray">
                                            {<FormattedMessage id="footer.About Nike.Purpose" />}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="inline-block text-[1.4rem] font-medium mb-4 color-gray">
                                            {<FormattedMessage id="footer.About Nike.News" />}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="inline-block text-[1.4rem] font-medium mb-4 color-gray">
                                            {<FormattedMessage id="footer.About Nike.Careers" />}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="inline-block text-[1.4rem] font-medium mb-4 color-gray">
                                            {<FormattedMessage id="footer.About Nike.Investors" />}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="inline-block text-[1.4rem] font-medium mb-4 color-gray">
                                            {<FormattedMessage id="footer.About Nike.Sustainability" />}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex-row-center justify-end gap-x-3 text-[1.4rem] font-medium color-gray">
                                <svg
                                    aria-hidden="true"
                                    className="css-npy3on"
                                    focusable="false"
                                    viewBox="0 0 24 24"
                                    role="img"
                                    width="24px"
                                    height="24px"
                                    fill="none"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeMiterlimit={10}
                                        strokeWidth="1.5"
                                        d="M21.75 12A9.75 9.75 0 0112 21.75M21.75
                                    12A9.75 9.75 0 0012 2.25M21.75 12c0 2.071-4.365
                                    3.75-9.75 3.75S2.25 14.071 2.25 12m19.5 0c0-2.071-4.365-3.75-9.75-3.75S2.25
                                    9.929 2.25 12M12 21.75A9.75 9.75 0 012.25 12M12 21.75c2.9
                                    0 5.25-4.365 5.25-9.75S14.9 2.25 12 2.25m0 19.5c-2.9 0-5.25-4.365-5.25-9.75S9.1
                                    2.25 12 2.25M2.25 12A9.75 9.75 0 0112 2.25"
                                    />
                                </svg>
                                Vietnam
                            </div>
                        </div>
                    </div>
                    
                </div>
            </footer>
        </>
    );
};

export default Footer;

import { Tag } from 'antd';
import { Link } from 'react-router-dom';

import { IOrder, statusString } from '../../../../../../interfaces/IOrder';
import { formatPrice, timeToNow } from '../../../../../../utils';

const OrderItem = ({ order }: { order: IOrder }) => {
    const status:
        | {
              className: string;
              text: string;
          }
        | undefined = statusString(order.status);

    const currentUrl = `${window.location.origin}${location.pathname}${location.search}`;

    return (
        <div
            className="grid grid-cols-7 items-center px-10 h-[100px] bg-whitesmoke
            rounded-xl mb-8 gap-x-10 opacity-80 hover:opacity-100 hover:bg-gray-200 hover:cursor-pointer transition-global"
        >
            <div>
                <svg width="60" height="60" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect
                        width="45"
                        height="45"
                        rx="15"
                        fill={order.payment_status === 'paid' ? '#DCFAF8' : '#FFE0EB'}
                    />
                    <g clip-path="url(#clip0_163_459)">
                        <path
                            d="M24.5941 25.2698C27.95 25.2698 30.6803 22.5177 30.6803 19.1349C30.6803 15.7521 27.95 13 24.5941 13C21.2381 13 18.5078 15.7521 18.5078 19.1349C18.5078 22.5176 21.2381 25.2698 24.5941 25.2698ZM22.6384 21.0493C22.8154 20.7786 23.1784 20.7027 23.449 20.8798C23.8433 21.1377 23.9921 21.1615 24.5124 21.1579C25.0203 21.1545 25.315 20.776 25.3739 20.4256C25.4026 20.2552 25.4135 19.8391 24.8978 19.6568C24.2929 19.4429 23.6738 19.1985 23.2432 18.8607C22.8125 18.5229 22.6152 17.9397 22.7285 17.3389C22.8513 16.6875 23.3057 16.169 23.9144 15.9856C23.9199 15.984 23.9253 15.9827 23.9308 15.981V15.7591C23.9308 15.4357 24.1929 15.1735 24.5163 15.1735C24.8397 15.1735 25.1019 15.4357 25.1019 15.7591V15.9441C25.4997 16.0391 25.7774 16.2211 25.8902 16.3053C26.1492 16.499 26.2023 16.8659 26.0086 17.125C25.815 17.3841 25.4481 17.4371 25.189 17.2434C25.069 17.1537 24.7373 16.9608 24.2521 17.107C23.9687 17.1924 23.8952 17.4721 23.8794 17.5558C23.8484 17.7202 23.8832 17.8742 23.9659 17.9391C24.2645 18.1733 24.8019 18.3806 25.2881 18.5525C26.1848 18.8695 26.6835 19.7002 26.5289 20.6198C26.453 21.0709 26.2261 21.4895 25.8897 21.7985C25.6607 22.009 25.394 22.1591 25.1019 22.2448V22.5107C25.1019 22.8341 24.8397 23.0963 24.5163 23.0963C24.1929 23.0963 23.9308 22.8341 23.9308 22.5107V22.3032C23.5521 22.2573 23.2343 22.1389 22.8078 21.8599C22.5372 21.6828 22.4613 21.3199 22.6384 21.0493Z"
                            fill={order.payment_status === 'paid' ? '#16DBCC' : '#FF82AC'}
                        />
                        <path
                            d="M15.2196 27.2373H13.8844C13.561 27.2373 13.2988 27.4995 13.2988 27.8229V32.4135C13.2988 32.7369 13.561 32.9991 13.8844 32.9991H15.2197V27.2373H15.2196Z"
                            fill={order.payment_status === 'paid' ? '#16DBCC' : '#FF82AC'}
                        />
                        <path
                            d="M32.5295 27.1965C31.4319 26.0989 29.646 26.0989 28.5485 27.1965L26.7943 28.9507L26.0753 29.6697C25.7847 29.9602 25.3906 30.1235 24.9797 30.1235H21.4835C21.1678 30.1235 20.8961 29.8808 20.8812 29.5654C20.8653 29.2287 21.1337 28.9507 21.4669 28.9507H25.0205C25.735 28.9507 26.3547 28.442 26.4776 27.7382C26.5058 27.5765 26.5205 27.4104 26.5205 27.2408C26.5205 26.9168 26.258 26.6539 25.9341 26.6539H23.9869C23.3506 26.6539 22.7395 26.3652 22.0925 26.0596C21.4139 25.739 20.7122 25.4075 19.8917 25.3529C19.1741 25.3051 18.4548 25.3837 17.7538 25.5861C17.0032 25.8029 16.4636 26.4697 16.3982 27.2397C16.3957 27.2395 16.3932 27.2394 16.3906 27.2393V32.9972L26.4794 33C27.1731 33 27.8253 32.7298 28.3158 32.2393L32.5293 28.0258C32.7585 27.7969 32.7585 27.4255 32.5295 27.1965Z"
                            fill={order.payment_status === 'paid' ? '#16DBCC' : '#FF82AC'}
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_163_459">
                            <rect width="20" height="20" fill="white" transform="translate(13 13)" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <div>
                <p className="color-primary text-[18px] font-medium mb-3">Total Amount</p>
                <span className="color-gray text-[18px] font-medium">{formatPrice(order.total_amount)}đ</span>
            </div>
            <div>
                <p className="color-primary text-[18px] font-medium mb-3">Payment Method</p>
                <span className="color-gray text-[15px]">{order.payment_method}</span>
            </div>
            <div>
                <p className="color-primary text-[18px] font-medium mb-3">Status</p>
                <Tag className={`text-[13px] rounded-lg px-3 py-1 ${status.className}`}>{status.text}</Tag>
            </div>
            <div>
                <p className="color-primary text-[18px] font-medium mb-3">Address</p>
                <span className="color-gray text-[13px]">{order.address}</span>
            </div>
            <div>
                <span className="color-gray text-[13px] font-medium">{timeToNow(order.created_at)}</span>
            </div>
            <div>
                <Link to={`/profile/orders/${order.id}`} state={{ prevUrl: currentUrl }}>
                    <button
                        className="w-[150px] h-[50px] text-[15px] font-medium 
                        color-primary border border-[#111111] rounded-[50px] 
                        hover:bg-[#111111] hover:text-white transition-global"
                    >
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default OrderItem;

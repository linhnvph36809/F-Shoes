export const PATH_LIST_PRODUCT = '/admin/list-product';
export const PATH_LIST_CATEGORY = '/admin/list-category';
export const PATH_LIST_USER = '/admin/list-user';
export const PATH_ADMIN = '/admin';
export const COOKIE_USER = 'user';
export const COOKIE_REFESHTOKEN = 'refresh_token';
export const COOKIE_ORDER = 'order';

export const PERMISSION = {
    PERMISSION_PRODUCT: 'product',
    PERMISSION_CATEGORY: 'category',
    PERMISSION_USER: 'user',
    PERMISSION_VOUCHER: 'voucher',
    PERMISSION_STATISTIC: 'statistic',
    PERMISSION_TOPIC: 'topic',
    PERMISSION_POST: 'post',
    PERMISSION_ORDER: 'order',
    PERMISSION_GROUP: 'group',
    PERMISSION_MEDIA: 'media',
    PERMISSION_DISCOUNT: 'discount',
};

export const ACTIONS = {
    ACTIONS_VIEW: 'view',
    ACTIONS_EDIT: 'edit',
    ACTIONS_ADD: 'add',
    ACTIONS_DELETE: 'delete',
};

export const ACTIONS_LIST = Object.values(ACTIONS);

export const STATUS_ORDER = [
    'Cancelled',
    'Waiting Confirm',
    'Confirmed',
    'Delivering',
    'Delivered',
    'Return Processing',
    'Denied Return',
    'Returned',
];

export const FREE_SHIP = 1000000 ; 
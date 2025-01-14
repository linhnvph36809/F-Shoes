import { useState } from 'react';

import { tokenManagerInstance } from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_ADMIN } from '../constants/path';
import { showMessageAdmin, showMessageClient } from '../utils/messages';
import { useQueryClient } from 'react-query';
import { useContextGlobal } from '../contexts';
import { handleChangeMessage } from '../utils';
import {  message, notification  } from 'antd';
const API_ATTRIBUTE = '/api/attribute/';

export const QUERY_KEY = 'query-key-attribute';

const useAttribute = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
    const { slug } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { locale } = useContextGlobal();

    let id: string | number | undefined;

    if (slug) {
        const index = slug.lastIndexOf('.');
        id = slug.substring(index + 1);
    }

    const getValueAttributeById = async (id: string | number) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('get', `/api/attribute/${id}/value`);
            return data;
        } catch (error) {
            const e = error as any;
            if (e?.response?.data?.errors) {
                const errs = Object.values(e.response?.data?.errors);
                errs.map((m: any) => {
                    notification.error({
                        message: '',
                        description: m[0],
                    });
                });
            } else {
                if (e?.response?.data?.error) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.error,
                    });
                } else if (e?.response?.data?.message) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.message,
                    });
                } else {
                    showMessageAdmin(
                        e?.response?.data?.error ||
                            e?.response?.data?.message ||
                            handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'),
                        '',
                        'error',
                    );
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const postAttribute = async (attribute: { attribute: string; values: string[] }) => {
        try {
            setLoading(true);
            const { data } = await tokenManagerInstance('post', '/api/add/attribute/values/product', attribute);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            return data;
        } catch (error) {
            const e = error as any;
            if (e?.response?.data?.errors) {
                const errs = Object.values(e.response?.data?.errors);
                errs.map((m: any) => {
                    notification.error({
                        message: '',
                        description: m[0],
                    });
                });
            } else {
                if (e?.response?.data?.error) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.error,
                    });
                } else if (e?.response?.data?.message) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.message,
                    });
                } else {
                    showMessageAdmin(
                        e?.response?.data?.error ||
                            e?.response?.data?.message ||
                            handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'),
                        '',
                        'error',
                    );
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const postAttributeName = async (attributeName: { name: string }) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', `/api/attribute`, attributeName);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
        } catch (error) {
            const e = error as any;
            if (e?.response?.data?.errors) {
                const errs = Object.values(e.response?.data?.errors);
                errs.map((m: any) => {
                    notification.error({
                        message: '',
                        description: m[0],
                    });
                });
            } else {
                if (e?.response?.data?.error) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.error,
                    });
                } else if (e?.response?.data?.message) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.message,
                    });
                } else {
                    showMessageAdmin(
                        e?.response?.data?.error ||
                            e?.response?.data?.message ||
                            handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'),
                        '',
                        'error',
                    );
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const postAttributeValue = async (id: string | number, values: any) => {
        try {
            setLoading(true);
            const {data} = await tokenManagerInstance('post', `/api/attribute/${id}/value`, values);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
           
            if(data?.errors && data?.errors.length > 0){
                for(let i = 0; i < data.errors.length;i++){
                    message.error(data.errors[i]);
                }
               
            }
            
            navigate(PATH_ADMIN.ADD_ATTRIBUTE);
        } catch (error) {
            const e = error as any;
            if (e?.response?.data?.errors) {
                const errs = Object.values(e.response?.data?.errors);
                errs.map((m: any) => {
                    notification.error({
                        message: '',
                        description: m[0],
                    });
                });
            } else {
                if (e?.response?.data?.error) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.error,
                    });
                } else if (e?.response?.data?.message) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.message,
                    });
                } else {
                    showMessageAdmin(
                        e?.response?.data?.error ||
                            e?.response?.data?.message ||
                            handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'),
                        '',
                        'error',
                    );
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const deleteAttribute = async (id: string | number) => {
        try {
            setLoadingDelete(true);
            await tokenManagerInstance('delete', API_ATTRIBUTE + id);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            showMessageClient(
                handleChangeMessage(locale,'Delete Attribute Successfully!','Xóa thuộc tính thành công!'),
                '',
                'success'
            );
        } catch (error) {
            const e = error as any;
            if (e?.response?.data?.errors) {
                const errs = Object.values(e.response?.data?.errors);
                errs.map((m: any) => {
                    notification.error({
                        message: '',
                        description: m[0],
                    });
                });
            } else {
                if (e?.response?.data?.error) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.error,
                    });
                } else if (e?.response?.data?.message) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.message,
                    });
                } else {
                    showMessageAdmin(
                        e?.response?.data?.error ||
                            e?.response?.data?.message ||
                            handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'),
                        '',
                        'error',
                    );
                }
            }
            setLoadingDelete(false);
        }
    };

    const deleteAttributeValue = async (idValue: string | number, idAttribute: string | number) => {
        try {
            setLoading(true);
            await tokenManagerInstance('delete', `${API_ATTRIBUTE}${idAttribute}/value/${idValue}`);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            showMessageClient(
                handleChangeMessage(locale,'Delete Attribute Successfully!','Xóa thuộc tính thành công!'),
                '',
                'success'
            );
        } catch (error) {
            const e = error as any;
            if (e?.response?.data?.errors) {
                const errs = Object.values(e.response?.data?.errors);
                errs.map((m: any) => {
                    notification.error({
                        message: '',
                        description: m[0],
                    });
                });
            } else {
                if (e?.response?.data?.error) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.error,
                    });
                } else if (e?.response?.data?.message) {
                    notification.error({
                        message: '',
                        description: e?.response?.data?.message,
                    });
                } else {
                    showMessageAdmin(
                        e?.response?.data?.error ||
                            e?.response?.data?.message ||
                            handleChangeMessage(locale, 'Something went wrong!', 'Đã xảy ra lỗi!'),
                        '',
                        'error',
                    );
                }
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        loadingDelete,
        postAttribute,
        postAttributeName,
        getValueAttributeById,
        deleteAttribute,
        postAttributeValue,
        deleteAttributeValue,
    };
};

export default useAttribute;
/** */

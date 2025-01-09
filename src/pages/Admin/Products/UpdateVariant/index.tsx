import Heading from '../../components/Heading';


import useVariant from '../../../../hooks/useVariant';
import ButtonBack from '../../components/ButtonBack';
import { PATH_ADMIN } from '../../../../constants/path';
import { FormattedMessage } from 'react-intl';
import { useState } from 'react';
import VariantComponent from './VariantComponent';
import { showMessageClient } from '../../../../utils/messages';
import ButtonSubmit from '../../components/Button/ButtonSubmit';


const UpdateVariant = () => {

    const [listAttribute, setListAttribute] = useState<any>([]);
    const [datas, setDatas] = useState<any>([]);
    const [errors, setError] = useState<any>([]);
    const { loading: loadingPostVariant, putVariant } = useVariant();

    const onFinish = () => {
        setError(datas);
        const isSubmit = datas.some((data: any) => data === null);
        if (!isSubmit) {
            putVariant({
                variations: datas,
            });
        }
    };

    return (
        <>
            <section>
                <ButtonBack to={PATH_ADMIN.LIST_PRODUCT} />
                <Heading>
                    <FormattedMessage id="Update Variant" />
                </Heading>
                <VariantComponent setDatas={setDatas} datas={datas}
                    setError={setError}
                    errors={errors}
                    listAttribute={listAttribute}
                    setListAttribute={setListAttribute} />
                <div className="text-end mt-10">
                    <ButtonSubmit
                        loading={loadingPostVariant}
                        onClick={
                            listAttribute.length
                                ? () => onFinish()
                                : () => showMessageClient('Please choose variant', '', 'warning')
                        }
                    />
                </div>
            </section>
        </>
    );
};

export default UpdateVariant;

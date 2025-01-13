import { Collapse, Checkbox, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { IAttribute } from '../../../../../interfaces/IAttribute.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import useQueryConfig from '../../../../../hooks/useQueryConfig.tsx';

const { Panel } = Collapse;

const FilterBox = () => {
    const navigator = useNavigate();
    const [fixedAttributes, setFixedAttributes] = useState<IAttribute[]>([]);
    const { data: dataCachingAttributes, isLoading: loading } = useQueryConfig(
        'category-filters-list__attributes',
        'api/attributes/isFilter',
    );

    useEffect(() => {
        setFixedAttributes(dataCachingAttributes?.data?.attributes);
    }, [dataCachingAttributes?.data?.attributes]);

    const query = new URLSearchParams(useLocation().search);
    const [selectedVariations, setSelectedVariations] = useState<Array<string | number>>([]);
    const variationQuery = query.get('attributes')?.split('-') || [];
    useEffect(() => {
        setSelectedVariations(variationQuery);
    }, [query.get('attributes')]);
    const onchangeCheckbox = (e: CheckboxChangeEvent) => {
        const { value, checked } = e.target;
        let updatedVariations = [...selectedVariations];
        if (checked) {
            if (!updatedVariations.includes(value)) {
                updatedVariations.push(value);
            }
        } else {
            updatedVariations = updatedVariations.filter((v) => v !== `${value}`);
        }
        updatedVariations = [...new Set(updatedVariations)];
        setSelectedVariations(updatedVariations);

        const newQuery = new URLSearchParams(location.search);

        if (updatedVariations.length > 0) {
            newQuery.set('attributes', updatedVariations.join('-'));
            if (newQuery.get('page')) {
                newQuery.delete('page');
            }
        } else {
            newQuery.delete('attributes');
        }

        navigator(`?${newQuery.toString()}`, { replace: true });
    };
    return (
        <div className="w-50">
            {loading ? (
                <Skeleton />
            ) : fixedAttributes && fixedAttributes.length > 0 ? (
                fixedAttributes.map((item) => (
                    <div key={item.id}>
                        <Collapse key={item?.id} expandIconPosition="end" className="w-[200px] " bordered={false}>
                            <Panel
                                header={item?.name}
                                key={item?.id}
                                className="text-[16px] font-semibold bg-white border-t-[1px] border-gray-200" // Tailwind class for border
                            >
                                {item.values.map((value) => (
                                    <div key={value?.id} className="my-2">
                                        <Checkbox
                                            checked={selectedVariations.includes(`${value?.id}`)}
                                            onChange={(e) => onchangeCheckbox(e)}
                                            value={value?.id}
                                            className="text-[15px] break-words"
                                        >
                                            {value?.value}
                                        </Checkbox>
                                    </div>
                                ))}
                            </Panel>
                        </Collapse>
                    </div>
                ))
            ) : (
                ''
            )}
        </div>
    );
};

export default FilterBox;

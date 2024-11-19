import {Collapse, Checkbox, Skeleton} from 'antd';
import {tokenManagerInstance} from "../../../../../api";
import {useEffect, useState} from "react";
import {IAttribute} from "../../../../../interfaces/IAttribute.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {CheckboxChangeEvent} from "antd/lib/checkbox";

const {Panel} = Collapse;


const FilterBox = () => {
    const navigator = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fixedAttributes, setFixedAttributes] = useState<IAttribute[]>([]);


    useEffect(() => {
        const fixedAttributes = async () => {
            try {
                setLoading(true);
                const {data} = await tokenManagerInstance('get', 'api/attributes/isFilter');
                setFixedAttributes(data.attributes);
            } catch (error) {
                console.log(error, 'error');
            } finally {
                setLoading(false);
            }
        };
        fixedAttributes();
    }, []);

    const query = new URLSearchParams(useLocation().search);
    const [selectedVariations, setSelectedVariations] = useState<Array<string | number>>([]);
    const variationQuery = query.get("attributes")?.split('-') || [];
    useEffect(() => {
        setSelectedVariations(variationQuery);
    }, [query.get('attributes')]);
    const onchangeCheckbox = (e:CheckboxChangeEvent) => {
        const {value, checked} = e.target;

        let updatedVariations = [...selectedVariations];


        if (checked) {
            if (!updatedVariations.includes(value)) {
                updatedVariations.push(value);
            }
        } else {
            updatedVariations = updatedVariations.filter(v => v !== `${value}`);
        }
        updatedVariations = [...new Set(updatedVariations)];
        setSelectedVariations(updatedVariations);

        const newQuery = new URLSearchParams(location.search);

        if (updatedVariations.length > 0) {

            newQuery.set('attributes', updatedVariations.join('-'));
        } else {

            newQuery.delete('attributes');
        }

        navigator(`?${newQuery.toString()}`, {replace: true});

    }
    return (
        <div className="w-50">
            {
                loading ? <Skeleton/> :
                    fixedAttributes && fixedAttributes.length > 0 ?
                        fixedAttributes.map((item) => (
                            <Collapse
                                key={item?.id}
                                expandIconPosition="end"
                                className="custom-collapse"
                                bordered={false}
                            >
                                <Panel
                                    header={item?.name}
                                    key={item?.id}
                                    className="text-[16px] font-semibold border-b-2 border-gray-300" // Tailwind class for border
                                >
                                    {item.values.map((value) => (
                                        <div key={value?.id} className="mb-2">
                                            <Checkbox
                                                checked={selectedVariations.includes(`${value?.id}`)}
                                                onChange={(e) => onchangeCheckbox(e)} value={value?.id}
                                                className="text-[15px]">{value?.value}</Checkbox>
                                        </div>
                                    ))}
                                </Panel>


                            </Collapse>
                        ))
                        : ''
            }
        </div>
    );
};

export default FilterBox;

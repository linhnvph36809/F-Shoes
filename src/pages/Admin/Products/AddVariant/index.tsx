import { Collapse, ConfigProvider, Select } from 'antd';
import { useCallback, useState } from 'react';

import Heading from '../../components/Heading';
import FormAttribute from '../components/FormAttribute';
import InputPrimary from '../../../../components/Input';
import UploadImage from '../components/Upload';
import { options } from './datas';

const AddVariant = () => {
    const [chooseVariants, setChooseVariants] = useState<string[][]>([]);

    const handleChange = useCallback((selecteds: string[]) => {
        console.log(selecteds);
        const newVariants = selecteds.map((selected) => selected.split('-'));
        setChooseVariants(newVariants);
    }, []);

    console.log(chooseVariants);

    return (
        <>
            <section>
                <Heading>Add Variant</Heading>
                <div className="grid grid-cols-2 gap-x-10">
                    <div>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Select: {
                                        multipleItemHeight: 40,
                                    },
                                },
                            }}
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                className="text-20px font-medium w-full sm:h-[45px] md:h-[56px] border-1 border-[#111111] mb-5"
                                placeholder="Please select"
                                onChange={handleChange}
                                optionFilterProp="label"
                                options={options}
                            />
                        </ConfigProvider>

                        <div className="mt-10">
                            <h5 className="text-20px font-medium mb-3">Add variant</h5>
                            <FormAttribute handleAddVariant={setChooseVariants} />
                        </div>
                    </div>
                    <div>
                        <div>
                            <ConfigProvider
                                theme={{
                                    token: {
                                        borderRadiusLG: 8,
                                        colorBorder: '#111111',
                                    },
                                }}
                            >
                                <Collapse
                                    className="mb-5 text-16px font-medium"
                                    expandIconPosition="end"
                                    items={[
                                        {
                                            key: '1',
                                            label: (
                                                <div className="grid grid-cols-9 gap-x-5">
                                                    <div className="flex-row-center justify-center bg-primary rounded-lg text-white h-[32px]">
                                                        46
                                                    </div>
                                                    <div className="flex-row-center justify-center bg-primary rounded-lg text-white h-[32px]">
                                                        Red
                                                    </div>
                                                </div>
                                            ),
                                            children: (
                                                <div className="grid grid-cols-2 gap-x-10">
                                                    <InputPrimary
                                                        placeholder="Price"
                                                        textSize="text-16px"
                                                        height="h-[40px]"
                                                    />
                                                    <InputPrimary
                                                        placeholder="Sale"
                                                        textSize="text-16px"
                                                        height="h-[40px]"
                                                    />
                                                    <InputPrimary
                                                        placeholder="Quantity"
                                                        textSize="text-16px"
                                                        height="h-[40px]"
                                                    />
                                                    <UploadImage />
                                                </div>
                                            ),
                                        },
                                    ]}
                                />
                                <Collapse
                                    className="mb-5 text-16px font-medium"
                                    expandIconPosition="end"
                                    items={[
                                        {
                                            key: '1',
                                            label: (
                                                <div className="grid grid-cols-9 gap-x-5">
                                                    <div className="flex-row-center justify-center bg-primary rounded-lg text-white h-[32px]">
                                                        46
                                                    </div>
                                                    <div className="flex-row-center justify-center bg-primary rounded-lg text-white h-[32px]">
                                                        Green
                                                    </div>
                                                </div>
                                            ),
                                            children: (
                                                <div className="grid grid-cols-2 gap-x-10">
                                                    <InputPrimary
                                                        placeholder="Price"
                                                        textSize="text-16px"
                                                        height="h-[40px]"
                                                    />
                                                    <InputPrimary
                                                        placeholder="Sale"
                                                        textSize="text-16px"
                                                        height="h-[40px]"
                                                    />
                                                    <InputPrimary
                                                        placeholder="Quantity"
                                                        textSize="text-16px"
                                                        height="h-[40px]"
                                                    />
                                                    <UploadImage />
                                                </div>
                                            ),
                                        },
                                    ]}
                                />
                                <Collapse
                                    className="mb-5 text-16px font-medium"
                                    expandIconPosition="end"
                                    items={[
                                        {
                                            key: '1',
                                            label: (
                                                <div className="grid grid-cols-9 gap-x-5">
                                                    <div className="flex-row-center justify-center bg-primary rounded-lg text-white h-[32px]">
                                                        46
                                                    </div>
                                                    <div className="flex-row-center justify-center bg-primary rounded-lg text-white h-[32px]">
                                                        Yellow
                                                    </div>
                                                </div>
                                            ),
                                            children: (
                                                <div className="grid grid-cols-2 gap-x-10">
                                                    <InputPrimary
                                                        placeholder="Price"
                                                        textSize="text-16px"
                                                        height="h-[40px]"
                                                    />
                                                    <InputPrimary
                                                        placeholder="Sale"
                                                        textSize="text-16px"
                                                        height="h-[40px]"
                                                    />
                                                    <InputPrimary
                                                        placeholder="Quantity"
                                                        textSize="text-16px"
                                                        height="h-[40px]"
                                                    />
                                                    <UploadImage />
                                                </div>
                                            ),
                                        },
                                    ]}
                                />
                            </ConfigProvider>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddVariant;

// const arrays = [["L", "XL"], ['red', 'green'], ['Viet', "Trung"]];

// const generateCombinations = (arrays) => {
//     let result = [[]];

//     for (let i = 0; i < arrays.length; i++) {
//         let currentArray = arrays[i];
//         let tempResult = [];

//         for (let j = 0; j < result.length; j++) {
//             for (let k = 0; k < currentArray.length; k++) {
//                 tempResult.push([...result[j], currentArray[k]]);
//             }
//         }

//         result = tempResult;
//     }

//     return result;
// };

// const combinations = generateCombinations(arrays);

// // In ra kết quả
// combinations.forEach(combination => {
//     console.log(combination.join(' '));
// });

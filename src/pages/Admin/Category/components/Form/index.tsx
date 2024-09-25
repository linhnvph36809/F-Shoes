import { ConfigProvider, Form, Select } from "antd";
import InputPrimary from "../../../../../components/Input";
import ButtonPrimary from "../../../../../components/Button";

const FormCategory = () => {
    return (
        <Form>
            <ConfigProvider
                theme={{
                    components: {
                        Select: {
                            optionFontSize: 18,
                        },
                    },
                }}
            >
                <Select
                    defaultValue="lucy"
                    className="w-full sm:h-[45px] md:h-[56px] border-1 border-[#111111] mb-5"
                    options={[
                        { value: 'jack', label: 'Jack' },
                        { value: 'lucy', label: 'Lucy' },
                        { value: 'Yiminghe', label: 'yiminghe' },
                    ]}
                />
            </ConfigProvider>
            <InputPrimary placeholder="Category Name" />

            <div className="text-end">
                <ButtonPrimary width="w-[120px]" height="h-[56px]" />
            </div>
        </Form>
    )
}

export default FormCategory; 
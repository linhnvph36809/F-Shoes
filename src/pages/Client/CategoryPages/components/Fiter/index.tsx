import { Collapse, Checkbox, Divider } from 'antd';

const { Panel } = Collapse;

const FilterBox = () => {
    const genderOptions = ['Men', 'Women', 'Unisex'];
    const kidsOptions = ['Boys', 'Girls'];

    return (
        <div className="w-50 ">
            <Collapse
                defaultActiveKey={['1', '2']}
                expandIconPosition="end"
                className="custom-collapse"
                bordered={false}
            >
                {/* Gender Section */}
                <Panel
                    header="Gender"
                    key="1"
                    className="text-[16px] font-semibold border-b-2 border-gray-300" // Tailwind class for border
                >
                    {genderOptions.map((option) => (
                        <div key={option} className="mb-2">
                            <Checkbox className="text-[15px]">{option}</Checkbox>
                        </div>
                    ))}
                </Panel>

                <Divider className="m-0" />

                {/* Kids Section */}
                <Panel header="Kids" key="2" className="text-[16px] font-semibold">
                    {kidsOptions.map((option) => (
                        <div key={option} className="mb-2">
                            <Checkbox className="text-[15px]">{option}</Checkbox>
                        </div>
                    ))}
                </Panel>
            </Collapse>
        </div>
    );
};

export default FilterBox;

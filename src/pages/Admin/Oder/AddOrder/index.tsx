import React, { useRef, useState } from 'react';
import { ConfigProvider, Tabs } from 'antd';
import ButtonAdd from '../../components/Button/ButtonAdd';
import Heading from '../../components/Heading';
import FormOrder from './FormOrder';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const defaultPanes = new Array(1).fill(null).map((_, index) => {
    const id = String(index + 1);
    return { label: `Hóa đơn ${id}`, children: <FormOrder />, key: id };
});

const AddOrder: React.FC = () => {
    const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
    const [items, setItems] = useState(defaultPanes);
    const newTabIndex = useRef(0);

    const onChange = (key: string) => {
        setActiveKey(key);
    };

    const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        setItems([...items, { label: `Hóa đơn ${++items.length}`, children: <FormOrder />, key: newActiveKey }]);
        setActiveKey(newActiveKey);
    };

    const remove = (targetKey: TargetKey) => {
        const targetIndex = items.findIndex((pane) => pane.key === targetKey);
        const newPanes = items.filter((pane) => pane.key !== targetKey);
        console.log(newPanes);
        if (newPanes.length && targetKey === activeKey) {
            const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
            setActiveKey(key);
        }
        setItems(newPanes);
    };

    const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };

    return (
        <div>
            <Heading>Quầy Fshoes</Heading>
            <div style={{ marginBottom: 16 }}>
                <ButtonAdd onClick={add} title="Thêm hóa đơn"></ButtonAdd>
            </div>
            <ConfigProvider
                theme={{
                    components: {
                        Tabs: {
                            titleFontSize: 20,
                        },
                    },
                }}
            >
                <Tabs
                    hideAdd
                    onChange={onChange}
                    activeKey={activeKey}
                    type="editable-card"
                    onEdit={onEdit}
                    items={items}
                />
            </ConfigProvider>
        </div>
    );
};

export default AddOrder;

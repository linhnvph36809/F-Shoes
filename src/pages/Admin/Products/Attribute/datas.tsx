import { render } from "react-dom";
import { formatTime } from "../../../../utils";
import { Tag } from "antd";

export const columnsAttribute = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Attribute Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Attribute Value',
        dataIndex: 'values',
        key: 'values',
        render: (_: any, attributeValues: any) => {
            // const arrColor = [
            //     'blue','blue-inverse','cyan','cyan-inverse','default','error','geekblue','geekblue-inverse','gold','gold-inverse',
            //     'green','green-inverse','lime','lime-inverse','grey','grey-inverse','info','info-inverse','indigo','indigo-inverse','magenta','magenta-inverse',
            //     'orange','orange-inverse','pink','pink-inverse','purple','purple-inverse','red','red-inverse','success','success-inverse',
            //     'teal','teal-inverse','warning','warning-inverse','yellow','yellow-inverse'
            // ]//color={arrColor[Math.floor(Math.random() * ((arrColor.length-1) - 0 + 1) + 0)]}
            return (
                <div className="break-words max-w-[200px]">
                    {attributeValues.values.length
                        ? attributeValues.values.map((value: any) => <Tag className="rounded-[30px] p-2"  key={value.id}>{value.value}</Tag>)
                        : 'This attribute has no value.'}
                        
                </div>
            );
        },
    },
    {
        title: 'Created at',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (time:any) => {
            return <p>{formatTime(time)}</p>
        }
    },

];

import React from 'react';
import {ICategory} from "../../interfaces/ICategory.ts";


interface IProps {
    categories: ICategory[];
}
const HeaderCategory:React.FC<IProps> = ({categories}) => {

    const distributeSubcategories = (subcategories: ICategory[], numArrays: number): ICategory[][] => {
        const result: ICategory[][] = Array.from({ length: numArrays }, () => []);
        let index = 0;

        subcategories.forEach(subcategory => {
            result[index].push(subcategory);
            index = (index + 1) % numArrays;
        });

        return result;
    };
    let arrCate = [];
    if(categories){
        arrCate = distributeSubcategories(categories,4);

        return arrCate.map((item,index) => {
            return <div key={index}>
                <ul>
                    {item.map(cat => (
                        <li key={cat.id}>
                            <a href="#" className="inline-block text-[1.2rem] font-bold mb-4 color-gray">
                                {cat.name}
                            </a>
                        </li>
                    ))}

                </ul>
            </div>
        });
    }


    return (
        <div>
            <ul>

            </ul>
        </div>
    );
};

export default HeaderCategory;
import { ICategory } from '../../../../../interfaces/ICategory';
import {Link} from "react-router-dom";
interface Props{
    categories: ICategory[];
}

const FilterByCategory:React.FC<Props>= ({categories}) => {

    if(!categories || categories.length === 0){
        return (
            <div>
                <ul>

                </ul>

            </div>
        )
    }
    return (
        <div>
            <ul>
            <Link
                       
                        to={`/category`}
                        className="block text-20px font-medium my-2"
                    >
                        All
                    </Link>
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        to={`/category/${category.slug}`}
                        className="block text-20px font-medium my-2"
                    >
                        {category.name}
                    </Link>
                ))}
            </ul>

        </div>
    );
};

export default FilterByCategory;

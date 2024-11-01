import React, { useEffect, useState } from 'react';
import useCategory from '../../../../../hooks/useCategory';
import { ICategory } from '../../../../../interfaces/ICategory';

interface FilterByCategoryProps {
    onChange?: (categori: ICategory) => void;
}

const FilterByCategory: React.FC<FilterByCategoryProps> = ({ onChange }) => {
    const [categoryList, setCategoryList] = useState<ICategory[]>([]);
    const { categories, getAllCategory, getCategoryById } = useCategory();
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categori = await getAllCategory();
                setCategoryList(categoryList);
                console.log({ categori });
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleCategoryClick = async (category: ICategory) => {
        try {
            const categoryDetails = await getCategoryById(category.id);
            setSelectedCategory(categoryDetails);
            if (onChange) onChange(categoryDetails);
        } catch (error) {
            console.error('Failed to fetch category details:', error);
        }
    };

    return (
        <div>
            <ul>
                {categories.map((category) => (
                    <a
                        key={category.id}
                        href={`/category/${category.slug}`}
                        onClick={() => handleCategoryClick(category)}
                        className="block text-20px font-medium my-2"
                    >
                        {category.name}
                    </a>
                ))}
            </ul>
            {selectedCategory && (
                <div>
                    {/* <h2>Category Details:</h2>
                    <p>ID: {selectedCategory.id}</p>
                    <p>Name: {selectedCategory.name}</p> */}
                    {/* Add more fields as necessary */}
                </div>
            )}
        </div>
    );
};

export default FilterByCategory;

import React from 'react';
import FilterByCategory from '../components/Fiter/FilterByCategory';
import { ICategory } from '../../../../interfaces/ICategory';

interface ProductFilterProps {
    filters: Record<string, any>;
    onChange?: (newFilters: Record<string, any>) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ filters, onChange }) => {
    const handleCategoryChange = (newCategoryId: ICategory) => {
        const newFilters = {
            ...filters,
            categoryId: newCategoryId,
        };
        if (onChange) onChange(newFilters);
    };

    return (
        <div>
            <FilterByCategory onChange={handleCategoryChange} />
        </div>
    );
};

export default ProductFilter;

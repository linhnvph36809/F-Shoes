import { Search } from 'lucide-react';
import { useState } from 'react';

const InputSearch = ({
    placeholder,
    onSearch,
    width = 'w-[250px]',
    height = 'h-[50px]',
    ...props
}: any) => {
    const [value, setValue] = useState('');

    const handleSearchClick = () => {
        if (onSearch) {
            onSearch(value);
        }
    };

    return (
        <div className="relative">
            <input
                {...props}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={`${width} ${height} border font-medium text-[16px] border-gray-300 rounded-[10px] px-5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                placeholder={placeholder}
            />
            <Search
                className="absolute top-1/2 right-5 -translate-y-1/2 w-8 text-gray-500 hover:cursor-pointer hover:opacity-50 transition-global"
                onClick={handleSearchClick}
            />
        </div>
    );
};

export default InputSearch;

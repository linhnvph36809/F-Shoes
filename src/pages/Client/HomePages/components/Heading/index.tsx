import { ReactNode } from 'react';

const Heading = ({ title }: { title: string | ReactNode }) => {
    return (
        <div>
            <h2 className="md:text-[28px] sm:text-[20px] color-primary font-medium mb-5">{title}</h2>
        </div>
    );
};

export default Heading;

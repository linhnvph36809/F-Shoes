import { ReactNode } from 'react';

const Heading = ({ title }: { title: string | ReactNode }) => {
    return (
        <div>
            <h2 className="text-[28px] color-primary font-medium mb-5">{title}</h2>
        </div>
    );
};

export default Heading;

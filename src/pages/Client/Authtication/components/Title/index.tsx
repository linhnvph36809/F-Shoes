import { ReactNode } from 'react';

const Title = ({ children }: { children: string | ReactNode }) => {
    return (
        <>
            <h1 className="color-primary sm:text-[20px] md:text-[30px] leading-tight">{children}</h1>
        </>
    );
};

export default Title;

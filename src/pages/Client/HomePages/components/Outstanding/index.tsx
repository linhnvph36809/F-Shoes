import { ReactNode } from "react";

const Outstanding = ({
    category,
    title,
    description,
    //path,
}: {
    category: string | ReactNode;
    title: string;
    description: string;
    path?: string;
}) => {
    return (
        <>
            <div className="text-center mt-12">
                <p className="md:text-[15px] sm:text-[13px] color-primary font-medium">{category}</p>
                <h3 className="md:text-[60px] sm:text-[40px] color-primary font-extrabold uppercase">{title}</h3>
                <p className="md:text-[15px] sm:text-[13px] color-primary font-medium pb-12">{description}</p>
                <div>
                    <a
                        href="/category"
                        className="md:px-8 sm:px-5 py-2 bg-primary text-white font-medium
                        text-[15px] rounded-[30px] hover:opacity-60"
                    >
                        Shop
                    </a>
                </div>
            </div>
        </>
    );
};

export default Outstanding;

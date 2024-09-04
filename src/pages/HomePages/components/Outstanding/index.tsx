const Outstanding = ({
    category,
    title,
    description,
    path,
}: {
    category: string;
    title: string;
    description: string;
    path?: string;
}) => {
    return (
        <>
            <div className="text-center mt-12">
                <p className="text-[15px] color-primary font-medium">{category}</p>
                <h3 className="text-[60px] color-primary font-extrabold uppercase">{title}</h3>
                <p className="text-[15px] color-primary font-medium pb-12">{description}</p>
                <div>
                    <a
                        href={path}
                        className="px-8 py-2 bg-primary text-white font-medium
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

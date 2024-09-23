const Heading = ({ title }: { title: string }) => {
    return (
        <div>
            <h2 className="text-[28px] color-primary font-medium mb-5">{title}</h2>
        </div>
    );
};

export default Heading;

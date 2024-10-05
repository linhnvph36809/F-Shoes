const Heading = ({ title }: { title: string }) => {
    return (
        <div>
            <h2 className="md:text-[28px] sm:text-[20px] color-primary font-medium ">{title}</h2>
        </div>
    );
};

export default Heading;

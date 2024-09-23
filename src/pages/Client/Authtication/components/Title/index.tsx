const Title = ({ children }: { children: string }) => {
    return (
        <>
            <h1 className="color-primary sm:text-[20px] md:text-[30px] leading-tight">{children}</h1>
        </>
    )
}

export default Title; 
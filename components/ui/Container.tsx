interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => {
    return (
        <div className={`mx-auto w-full max-w-7xl px-4 md:px-8 ${className}`}>
            {children}
        </div>
    );
};

export default Container;
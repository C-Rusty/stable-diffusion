import './loader.scss';

const Loader = ({className} : {className?: string}) => {
    return(
        <div className={`wave-container ${className}`}>
            <div className={`wave-container__item ${className}__item`}></div>
            <div className={`wave-container__item ${className}__item`}></div>
            <div className={`wave-container__item ${className}__item`}></div>
            <div className={`wave-container__item ${className}__item`}></div>
            <div className={`wave-container__item ${className}__item`}></div>
            <div className={`wave-container__item ${className}__item`}></div>
            <div className={`wave-container__item ${className}__item`}></div>
            <div className={`wave-container__item ${className}__item`}></div>
            <div className={`wave-container__item ${className}__item`}></div>
            <div className={`wave-container__item ${className}__item`}></div>
        </div>
    );
};

export default Loader;
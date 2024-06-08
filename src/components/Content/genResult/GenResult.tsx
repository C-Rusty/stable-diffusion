import './genResult.scss';

const GenResult = ({generatedImage} : {generatedImage: string | null}) => {
    return(
        <div className="generation-result">
            {!generatedImage ? 
                <h1>Waiting for your awesome request!</h1>
                :
                <img 
                    src={generatedImage} 
                    alt={generatedImage} 
                />
            }
        </div>
    );
};

export default GenResult;
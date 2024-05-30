import './generator.scss';

const Generator = () => {
    return(
        <section className="generator">
            <div className="container">
                <div className="generator__inner">
                    <h1 className="generator__headline">Stable Diffusion</h1>
                    <input type="text" name="input" id="generate-image-prompt" placeholder='image description'  className="generator__input" />
                    <select name="model-select" id="model-select" className="generator__model-select" defaultValue={`Select Model`}>
                        <option value="Model 1"></option>
                        <option value="Model 2"></option>
                    </select>
                    <div className="generator__generated-image"></div>
                </div>
            </div>
        </section>
    );
};

export default Generator;
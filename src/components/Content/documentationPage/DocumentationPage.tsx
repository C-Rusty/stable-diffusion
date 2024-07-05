import './documentationPage.scss';

const DocumentationPage = () => {
    return (
        <div className="documentation">
            <div className="container">
                <div className="documentation__inner">
                    <h1 className='documentation__headline'>
                        Guide & FAQ
                    </h1>
                    <div className="documentation__first-block navigation">
                        <h2 className="headline" id='navigation'>
                            Navigation
                        </h2>
                        <div className="main nav">
                            <a href="#general-info" className="nav__link">
                                General Information
                            </a>
                            <a href="#current-models" className="nav__link">
                                Current models
                            </a>
                        </div>
                    </div>
                    <div className="documentation__second-block" id='general-info'>
                        <h2 className="headline">
                            Versions of Stable Diffusion:
                        </h2>
                        <div className="main">
                            <div className="main__left">
                                <h3 className="main__headline">V1. Legacy</h3>
                                <div className="main__text-container">
                                    <h4 className="main__subheadline">An old version with 2 models:</h4>
                                    <div className="main__text">
                                        <p className="main__text-item">
                                            Model XL
                                        </p>
                                        <p className="main__text-item">
                                            Model 1.6
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="main__right">
                                <h3 className="main__headline">V2. Current</h3>
                                <div className="main__text-container">
                                    <h4 className="main__subheadline">A new version with 3 models:</h4>
                                    <div className="main__text">
                                        <p className="main__text-item">Model Ultra</p>
                                        <p className="main__text-item">Model Core</p>
                                        <p className="main__text-item">Model 3</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="documentation__fourth-block" id='current-models'>
                        <h2 className="headline"> Ultra, Core, 3 and 3 Turbo models. What you should know:</h2>
                        <div className="main">
                            <div className="main__block">
                                <h3 className="main__block-subheadline">1. General Details</h3>
                                <ul className="list">
                                    <li className="list__item">
                                        You can generate only 1 image per request.
                                    </li>
                                    <li className="list__item">
                                        You can choose format for image: PNG, JPG, WEBP.
                                    </li>
                                    <li className="list__item sublist">
                                        You can choose among these aspect ratios:
                                        <ul className="sublist__list">
                                            <li className='sublist__item'>1:1</li>
                                            <li className='sublist__item'>16:9</li>
                                            <li className='sublist__item'>21:9</li>
                                            <li className='sublist__item'>2:3</li>
                                            <li className='sublist__item'>3:2</li>
                                            <li className='sublist__item'>4:5</li>
                                            <li className='sublist__item'>5:4</li>
                                            <li className='sublist__item'>9:16</li>
                                            <li className='sublist__item'>9:21</li>
                                        </ul>
                                    </li>
                                    <li className="list__item sublist">
                                        Price per image
                                        <ul className="sublist__list">
                                            <li className='sublist__item'>Ultra<br />1MP image = 8 credits</li>
                                            <li className='sublist__item'>Core<br />1MP image = 3 credits</li>
                                            <li className='sublist__item'>3 Large Turbo<br />1MP image = 4 credits</li>
                                            <li className='sublist__item'>3 Large<br />1MP image = 6.5 credits</li>
                                            <li className='sublist__item'>3 Medium<br />1MP image = 3.5 credits</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div className="main__block">
                                <h3 className="main__block-subheadline">2. Description of each model</h3>
                                <ul className="list">
                                    <li className="list__item">
                                        <p className="list__item-name">
                                            Ultra 
                                        </p>
                                        <div className="list__item-description">
                                            <p className="list__item-description-text">
                                                Most advanced text to image generation service, creates the highest quality images with unprecedented prompt understanding. Excels in typography, complex compositions, dynamic lighting, vibrant hues, and overall cohesion and structure of an art piece.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="list__item">
                                        <p className="list__item-name">
                                            Core 
                                        </p>
                                        <div className="list__item-description">
                                            <p className="list__item-description-text">
                                                Advanced workflow for generating high quality images quickly. Primary service for text-to-image generation, represents the best quality achievable at high speed.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="list__item">
                                        <p className="list__item-name">
                                            Stable Diffusion 3 Medium
                                        </p>
                                        <div className="list__item-description">
                                            <p className="list__item-description-text">
                                                The 2 billion parameter variant of Stable Diffusion 3.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="list__item">
                                        <p className="list__item-name">
                                            Stable Diffusion 3 Large
                                        </p>
                                        <div className="list__item-description">
                                            <p className="list__item-description-text">
                                                The 8 billion parameter variant of Stable Diffusion 3.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="list__item">
                                        <p className="list__item-name">
                                            Stable Diffusion 3 Large Turbo
                                        </p>
                                        <div className="list__item-description">
                                            <p className="list__item-description-text">
                                                The Turbo variant of Stable Diffusion 3 Large (faster).
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="main__block">
                                <h3 className="main__block-subheadline">3. Generation Options: for more precise result</h3>
                                <div className="main__block-item">
                                    <div className="list-container">
                                        <h4 className='list-container__headline'>Ultra model</h4>
                                        <ul className="list-container__list">
                                            <li className="list-container__list-item">
                                                <p className="name">
                                                    Negative Prompt
                                                </p>
                                                <div className="description">
                                                    <p className="description__text">
                                                        A blurb of text describing what you do not wish to see in the output image.
                                                    </p>
                                                    <p className="description__text">
                                                        Diapason: 0 - 10k symbols.
                                                    </p>
                                                </div>
                                            </li>
                                            <li className="list-container__list-item">
                                                <p className="name">
                                                    Aspect Ratio
                                                </p>
                                                <div className="description">
                                                    <p className="description__text">
                                                        Controls the aspect ratio of the generated image.
                                                    </p>
                                                </div>
                                            </li>
                                            <li className="list-container__list-item">
                                                <p className="name">
                                                    Output Format
                                                </p>
                                                <div className="description">
                                                    <p className="description__text">
                                                        Format of generated image.
                                                    </p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="list-container">
                                        <h4 className='list-container__headline'>Core model</h4>
                                        <ul className="list-container__list list-numeric">
                                            <li className="list-container__list-item">
                                                <p className="name">
                                                    Style Preset
                                                </p>
                                                <div className="description">
                                                    <p className="description__text">
                                                        Guides the image model towards a particular style.
                                                    </p>
                                                </div>
                                            </li>
                                            <li className="list-container__list-item">
                                                <p className="name">
                                                    Aspect Ratio
                                                </p>
                                                <div className="description">
                                                    <p className="description__text">
                                                        Controls the aspect ratio of the generated image.
                                                    </p>
                                                </div>
                                            </li>
                                            <li className="list-container__list-item">
                                                <p className="name">
                                                    Output Format
                                                </p>
                                                <div className="description">
                                                    <p className="description__text">
                                                        Format of generated image.
                                                    </p>
                                                </div>
                                            </li>
                                            <li className="list-container__list-item">
                                                <p className="name">
                                                    Seed
                                                </p>
                                                <div className="description">
                                                    <p className="description__text">
                                                        A specific value that is used to guide the 'randomness' of the generation.
                                                    </p>
                                                    <p className="description__text">
                                                        Diapason: 0 - 4294967294.
                                                    </p>
                                                    <p className="description__text">
                                                        Default: 0.
                                                    </p>
                                                </div>
                                            </li>
                                            <li className="list-container__list-item">
                                                <p className="name">
                                                    Negative Prompt
                                                </p>
                                                <div className="description">
                                                    <p className="description__text">
                                                        A blurb of text describing what you do not wish to see in the output image.
                                                    </p>
                                                    <p className="description__text">
                                                        Diapason: 0 - 10k symbols.
                                                    </p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="list-container">
                                        <h4 className='list-container__headline'>3 Model (Medium, Large, Large Turbo)</h4>
                                        <ul className="list-container__list list-numeric">

                                            <li className="list-container__list-item">
                                                <p className="name">
                                                    Image
                                                </p>
                                                <div className="description">
                                                    <p className="description__text">
                                                        The image to use as the starting point for the generation (Every side must be at least 64 pixels). Supports PNG, JPG and WEPB formats.
                                                    </p>
                                                    <p className="description__text">
                                                        Only for image-to-image mode (not available yet)
                                                    </p>
                                                </div>
                                            </li>
                                            <li className="list-container__list-item">
                                                <p className="name">
                                                    Strength
                                                </p>
                                                <div className="description">
                                                    <p className="description__text">
                                                        Controls how much influence the image parameter has on the generated image. 
                                                    </p>
                                                    <p className="description__text">
                                                        A value of 0 would yield an image that is identical to the input. A value of 1 would be as if you passed in no image at all.
                                                    </p>
                                                    <p className="description__text">
                                                        Only for image-to-image mode
                                                    </p>
                                                </div>
                                            </li>
                                            <li className="list-container__list-item">
                                                <p className="name">
                                                    Negative Prompt
                                                </p>
                                                <div className="description">
                                                    <p className="description__text">
                                                        A blurb of text describing what you do not wish to see in the output image. This parameter does not work with Large turbo.
                                                    </p>
                                                    <p className="description__text">
                                                        Diapason: up to 10.000 characters.
                                                    </p>
                                                </div>
                                            </li>
                                            <li className="list-container__list-item">
                                                <p className="name">
                                                    Mode
                                                </p>
                                                <div className="description">
                                                    <p className="description__text">
                                                        Text-to-image or image-to-image generation.
                                                    </p>
                                                    <p className="description__text">
                                                        Not available yet!
                                                    </p>
                                                </div>
                                            </li>
                                            <li className="list-container__list-item">
                                                <p className="name">
                                                    Aspect Ratio
                                                </p>
                                                <div className="description">
                                                    <p className="description__text">
                                                        Controls the aspect ratio of the generated image.
                                                    </p>
                                                    <p className="description__text">
                                                        Only for text-to-image requests
                                                    </p>
                                                </div>
                                            </li>
                                            <li className="list-container__list-item">
                                                <p className="name">
                                                    Model
                                                </p>
                                                <div className="description">
                                                    <p className="description__text">
                                                        The model to use for generation: Medium, Large, or Large Turbo.
                                                    </p>
                                                    <p className="description__text">
                                                        Default: Large.
                                                    </p>
                                                </div>
                                            </li>
                                            <li className="list-container__list-item">
                                                <p className="name">
                                                    Output Format
                                                </p>
                                                <div className="description">
                                                    <p className="description__text">
                                                        Format of generated image.
                                                    </p>
                                                </div>
                                            </li>
                                            <li className="list-container__list-item">
                                                <p className="name">
                                                    Seed
                                                </p>
                                                <div className="description">
                                                    <p className="description__text">
                                                        A specific value that is used to guide the 'randomness' of the generation.
                                                    </p>
                                                    <p className="description__text">
                                                        Diapason: 0 - 4294967294.
                                                    </p>
                                                    <p className="description__text">
                                                        Default: 0.
                                                    </p>
                                                </div>
                                            </li>
                                            <li className="list-container__list-item">
                                                <p className="name">
                                                    Style Preset
                                                </p>
                                                <div className="description">
                                                    <p className="description__text">
                                                        Guides the image model towards a particular style.
                                                    </p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentationPage;
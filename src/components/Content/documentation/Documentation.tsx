import './documentation.scss';

const Documentation = () => {
    return (
        <div className="documentation">
            <div className="container">
                <div className="documentation__inner">
                    <div className="documentation__first-block">
                        <h1 className='headline'>
                            Stable Diffusion: How to use
                        </h1>
                        <h2 className="subheadline">
                            There are two versions of Stable Diffusion:
                        </h2>
                        <div className="text-blocks">
                            <div className="text-blocks__item">
                                <h2 className="text-blocks__headline">The V1 includes the following models:</h2>
                                <ul className='text-blocks__list'>
                                    <li className='text-blocks__list-item'>Stable Diffusion XL</li>
                                    <li className='text-blocks__list-item'>Stable Diffusion v1.6</li>
                                </ul>
                            </div>
                            <div className="text-blocks__item">
                                <h2 className="text-blocks__headline">The V2 includes the following models</h2>
                                <ul className='text-blocks__list'>
                                    <li className='text-blocks__list-item'>Stable Diffusion Utra</li>
                                    <li className='text-blocks__list-item'>Stable Diffusion 3</li>
                                    <li className='text-blocks__list-item'>Stable Diffusion 3 Turbo</li>
                                    <li className='text-blocks__list-item'>Stable Diffusion Core</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="documentation__second-block">
                        <h1 className='headline'>
                            Stable Diffusion XL & 1.6
                        </h1>
                        <h2 className='subheadline'>
                            Details
                        </h2>
                        <ul className="list">
                            <li className='list-item'>
                                You can generate from 1 to 10 images per request using these models.
                            </li>
                            <li className='list-item'>
                                Limitation of resolutions for XL:
                                <ul className="list-item__sublist">
                                    <li className='list-item__sublist-item'>1024x1024</li>
                                    <li className='list-item__sublist-item'>1152x896</li>
                                    <li className='list-item__sublist-item'>896x1152</li>
                                    <li className='list-item__sublist-item'>1216x832</li>
                                    <li className='list-item__sublist-item'>1344x768</li>
                                    <li className='list-item__sublist-item'>768x1344</li>
                                    <li className='list-item__sublist-item'>1536x640</li>
                                    <li className='list-item__sublist-item'>640x1536</li>
                                </ul>
                            </li>
                            <li className='list-item'>
                                Limitation of resolutions for 1.6:
                                <ul className="list-item__sublist">
                                    <li className='list-item__sublist-item'>
                                        No dimension can be less than 320 pixels
                                    </li>
                                    <li className='list-item__sublist-item'>
                                        No dimension can be greater than 1536 pixels
                                    </li>
                                </ul>
                            </li>
                            <li className='block__list-item'>
                                Price per image
                                <ul className='list-item__sublist'>
                                    <li className='list-item__sublist-item'>XL: from 0.2 to 0.6 credits</li>
                                    <li className='list-item__sublist-item'>1.6: from 0.2 to 1 credits</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="documentation__third-block">
                        <h1 className='headline'>
                            Current Models: Ultra, Core, 3 and 3 Turbo
                        </h1>
                        <div className="text-block">
                            <h2 className='text-block__headline'>
                                General Details
                            </h2>
                            <ul className="text-block__list">
                                <li className='list-item'>
                                    You can generate only 1 image per request.
                                </li>
                                <li className='list-item'>
                                    You can choose what aspect ratio you want:
                                    <ul className="list-item__sublist">
                                        <li className='list-item__sublist-item'>1:1 (By default)</li>
                                        <li className='list-item__sublist-item'>16:9</li>
                                        <li className='list-item__sublist-item'>21:9</li>
                                        <li className='list-item__sublist-item'>2:3</li>
                                        <li className='list-item__sublist-item'>3:2</li>
                                        <li className='list-item__sublist-item'>4:5</li>
                                        <li className='list-item__sublist-item'>5:4</li>
                                        <li className='list-item__sublist-item'>9:16</li>
                                        <li className='list-item__sublist-item'>9:21</li>
                                    </ul>
                                </li>
                                <li className='list-item'>
                                    You can choose what img format can be:
                                    <ul className="list-item__sublist">
                                        <li className='list-item__sublist-item'>
                                            PNG
                                        </li>
                                        <li className='list-item__sublist-item'>
                                            JPEG
                                        </li>
                                        <li className='list-item__sublist-item'>
                                            WEBP
                                        </li>
                                    </ul>
                                </li>
                                <li className='list-item'>
                                    Price per image
                                    <ul className='list-item__sublist'>
                                        <li className='list-item__sublist-item'>XL: from 0.2 to 0.6 credits</li>
                                        <li className='list-item__sublist-item'>1.6: from 0.2 to 1 credits</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div className="text-block">
                            <h2 className='text-block__headline'>Description of each model</h2>
                            <div className="text-block__item">
                                <h3 className='name'>Ultra</h3>
                                <div className="description">
                                    <p className='description__text'>Most advanced text to image generation service, Stable Image Ultra creates the highest quality images with unprecedented prompt understanding. Ultra excels in typography, complex compositions, dynamic lighting, vibrant hues, and overall cohesion and structure of an art piece. Made from the most advanced models, including Stable Diffusion 3, Ultra offers the best of the Stable Diffusion ecosystem.</p>
                                    <p className='description__text'>Price: 8 credits per 1MP image</p>
                                </div>
                            </div>
                            <div className="text-block__item">
                                <h3 className='name'>Core</h3>
                                <div className="description">
                                    <p className='description__text'>Primary service for text-to-image generation, Stable Image Core represents the best quality achievable at high speed. No prompt engineering is required! Try asking for a style, a scene, or a character, and see what you get.</p>
                                    <p className='description__text'>Price: 3 credits per 1MP image.</p>
                                </div>
                            </div>
                            <div className="text-block__item">
                                <h3 className='name'>3 Turbo</h3>
                                <div className="description">
                                    <p className='description__text'>Stable Image 3 Turbo. A bit weaker than core and ultra models.</p>
                                    <p className='description__text'>Price: 6.5 credits per 1MP image</p>
                                </div>
                            </div>
                            <div className="text-block__item">
                                <h3 className='name'>3</h3>
                                <div className="description">
                                    <p className='description__text'>Stable Image 3. Weaker than 3 Turbo and Core.</p>
                                    <p className='description__text'>Price: 4 credits per 1MP image.</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-block">
                            <h2 className='text-block__headline'>Options</h2>
                            <div className="text-block">
                                <div className="text-block__item">
                                    <h3 className='name'>Aspect Ratio</h3>
                                    <div className="description">
                                        <p className='description__text'>An aspect ratio of image. First number is width, second number is height. </p>
                                        <p className='description__text'>By default is set to 1:1.</p>
                                    </div>
                                </div>
                                <div className="text-block__item">
                                    <h3 className='name'>Seed</h3>
                                    <div className="description">
                                        <p className='description__text'>A specific value that is used to guide the 'randomness' of the generation. B</p>
                                        <p className='description__text'>By default is set to 0. Max number: 4294967294.</p>
                                    </div>
                                </div>
                                <div className="text-block__item">
                                    <h3 className='name'>Style preset</h3>
                                    <div className="description">
                                        <p className='description__text'>Guides the image model towards a particular style.</p>
                                        <p className='description__text'>Can be used only in Core model.</p>
                                    </div>
                                </div>
                                <div className="text-block__item">
                                    <h3 className='name'>Negative Prompt</h3>
                                    <div className="description">
                                        <p className='description__text'>A blurb of text describing what you do not wish to see in the output image.</p>
                                        <p className='description__text'>Limitation: No more than 10 thousand symbols.</p>
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

export default Documentation;
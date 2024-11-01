import './documentationPage.scss';
import { ReactComponent as Arrow } from '../../../images/arrow.svg';
import { useEffect, useState } from 'react';

type Links = {
    link: `general-info-link` | `common-description-link` | `ultra-model-link` | `sd3-model-link` | `core-model-link`;
}

const DocumentationPage = () => {

    const headerOffsetHeight: number = 100;

    const [scrollYPostiion, setScrollYPostiion] = useState<number>(window.scrollY);
    const [pageSections, setPageSections] = useState<NodeListOf<Element> | []>([]);

    const handleScrollEvent = () => {
        setScrollYPostiion(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScrollEvent);
        setNavigationPosition(document.getElementById('navigation')?.getBoundingClientRect().top || 0);
        setPageSections(document.querySelectorAll('section'));
    }, []);

    const [isScrollOnTop, setIsScrollOnTop] = useState<boolean>(true);
    const [isNavigationSticky, setIsNavigationSticky] = useState<boolean>(false);
    const [navigationPosition, setNavigationPosition] = useState<number>(0);
    const [activeBtn, setActiveBtn] = useState< Links["link"] | undefined>(undefined);

    useEffect(() => {
        if (scrollYPostiion > navigationPosition + headerOffsetHeight) {
            setIsScrollOnTop(false);
            setIsNavigationSticky(true);
            setActiveNavLink();
        } else if (scrollYPostiion < headerOffsetHeight) {
            setIsScrollOnTop(true);
            setIsNavigationSticky(false);

            setActiveBtn(undefined);
        };

    }, [scrollYPostiion]);

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);

        if (!section) return console.log(`Section ${sectionId} not found`);

        const sectionPositionY = section.getBoundingClientRect().top + window.scrollY - headerOffsetHeight;

        if (section) window.scrollTo({ top: sectionPositionY, behavior: 'smooth' });
    };

    const setActiveNavLink = () => {
        pageSections.forEach((section) => {
            if (section.getBoundingClientRect().top <= scrollYPostiion / 4) {
                setActiveBtn(section.id + `-link` as Links["link"]);
            };
        });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="documentation">
            <div className="container">
                <div className="documentation__inner">
                    <h1 className='documentation__headline'>
                        Documentation
                    </h1>
                    <div className={`navigation ${isNavigationSticky ? 'sticky' : ''}`} id='navigation'>
                        <div className="navigation__inner">
                            <h2 className="navigation__headline">
                                Navigation
                            </h2>
                            <div className="navigation__main">
                                <button 
                                    onClick={() => {
                                        scrollToSection('general-info');
                                    }} 
                                    className={`navigation__main-link ${activeBtn === 'general-info-link' ? 'active' : ''}`}
                                    id='general-info-link'
                                >
                                    Models
                                </button>
                                <button 
                                    onClick={() => {
                                        scrollToSection('common-description');
                                    }}
                                    className={`navigation__main-link ${activeBtn === 'common-description-link' ? 'active' : ''}`}
                                    id='common-description-link'
                                >
                                    General Information
                                </button>
                                <button 
                                    onClick={() => {
                                        scrollToSection('ultra-model');
                                    }} 
                                    className={`navigation__main-link ${activeBtn === 'ultra-model-link' ? 'active' : ''}`}
                                    id='ultra-model-link'
                                >
                                    Ultra model description
                                </button>
                                <button 
                                    onClick={() => {
                                        scrollToSection('sd3-model');
                                    }} 
                                    className={`navigation__main-link ${activeBtn === 'sd3-model-link' ? 'active' : ''}`}
                                    id='sd3-model-link'
                                >
                                    SD 3 models description
                                </button>
                                <button 
                                    onClick={() => {
                                        scrollToSection('core-model');
                                    }} 
                                    className={`navigation__main-link ${activeBtn === 'core-model-link' ? 'active' : ''}`}
                                    id='core-model-link'
                                >
                                    Core model description
                                </button>
                            </div>
                        </div>
                    </div>
                    <section className="general-info" id='general-info'>
                        <div className="general-info__inner">
                            <h2 className="general-info__headline">
                                Stable Diffusion models
                            </h2>
                            <div className="general-info__main">
                                <div className="text-container">
                                    <p className="text-container__item">Ultra</p>
                                    <p className="text-container__item">3 Large Turbo</p>
                                    <p className="text-container__item">3 Large</p>
                                    <p className="text-container__item">3 Medium</p>
                                    <p className="text-container__item">Core</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="common-description" id='common-description'>
                        <div className="common-description__inner">
                            <h2 className="common-description__headline">What you should know</h2>
                            <div className="common-description__main">
                                <div className="text-container">
                                    <div className="text-container__item">
                                        <p className="text-container__item-headline">
                                            Limitations
                                        </p>
                                        <div className="text-container__item-text">
                                            <p className="text-item">
                                                Only one image at one request can be generated
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-container__item">
                                        <p className="text-container__item-headline">
                                            Image can be generated in these formats
                                        </p>
                                        <div className="text-container__item-text">
                                            <p className="text-item">
                                                PNG
                                            </p>
                                            <p className="text-item">
                                                JPG
                                            </p>
                                            <p className="text-item">
                                                WEBP
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-container">
                                    <h3 className="text-container__headline">Prices</h3>
                                    <div className="text-container__item-block">
                                        <p className='text-container__item-block-text'>
                                            <span className="text-item">
                                                Ultra
                                            </span>
                                            <span className="text-item">
                                                8 credits per 1MP image
                                            </span>
                                        </p>
                                        <p className='text-container__item-block-text'>
                                            <span className="text-item">
                                                3 Large Turbo
                                            </span>
                                            <span className="text-item">
                                                4 credits per 1MP image
                                            </span>
                                        </p>
                                        <p className='text-container__item-block-text'>
                                            <span className="text-item">
                                                3 Large
                                            </span>
                                            <span className="text-item">
                                                6.5 credits per 1MP image
                                            </span>
                                        </p>
                                        <p className='text-container__item-block-text'>
                                            <span className="text-item">
                                                3 Medium
                                            </span>
                                            <span className="text-item">
                                                3.5 credits per 1MP image
                                            </span>
                                        </p>
                                        <p className='text-container__item-block-text'>
                                            <span className="text-item">
                                                Core
                                            </span>
                                            <span className="text-item">
                                                3 credits per 1MP image
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="ultra-model" id='ultra-model'>
                        <div className="ultra-model__inner">
                            <h2 className="ultra-model__headline">
                                Ultra Model
                            </h2>
                            <div className="ultra-model__main">
                                <h3 className="subheadline">
                                    Most advanced text to image generation service, creates the highest quality images with unprecedented prompt understanding. <br />Excels in typography, complex compositions, dynamic lighting, vibrant hues, and overall cohesion and structure of an art piece.
                                </h3>
                                <div className="text-container">
                                    <h4 className="text-container__headline">
                                        Parameters
                                    </h4>
                                    <div className="text-container__block">
                                        <p className="name">
                                            Prompt
                                        </p>
                                        <div className="description">
                                            <p className="description__headline">
                                                What you wish to see in the output image. A strong, descriptive prompt that clearly defines elements, colors, and subjects will lead to better results.
                                            </p>
                                            <div className="description__block">
                                                <p className="description__block-item">
                                                    To control the weight of a given word use the format (word:weight), where word is the word you'd like to control the weight of and weight is a value between 0 and 1. For example: The sky was a crisp (blue:0.3) and (green:0.8) would convey a sky that was blue and green, but more green than blue.
                                                </p>
                                                <p className="description__block-item">
                                                    From 1 to 10.000 characters.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-container__block">
                                        <p className="name">
                                            Negative Prompt
                                        </p>
                                        <div className="description">
                                            <p className="description__headline">
                                                A blurb of text describing what you <b>do not</b> wish to see in the output image.
                                            </p>
                                            <div className="description__block">
                                                <p className="description__block-item">
                                                    Up to 10.000 characters.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-container__block">
                                        <p className="name">
                                            Aspect Ratio
                                        </p>
                                        <div className="description">
                                            <p className="description__headline">
                                                Controls the aspect ratio of the generated image.
                                                <b>This parameter is only valid for text-to-image requests.</b>
                                            </p>
                                            <div className="description__block">
                                                <p className="description__block-item">
                                                    Values (default 1:1):
                                                </p>
                                                <div className="description__block-item-list">
                                                    <p className='list-item'>1:1</p>
                                                    <p className='list-item'>16:9</p>
                                                    <p className='list-item'>21:9</p>
                                                    <p className='list-item'>2:3</p>
                                                    <p className='list-item'>3:2</p>
                                                    <p className='list-item'>4:5</p>
                                                    <p className='list-item'>5:4</p>
                                                    <p className='list-item'>9:16</p>
                                                    <p className='list-item'>9:21</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-container__block">
                                        <p className="name">
                                            Seed
                                        </p>
                                        <div className="description">
                                            <p className="description__headline">
                                                A specific value that is used to guide the 'randomness' of the generation. (Omit this parameter or pass 0 to use a random seed.)
                                            </p>
                                            <div className="description__block">
                                                <p className="description__block-item">
                                                    Value (default 0): <br />From 0 to 4294967294.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-container__block">
                                        <p className="name">Output Format</p>
                                        <div className="description">
                                            <p className="description__headline">
                                                Dictates the format of the generated image.
                                            </p>
                                            <div className="description__text-block">
                                                <p className="description__text-block-item">
                                                    Formats (default PNG):
                                                </p>
                                                <div className="description__block-item-list">
                                                    <p className='list-item'>JPEG</p>
                                                    <p className='list-item'>PNG</p>
                                                    <p className='list-item'>WebP</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="sd3-model" id='sd3-model'>
                        <div className="sd3-model__inner">
                            <h2 className="sd3-model__headline">
                                3 Models: Large Turbo, Large, Medium
                            </h2>
                            <div className="sd3-model__main">
                                <h3 className="subheadline">
                                    Latest base models from 2 to 8 billion parameters
                                </h3>
                                <div className="text-container">
                                    <h4 className="text-container__headline">
                                        Parameters
                                    </h4>
                                    <div className="text-container__block">
                                        <p className="name">
                                            Prompt
                                        </p>
                                        <div className="description">
                                            <p className="description__headline">
                                                What you wish to see in the output image. A strong, descriptive prompt that clearly defines elements, colors, and subjects will lead to better results.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-container__block">
                                        <p className="name">
                                            Negative Prompt
                                        </p>
                                        <div className="description">
                                            <p className="description__headline">
                                                A blurb of text describing what you do not wish to see in the output image.
                                                <br/>This parameter does not work with Large Turbo.
                                            </p>
                                            <div className="description__block">
                                                <p className="description__block-item">
                                                    Up to 10.000 characters.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-container__block">
                                        <p className="name">
                                            Aspect Ratio
                                        </p>
                                        <div className="description">
                                            <p className="description__headline">
                                                Controls the aspect ratio of the generated image.
                                                <b>This parameter is only valid for text-to-image requests.</b>
                                            </p>
                                            <div className="description__block">
                                                <p className="description__block-item">
                                                    Values (default 1:1):
                                                </p>
                                                <div className="description__block-item-list">
                                                    <p className='list-item'>1:1</p>
                                                    <p className='list-item'>16:9</p>
                                                    <p className='list-item'>21:9</p>
                                                    <p className='list-item'>2:3</p>
                                                    <p className='list-item'>3:2</p>
                                                    <p className='list-item'>4:5</p>
                                                    <p className='list-item'>5:4</p>
                                                    <p className='list-item'>9:16</p>
                                                    <p className='list-item'>9:21</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-container__block">
                                        <p className="name">
                                            Seed
                                        </p>
                                        <div className="description">
                                            <p className="description__headline">
                                                A specific value that is used to guide the 'randomness' of the generation. (Omit this parameter or pass 0 to use a random seed.)
                                            </p>
                                            <div className="description__block">
                                                <p className="description__block-item">
                                                    Value (default 0): <br />From 0 to 4294967294.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-container__block">
                                        <p className="name">Output Format</p>
                                        <div className="description">
                                            <p className="description__headline">
                                                Dictates the format of the generated image.
                                            </p>
                                            <div className="description__text-block">
                                                <p className="description__text-block-item">
                                                    Formats (default PNG):
                                                </p>
                                                <div className="description__block-item-list">
                                                    <p className='list-item'>JPEG</p>
                                                    <p className='list-item'>PNG</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="core-model" id='core-model'>
                        <div className="core-model__inner">
                            <h2 className="core-model__headline">
                                Core model
                            </h2>
                            <div className="core-model__main">
                                <h3 className="subheadline">
                                    Advanced workflow for generating high quality images quickly. <br />Primary service for text-to-image generation, represents the best quality achievable at high speed.
                                </h3>
                                <div className="text-container">
                                    <h4 className="text-container__headline">
                                        Parameters
                                    </h4>
                                    <div className="text-container__block">
                                        <p className="name">
                                            Prompt
                                        </p>
                                        <div className="description">
                                            <p className="description__headline">
                                                What you wish to see in the output image. A strong, descriptive prompt that clearly defines elements, colors, and subjects will lead to better results.
                                            </p>
                                            <div className="description__block">
                                                <p className="description__block-item">
                                                    To control the weight of a given word use the format (word:weight), where word is the word you'd like to control the weight of and weight is a value between 0 and 1. For example: The sky was a crisp (blue:0.3) and (green:0.8) would convey a sky that was blue and green, but more green than blue.
                                                </p>
                                                <p className="description__block-item">
                                                    From 1 to 10.000 characters.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-container__block">
                                        <p className="name">
                                            Negative Prompt
                                        </p>
                                        <div className="description">
                                            <p className="description__headline">
                                                A blurb of text describing what you do not wish to see in the output image.
                                            </p>
                                            <div className="description__block">
                                                <p className="description__block-item">
                                                    Up to 10.000 characters.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-container__block">
                                        <p className="name">
                                            Aspect Ratio
                                        </p>
                                        <div className="description">
                                            <p className="description__headline">
                                                Controls the aspect ratio of the generated image.
                                                <b>This parameter is only valid for text-to-image requests.</b>
                                            </p>
                                            <div className="description__block">
                                                <p className="description__block-item">
                                                    Values (default 1:1):
                                                </p>
                                                <div className="description__block-item-list">
                                                    <p className='list-item'>1:1</p>
                                                    <p className='list-item'>16:9</p>
                                                    <p className='list-item'>21:9</p>
                                                    <p className='list-item'>2:3</p>
                                                    <p className='list-item'>3:2</p>
                                                    <p className='list-item'>4:5</p>
                                                    <p className='list-item'>5:4</p>
                                                    <p className='list-item'>9:16</p>
                                                    <p className='list-item'>9:21</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-container__block">
                                        <p className="name">
                                            Seed
                                        </p>
                                        <div className="description">
                                            <p className="description__headline">
                                                A specific value that is used to guide the 'randomness' of the generation. (Omit this parameter or pass 0 to use a random seed.)
                                            </p>
                                            <div className="description__block">
                                                <p className="description__block-item">
                                                    Value (default 0): <br />From 0 to 4294967294.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-container__block">
                                        <p className="name">Output Format</p>
                                        <div className="description">
                                            <p className="description__headline">
                                                Dictates the format of the generated image.
                                            </p>
                                            <div className="description__text-block">
                                                <p className="description__text-block-item">
                                                    Formats (default PNG):
                                                </p>
                                                <div className="description__block-item-list">
                                                    <p className='list-item'>JPEG</p>
                                                    <p className='list-item'>PNG</p>
                                                    <p className='list-item'>WebP</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-container__block">
                                        <p className="name">Style Preset</p>
                                        <div className="description">
                                            <p className="description__headline">
                                                Guides the image model towards a particular style.
                                            </p>
                                            <div className="description__text-block">
                                                <p className="description__text-block-item">
                                                    Styles (default None):
                                                </p>
                                                <div className="description__block-item-list">
                                                    <p className="list-item">
                                                        3D Model
                                                    </p>
                                                    <p className="list-item">
                                                        Analog Film
                                                    </p>
                                                    <p className="list-item">
                                                        Anime
                                                    </p>
                                                    <p className="list-item">
                                                        Cinematic
                                                    </p>
                                                    <p className="list-item">
                                                        Comic Book
                                                    </p>
                                                    <p className="list-item">
                                                        Digital Art
                                                    </p>
                                                    <p className="list-item">
                                                        Enhance
                                                    </p>
                                                    <p className="list-item">
                                                        Fantasy Art
                                                    </p>
                                                    <p className="list-item">
                                                        Isometric
                                                    </p>
                                                    <p className="list-item">
                                                        Line Art
                                                    </p>
                                                    <p className="list-item">
                                                        Low-Poly
                                                    </p>
                                                    <p className="list-item">
                                                        Modeling Compound
                                                    </p>
                                                    <p className="list-item">
                                                        Neon Punk
                                                    </p>
                                                    <p className="list-item">
                                                        Origami
                                                    </p>
                                                    <p className="list-item">
                                                        Photographic
                                                    </p>
                                                    <p className="list-item">
                                                        Pixel Art
                                                    </p>
                                                    <p className="list-item">
                                                        Tile Texture
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <button 
                        type='button'
                        title='Scroll to top'
                        aria-label='Scroll to top' 
                        onClick={scrollToTop} 
                        className={`documentation__move-up-btn ${isScrollOnTop ? 'hidden' : ''}`}
                    >
                        <Arrow/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DocumentationPage;
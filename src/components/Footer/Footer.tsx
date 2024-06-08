import './footer.scss';

const Footer = () => {
    return(
        <footer className="footer">
            <div className="container">
                <div className="footer__inner">
                    <ul className="footer__list">
                        <li className="footer__list-item">
                            <a href="https://platform.stability.ai/docs/getting-started">
                                Stable Diffusion Docs (API & description)
                            </a> 
                        </li>
                        <li className="footer__list-item">
                            <a href="https://platform.stability.ai/pricing">
                                Stable Diffusion Pricing
                            </a> 
                        </li>
                        <li className="footer__list-item">
                            <a href="https://github.com/C-Rusty?tab=repositories">
                                My GitHub
                            </a> 
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
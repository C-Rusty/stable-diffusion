import { Link } from 'react-router-dom';
import { routes } from '../../routes/routes';
import './header.scss';

const Header = () => {

    return(
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <nav className="header__nav">
                        <Link className="header__nav-item" to={routes.generator.path}>Generator</Link>
                        <Link className="header__nav-item" to={routes.accounts.path}>Sign In</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
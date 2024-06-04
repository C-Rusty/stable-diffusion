import { Link } from 'react-router-dom';
import './header.scss';
import { urlPaths } from '../../routes/urlPaths';

const Header = () => {

    return(
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <nav className="header__nav">
                        <Link className="header__nav-item" to={urlPaths.home}>Generator</Link>
                        <Link className="header__nav-item" to={urlPaths.signIn}>Sign In</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
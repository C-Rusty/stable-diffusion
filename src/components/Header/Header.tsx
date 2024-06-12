import { Link, useLocation } from 'react-router-dom';
import { urlPaths } from '../../routes/urlPaths';
import './header.scss';
import { useEffect, useState } from 'react';

const Header = () => {

    const [currentPage, setCurrentPage] = useState('');

    const location = useLocation();

    useEffect(() => {
        setCurrentPage(location.pathname.substring(1));
    }, [location]);

    const selectedNavItemClassName: string = `selected-page-nav`;

    return(
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <h1 className="header__headline">Stable Diffusion</h1>
                    <nav className='header__nav'>
                        <ul className="header__nav-list">
                            <li className="header__nav-list-item">
                            <Link 
                                to={urlPaths.generator}
                                className={currentPage === urlPaths.generator ? selectedNavItemClassName : ''}
                            >Generator</Link>
                            </li>
                            <li className="header__nav-list-item">
                            <Link 
                                to={urlPaths.instructions}
                                className={currentPage === urlPaths.instructions ? selectedNavItemClassName : ''}
                            >Documentation</Link>
                            </li>
                            <li className="header__nav-list-item">
                            <Link 
                                to={urlPaths.myImages}
                                className={currentPage === urlPaths.myImages ? selectedNavItemClassName : ''}
                            >My Collection</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
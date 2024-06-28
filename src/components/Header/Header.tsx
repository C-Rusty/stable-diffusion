import { Link, useLocation } from 'react-router-dom';
import { urlPaths } from '../../routes/urlPaths';
import './header.scss';
import { useEffect, useState } from 'react';

const Header = () => {

    const [currentPage, setCurrentPage] = useState('');

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            setCurrentPage(urlPaths.home);
        } else {
            setCurrentPage(location.pathname.substring(1));
        }
    }, [location]);

    const selectedNavItemClassName: string = `selected-page-nav`;
    
    return(
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <Link to={urlPaths.home} className="header__headline">Stable Diffusion</Link>
                    <nav className='header__nav'>
                        <ul className="header__nav-list">
                            <li className="header__nav-list-item">
                                <Link 
                                    to={urlPaths.home}
                                    className={currentPage === urlPaths.home ? selectedNavItemClassName : ''}
                                >Generator</Link>
                            </li>
                            <li className="header__nav-list-item">
                                <Link 
                                    to={urlPaths.generationHistory}
                                    className={currentPage === urlPaths.generationHistory ? selectedNavItemClassName : ''}
                                >Generation History</Link>
                            </li>
                            <li className="header__nav-list-item">
                                <Link 
                                    to={urlPaths.favourites}
                                    className={currentPage === urlPaths.favourites ? selectedNavItemClassName : ''}
                                >Favourites</Link>
                            </li>
                            <li className="header__nav-list-item">
                                <Link 
                                    to={urlPaths.documentation}
                                    className={currentPage === urlPaths.documentation ? selectedNavItemClassName : ''}
                                >Documentation</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
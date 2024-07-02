import { urlPaths } from '../../routes/urlPaths';
import GoToButton from '../common/buttons/go-to-btn/GoToButton';
import {ReactComponent as NotFound} from '../../imgs/not-found.svg'
import './notFoundPage.scss';

const NotFoundPage = () => {
    return(
        <div className='not-found'>
            <div className="container">
                <div className="not-found__inner">
                    <div className="not-found__img-container">
                        <NotFound className='not-found__img'/>
                    </div>
                    <div className="not-found__action-btns-container">
                        <GoToButton urlPath={urlPaths.favourites} text="Go to favourites"/>
                        <GoToButton urlPath={urlPaths.home} text='Go to generator'/>
                        <GoToButton urlPath={urlPaths.documentation} text='Go to documentation'/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
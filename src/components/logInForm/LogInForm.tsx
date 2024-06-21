import { useContext, useState } from 'react';
import './logInForm.scss';
import { signIn } from '../../api/Api.FirebaseAuth';
import { Context } from '../app/App';
import { UserCredential } from 'firebase/auth';
import { cookieNameUser } from '../../utilities/commonVars';
import Loader from '../common/loader/Loader';

const LogInForm = () => {

    const {mobxStore} = useContext(Context);

    const [formFields, setFormFields] = useState<{
        userName: string,
        email: string,
        password: string,
    }>({
        userName: ``,
        email: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorCode, setErrorCode] = useState<string | undefined>(undefined);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormFields({
            ...formFields,
            [e.target.name]: e.target.value
        });
    };

    const clearForm = () => {
        setFormFields({
            userName: ``,
            email: '',
            password: ''
        });
    };

    const setCookie = (userId: string) => {
        const now: Date = new Date();
        const daysAmount: number = 7;
        
        now.setTime(now.getTime() + (daysAmount*24*60*60*1000));

        const cookieExpires: string = `expires=` + now.toUTCString();

        document.cookie = cookieNameUser + "=" + userId + ";" + cookieExpires + ";path=/";
    };
    
    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            setIsLoading(true);
            const response: UserCredential = await signIn(formFields.email, formFields.password);

            if (response) {
                mobxStore.login(true);
                setCookie(response.user.uid);
                setErrorCode(undefined);
            };
        } catch (error) {
            let message = `Something went wrong`;

            if (error instanceof Error) {
                message = error.message
            } else {
                message = String(error);
            };

            if (message.includes(`auth/invalid-credential`)) {
                setErrorCode(`Email or password is incorrect. Please try again.`);
            } else {
                setErrorCode(`Something went wrong. Error: ${message}.`);
            };

        } finally {
            setIsLoading(false);
            clearForm();
        };
    };

    return(
        <div className='log-in-form'>
            <div className="container">
                {isLoading ? 
                    <Loader />
                    :
                    <div className="log-in-form__inner">
                        <h1 className='log-in-form__headline'>
                            Stable Diffusion
                        </h1>
                        <form 
                            action="POST" 
                            method="post" 
                            className={`log-in-form__form`}
                            onSubmit={(e) => submitForm(e)}
                        >
                            <input 
                                type="email" 
                                name="email" 
                                required
                                placeholder="email" 
                                autoComplete='on'
                                className='log-in-form__input'
                                onChange={(e) => handleChange(e)}
                                value={formFields.email}
                            />
                            <input 
                                type="password" 
                                name="password" 
                                required
                                placeholder="password" 
                                className='log-in-form__input'
                                onChange={(e) => handleChange(e)}
                                value={formFields.password}
                            />
                            <div className="log-in-form__btn-container">
                                <button 
                                    type="submit"
                                    className={'log-in-form__btn'}
                                >Log In</button>
                            </div>
                        </form>
                        <h1 className={`log-in-form__error-message ${errorCode ? `show-error` : ``}`}>
                            {errorCode}
                        </h1>
                    </div>
                }
            </div>
        </div>
    );
};

export default LogInForm;
import { useContext, useState } from 'react';
import './authModal.scss';
import { signIn } from '../../api/Api.FirebaseAuth';
import { Context } from '../app/App';
import { UserCredential } from 'firebase/auth';
import { cookieNameUser } from '../../utilities/commonVars';

const AuthModal = () => {

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
        console.log(userId);

        document.cookie = cookieNameUser + "=" + userId + ";" + cookieExpires + ";path=/";
    };
    
    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response: UserCredential = await signIn(formFields.email, formFields.password);

            if (response) {
                mobxStore.login(true);
                setCookie(response.user.uid);
            };
            
            console.log(response.user);
        } catch (error) {
            throw new Error(`Something went wrong with sign in: ${error}`);
        };

        clearForm();
    };

    return(
        <div className='auth-modal'>
            <div className="container">
                <div className="auth-modal__inner">
                    <h1 className='auth-modal__headline'>
                        Stable Diffusion
                    </h1>
                    <form 
                        action="POST" 
                        method="post" 
                        className={`auth-modal__form`}
                        onSubmit={(e) => submitForm(e)}
                    >
                        <input 
                            type="email" 
                            name="email" 
                            required
                            placeholder="email" 
                            autoComplete='on'
                            className='auth-modal__input'
                            onChange={(e) => handleChange(e)}
                            value={formFields.email}
                        />
                        <input 
                            type="password" 
                            name="password" 
                            required
                            placeholder="password" 
                            className='auth-modal__input'
                            onChange={(e) => handleChange(e)}
                            value={formFields.password}
                        />
                        <div className="auth-modal__btn-container">
                            <button 
                                type="submit"
                                className={'auth-modal__btn'}
                            >Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
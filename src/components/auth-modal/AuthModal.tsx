import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import './authModal.scss';
import { createUser, signIn } from '../../api/firebase';

const AuthModal = (
    { setIsAuth }: 
    { setIsAuth: Dispatch<SetStateAction<boolean>>}
) => {

    const [formFields, setFormFields] = useState<{
        email: string;
        password: string
    }>({
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
            email: '',
            password: ''
        });
    };

    const setAuthCookie = () => {
        const d = new Date();
        d.setTime(d.getTime() + (30*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = `auth` + "=" + "true" + ";" + expires + ";path=/";
    };

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault()
   
        try {
            await signIn(formFields.email, formFields.password);
            setIsAuth(true);
            setAuthCookie();
        } catch (error) {
            throw new Error(`Something went wrong: ${error}`);
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
                        className='auth-modal__form'
                        onSubmit={(e) => submitForm(e)}
                    >
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="email" 
                            className='auth-modal__input'
                            onChange={(e) => handleChange(e)}
                            value={formFields.email}
                        />
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="password" 
                            className='auth-modal__input'
                            onChange={(e) => handleChange(e)}
                            value={formFields.password}
                        />
                        <div className="auth-modal__btn-container">
                            <button 
                                type="submit"
                                className={'auth-modal__btn'}
                            >Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
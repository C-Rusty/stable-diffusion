import { Fragment } from 'react/jsx-runtime';
import './inputFile.scss';
import {ReactComponent as UploadIcon} from '../../../images/upload-icon.svg';
import { Dispatch, useEffect, useState } from 'react';

interface InputProps {
    name: string,
    id?: string,
    accept?: string,
    label: string,
    required?: boolean,
    image: Blob | null,
    setImage: Dispatch<React.SetStateAction<Blob | null>>
};

const InputFile = ({ name, id, accept, label, required, image, setImage} : InputProps) => {

    const [imageName, setImageName] = useState<string | undefined>('');

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null) return;

        const file = e.target.files[0];

        if (file) {
            setImageName(file.name.split(`.`)[0]);
        
            const reader = new FileReader();
    
            reader.onload = async () => {
                const base = await (fetch( URL.createObjectURL(file)));
                const blob = await base.blob();
    
                setImage(blob);
            };
    
            reader.readAsDataURL(file);
        } else {
            setImage(image);
        };
    };

    return (
        <div className='input-container'>
            <label className="input-container__label">{label}</label>
            <div className="input-container__input">
                <input 
                    type="file"
                    name={name} 
                    id={id ? id : undefined} 
                    className={`input-container__file-input`}
                    aria-label='Upload image'
                    title='Upload image'
                    spellCheck='true'
                    required={required}
                    accept={accept}
                    placeholder='Click or drag n drop to upload image'
                    onChange={(e) => handleImageUpload(e)}
                />
                <label className='label-container'>
                    {imageName ?
                        <span className="input-container__name">
                            {imageName}
                        </span>
                        :
                        <Fragment>
                            <span className="input-container__label">Click or drag image here</span>
                            <UploadIcon/>
                        </Fragment>
                    }
                </label>
            </div>
        </div>
    );
};

export default InputFile;
import { Fragment } from 'react/jsx-runtime';
import './inputFile.scss';
import {ReactComponent as UploadIcon} from '../../../imgs/upload-icon.svg';
import { Dispatch, useState } from 'react';

interface InputProps {
    name: string,
    id?: string,
    accept?: string,
    className: string,
    setImage: Dispatch<React.SetStateAction<Blob | undefined>>
};

const InputFile = ({ name, id, accept, className, setImage} : InputProps) => {

    const [imageName, setImageName] = useState<string | undefined>('');

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        setImageName(file.name.split(`.`)[0]);
        
        const reader = new FileReader();

        reader.onload = async () => {
            const base = await (fetch( URL.createObjectURL(file)));
            const blob = await base.blob();

            setImage(blob);
        };

        reader.readAsDataURL(file);
    };

    return (
        <div className='input-container'>
            <label className="input-container__label">Image</label>
            <div className="input-container__input">
                <input 
                    type="file"
                    name={name} 
                    id={id ? id : undefined} 
                    className={`input-container__file-input`}
                    aria-label='Upload image'
                    title='Upload image'
                    autoComplete='on'
                    spellCheck='true'
                    required={true}
                    accept={accept}
                    onChange={(e) => handleImageUpload(e)}
                />
                <label className='label-container'>
                    {imageName ?
                        <span className="input-container__name">
                            {imageName}
                        </span>
                        :
                        <Fragment>
                            <span className="input-container__name">Upload Image</span>
                            <UploadIcon/>
                        </Fragment>
                    }
                </label>
            </div>
        </div>
    );
};

export default InputFile;
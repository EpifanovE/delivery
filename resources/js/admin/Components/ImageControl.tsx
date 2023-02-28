import * as React from "react";
import {FC, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {HasClassName} from "../types/general";
import UploadIcon from "./Icons/UploadIcon";
import TimesIcon from "./Icons/TimesIcon";
import SearchIcon from "./Icons/SearchIcon";

type ImageControlProps = {
    file?: File | string | null
    onChange: (file?: File) => void
    onClear?: () => void
    accept?: string
    imageUrl?: string
} & HasClassName

const ImageControl: FC<ImageControlProps> = ({file, onChange, onClear, accept, className, imageUrl}) => {

    const {t} = useTranslation();

    const inputRef = useRef<HTMLInputElement>(null);

    const [changed, setChanged] = useState(false);

    useEffect(() => {
        if (inputRef?.current) {
            inputRef.current.value = '';
        }
    }, [file]);

    const openFileDialog = () => {
        if (inputRef?.current) {
            inputRef.current.click();
        }
    };

    const getItemUrl = () => {
        if (isEmpty()) return;

        if (typeof file === "string") {
            return file
        }

        //@ts-ignore
        return URL.createObjectURL(file);
    }

    const isEmpty = (): boolean => {
        if (!file) return true;

        if (Array.isArray(file) && file.length === 0) return true;

        return false;
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget?.files?.length) {
            return;
        }
        setChanged(true);
        onChange(e.currentTarget.files[0]);
    }

    const handleClearClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setChanged(true);
        onChange(undefined);
    }

    const handleViewClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (imageUrl && !changed) {
            // @ts-ignore
            window.open(imageUrl, '_blank').focus();
        }
    }

    return (
        <div className={`group p-2 relative rounded-sm border${className ? ' ' + className : ''}`} onClick={openFileDialog} style={{width: '150px', height: '150px', cursor: 'pointer'}}>
            <div className={`border rounded-sm w-full h-full flex justify-center items-center overflow-hidden`}>
                {
                    isEmpty() &&
                    <div className={'flex flex-col items-center'}>
                        <UploadIcon className={'w-8 h-8 mb-2 fill-gray-400'}/>
                        <span>{t('upload')}</span>
                    </div>
                }

                {
                    !isEmpty() && <img src={getItemUrl()} className={'max-w-full h-auto'}/>
                }
                <input
                    type="file"
                    ref={inputRef}
                    onChange={handleFileChange}
                    multiple={false}
                    className={`hidden`}
                    accept={accept}
                />
                {
                    !isEmpty() &&
                    <button className="hidden group-hover:flex absolute top-0 right-0 w-8 h-8 bg-gray-800 hover:bg-gray-600 transition-colors items-center justify-center" onClick={handleClearClick}>
                        <TimesIcon className={'w-6 h-6 mr-0 fill-slate-100'} />
                    </button>
                }

                {
                    (imageUrl && !changed) &&
                    <button className="hidden group-hover:flex absolute top-0 right-8 w-8 h-8 bg-gray-800 hover:bg-gray-600 transition-colors flex items-center justify-center" onClick={handleViewClick}>
                        <SearchIcon className={'w-6 h-6 fill-slate-100'} />
                    </button>
                }
            </div>
        </div>
    )
}

export default ImageControl;

import { Row } from "@entities/table";
import { Portal, Input } from "@shared/ui";
import React, { useState, memo, useEffect, ChangeEvent, MouseEvent, useRef } from "react";
import cls from './AddCompanyButton.module.scss'

interface AddCompanyButtonProps {
    onAddCompany: (row: Row) => void
}

interface FormState {
    company: string,
    address: string,
}

const initiaFormState: FormState = {
    company: '',
    address: '',
}

export const AddCompanyButton: React.FC<AddCompanyButtonProps> = memo(({onAddCompany}) => {
    const [modalState, setModalState] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormState>(initiaFormState);
    const wrapperRef = useRef<HTMLDivElement>(null)

    const handleOpenModal = () => setModalState(true)
    const handleCloseModal = () => setModalState(false)

    const handleFormChange =  (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddCompany = () => {
        if(formData.company && formData.address) {
            onAddCompany({id: `${Date.now()}`, company: formData.company, address: formData.address, selected: false}) 
            handleCloseModal()
            setFormData(initiaFormState)
        }
    }

    const handleWrapperClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if(e.target === wrapperRef.current) handleCloseModal()
    }

    useEffect(() => {
        const handleEscKey = (e: KeyboardEvent) => {
            if(modalState && e.key === 'Escape') handleCloseModal()
        }
        document.addEventListener('keydown', handleEscKey)
        return () => document.removeEventListener('keydown', handleEscKey)
    }, [modalState])

    return (
        <>
            <button onClick={handleOpenModal}>Добавить компанию</button>
            {modalState && (
                <Portal>
                    <div id='modal-wrapper' ref={wrapperRef} className={cls.Wrapper} onClick={handleWrapperClick}>
                        <div className={cls.Form}>
                            <div>
                                <label htmlFor="company">Введите название комапнии: </label>
                                <Input id='company' value={formData.company} onChange={handleFormChange('company')}/>
                            </div>
                            <div>
                                <label htmlFor="address">Введите адрес комапнии: </label>
                                <Input id="address" value={formData.address} onChange={handleFormChange('address')}/>
                            </div>
                            <button onClick={handleAddCompany}>Добавить компанию</button>
                        </div>
                    </div>
                </Portal>
            )}
        </> 
    )
})
import { Row } from '@entities/Table';
import { Button, Input, Portal } from '@shared/ui';
import React, {
  ChangeEvent,
  MouseEvent,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';

import cls from './AddCompanyButton.module.scss';

interface AddCompanyButtonProps {
  onAddCompany: (row: Row) => void;
}

interface FormState {
  company: string;
  address: string;
}

const initiaFormState: FormState = {
  company: '',
  address: '',
};

export const AddCompanyButton: React.FC<AddCompanyButtonProps> = memo(
  ({ onAddCompany }) => {
    const [modalState, setModalState] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormState>(initiaFormState);
    const overlayRef = useRef<HTMLDivElement>(null);

    const handleOpenModal = () => setModalState(true);
    const handleCloseModal = () => setModalState(false);

    const handleFormChange =
      (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };

    const handleAddCompany = () => {
      if (formData.company && formData.address) {
        onAddCompany({
          id: `${Date.now()}`,
          company: formData.company,
          address: formData.address,
          selected: false,
        });
        handleCloseModal();
        setFormData(initiaFormState);
      }
    };

    const handleWrapperClick = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (e.target === overlayRef.current) handleCloseModal();
    };

    useEffect(() => {
      const handleEscKey = (e: KeyboardEvent) => {
        if (modalState && e.key === 'Escape') handleCloseModal();
      };
      document.addEventListener('keydown', handleEscKey);
      return () => document.removeEventListener('keydown', handleEscKey);
    }, [modalState]);

    return (
      <>
        <Button onClick={handleOpenModal}>Добавить</Button>
        {modalState && (
          <Portal>
            <div
              ref={overlayRef}
              className={cls.overlay}
              onClick={handleWrapperClick}
            >
              <div className={cls.modal}>
                <div className={cls.title}>Создание новой компании</div>
                <div className={cls.form}>
                  <label htmlFor="company">Введите название комапнии: </label>
                  <Input
                    id="company"
                    className={cls.input}
                    value={formData.company}
                    onChange={handleFormChange('company')}
                  />
                  <label htmlFor="address">Введите адрес комапнии: </label>
                  <Input
                    id="address"
                    className={cls.input}
                    value={formData.address}
                    onChange={handleFormChange('address')}
                  />
                </div>
                <div className={cls['button-container']}>
                  <Button onClick={handleAddCompany}>Добавить компанию</Button>
                </div>
              </div>
            </div>
          </Portal>
        )}
      </>
    );
  },
);

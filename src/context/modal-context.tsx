/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ModalProps } from 'antd';

interface ModalContextProps {
    showModal: (modalType: string, modalProps?: any, modalOptions?: ModalProps) => void;
    hideModal: () => void;
    modalType: string | null;
    modalProps: any;
    modalOptions: ModalProps;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [modalType, setModalType] = useState<string | null>(null);
    const [modalProps, setModalProps] = useState<any>({});
    const [modalOptions, setModalOptions] = useState<ModalProps>({});

    const showModal = (modalType: string, modalProps: any = {}, modalOptions: ModalProps = {}) => {
        setModalType(modalType);
        setModalProps(modalProps);
        setModalOptions(modalOptions);
    };

    const hideModal = () => {
        setModalType(null);
        setModalProps({});
        setModalOptions({});
    };

    return (
        <ModalContext.Provider value={{ showModal, hideModal, modalType, modalProps, modalOptions }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModalContext = (): ModalContextProps => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModalContext must be used within a ModalProvider');
    }
    return context;
};
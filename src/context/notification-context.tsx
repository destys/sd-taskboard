// NotificationContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationContextProps {
    openNotificationWithIcon: (type: NotificationType, message: string, description: string) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType, message: string, description: string) => {
        api[type]({
            message,
            description,
        });
    };

    return (
        <>
            {contextHolder}
            <NotificationContext.Provider value={{ openNotificationWithIcon }}>
                {children}
            </NotificationContext.Provider>
        </>
    );
};

export const useNotificationContext = (): NotificationContextProps => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotificationContext must be used within a NotificationProvider');
    }
    return context;
};
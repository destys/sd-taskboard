import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import { useAuth } from '../../context/auth-context';
import useProject from '../../hooks/use-project';
import { formatTime } from '../../utils/times';
import { useNotificationContext } from '../../context/notification-context';

// Типы пропсов
interface TimerProps {
    initialSeconds: number;
    taskId: number;
    projectId: number;
}

const SpentTime: React.FC<TimerProps> = ({ initialSeconds, taskId, projectId }) => {
    const { userToken } = useAuth();
    const { refetch } = useProject(projectId);
    const [seconds, setSeconds] = useState<number>(initialSeconds);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const { openNotificationWithIcon } = useNotificationContext();

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setSeconds(prevSeconds => +prevSeconds + 1);
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]);

    const sendTimeToServer = async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, { data: { spent_time: seconds } }, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            if (response.status === 200) {
                refetch();
                openNotificationWithIcon('success', 'Время изменено', `Время успешно изменено на ${formatTime(seconds)}`);
            }
        } catch (error) {
            console.error('Error sending time:', error);
            openNotificationWithIcon('error', 'Ошибка', 'Произошла ошибка при изменении времени');
        }
    };

    const handleButtonClick = () => {
        if (isRunning) {
            sendTimeToServer();
        }
        setIsRunning(!isRunning);
    };

    return (
        <div className="flex items-center gap-2">
            <button onClick={handleButtonClick}>
                {isRunning ? <PauseCircleFilled /> : <PlayCircleFilled />}
            </button>
            <p>{formatTime(seconds)}</p>
        </div>
    );
};

export default SpentTime;

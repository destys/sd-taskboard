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

    useEffect(() => {
        if (seconds % 10 === 0) sendTimeToServer();
    }, [seconds]);

    const sendTimeToServer = () => {
        axios.put(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, { data: { spent_time: seconds } }, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        }).then(() => {
        }).catch(error => {
            console.error('Error sending time:', error);
            openNotificationWithIcon('error', 'Ошибка', error.message);
        });
    };

    const handleButtonClick = () => {
        if (isRunning) {
            sendTimeToServer();
            refetch();
            openNotificationWithIcon('success', 'Время изменено', `Время успешно изменено на ${formatTime(seconds)}`);
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

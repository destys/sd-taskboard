import { Select } from "antd";
import { useAuth } from "../../context/auth-context";
import axios from "axios";
import useProject from "../../hooks/use-project";
import { openNotificationWithIcon } from "../../utils/notification";

interface IStatusSelect {
    taskId: number;
    projectId: number;
    defaultValue: string;
    options: { value: string; label: string }[];
}

const StatusSelect: React.FC<IStatusSelect> = ({ taskId, projectId, defaultValue, options }) => {
    const { userToken } = useAuth();
    const { refetch } = useProject(projectId);

    const handleChange = async (value: string) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, { data: { status: value } }, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            if (response.status === 200) {
                refetch();
                openNotificationWithIcon('success', 'Статус изменён', `Статус успешно изменен на "${value}"`);
            }
        } catch (error) {
            console.error('Error sending time:', error);
            openNotificationWithIcon('error', 'Ошибка', `Произошла ошибка при изменении статуса`);
        }

    }
    return (
        <>
            <Select
                defaultValue={defaultValue}
                style={{ width: 100 + '%' }}
                onChange={handleChange}
                options={options}
            />
        </>

    )
}

export default StatusSelect
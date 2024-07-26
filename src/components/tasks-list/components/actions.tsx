import { EditTwoTone, DeleteOutlined } from '@ant-design/icons';
import { Task } from '../../../types';
import axios from 'axios';
import { useAuth } from '../../../context/auth-context';
import useProject from '../../../hooks/use-project';
import { Button, Drawer, Popconfirm, Space } from 'antd';
import { openNotificationWithIcon } from '../../../utils/notification';
import { useState } from 'react';
import Comments from './comments/comments';

interface IActions {
    task: Task;
}

const Actions: React.FC<IActions> = ({ task }) => {
    const { userToken, role } = useAuth();
    const { refetch } = useProject(task.group.project.id);
    const [open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false);
    }

    const handleDelete = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${task.id}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        }).then(() => {
            refetch();
            openNotificationWithIcon('success', 'Задача удалена', ``);

        }).catch(error => {
            console.error(error);
            openNotificationWithIcon('error', 'Ошибка удаления задачи', error.message);
        })
    }

    return (
        <div className="flex gap-2">
            <EditTwoTone className="p-1 cursor-pointer rounded hover:bg-gray-100" onClick={() => setOpen(true)} />
            {role === 'admin' && (
                <Popconfirm
                    title="Подтверждение!"
                    description="Вы действительно хотите удалить задачу?"
                    onConfirm={handleDelete}
                    cancelText="Нет"
                    okText="Да"
                >
                    <DeleteOutlined className="text-red-500 cursor-pointer p-1 rounded hover:bg-gray-200" />
                </Popconfirm>
            )}
            <Drawer
                title={task.title}
                placement="right"
                size={'large'}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" onClick={onClose}>
                            OK
                        </Button>
                    </Space>
                }
            >
                <Comments task={task} />
            </Drawer>
        </div>
    )
}

export default Actions
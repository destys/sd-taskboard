import React from 'react';
import { Avatar, message, Popconfirm } from 'antd';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Comment } from '../../../../types';
import { useAuth } from '../../../../context/auth-context';
import RenderMedia from '../../../../utils/render-media';
import axios from 'axios';
import useProject from '../../../../hooks/use-project';
import { useParams } from 'react-router-dom';

interface ICommentItem {
    comment: Comment;
}

const CommentItem: React.FC<ICommentItem> = ({ comment }) => {
    const params = useParams();
    const { refetch } = useProject(Number(params.id) || 0);
    const { userId, userToken } = useAuth();

    // Основная функция для удаления комментария и связанных файлов
    const handleDelete = async () => {
        try {
            // Удаляем комментарий
            await axios.delete(`${process.env.REACT_APP_API_URL}/comments/${comment.id}`, {
                headers: {
                    Authorization: `Bearer ${userToken}` // Добавьте ваш токен авторизации
                }
            });

            message.success('Комментарий удален.');
            refetch();
        } catch (error) {
            console.error('Error deleting comment or files:', error);
            message.error('Error deleting comment or files');
        }
    };

    return (
        <div className={`p-3 border rounded-lg ${userId === comment.user.id && 'bg-blue-50'}`}>
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <Avatar size={42} icon={<UserOutlined />} />
                    <p className="text-lg font-medium">{comment.user.name}</p>
                </div>
                <div className="flex gap-2">
                    <div className="p-2 rounded-md bg-blue-100 font-medium">
                        {moment(comment.createdAt).format('HH:mm, DD MMM YYYY')}
                    </div>
                    <Popconfirm
                        title="Подтверждение!"
                        description={`Вы действительно хотите удалить комментарий?`}
                        onConfirm={handleDelete}
                        cancelText="Нет"
                        okText="Да"
                    >
                        <DeleteOutlined className="text-red-500 cursor-pointer p-1 rounded hover:bg-gray-200" onClick={(e) => e.stopPropagation()} />
                    </Popconfirm>
                </div>

            </div>
            <p>{comment.text}</p>
            {RenderMedia(comment.media)}
        </div>
    );
};

export default CommentItem;
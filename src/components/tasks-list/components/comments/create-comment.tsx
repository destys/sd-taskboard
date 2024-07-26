import React, { useState } from 'react';
import { Button, Form, message, Upload, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { Task } from '../../../../types';
import { useAuth } from '../../../../context/auth-context';
import axios from 'axios';
import useProject from '../../../../hooks/use-project';
import { useParams } from 'react-router-dom';

interface ICreateComment {
    task: Task;
}

const CreateComment: React.FC<ICreateComment> = ({ task }) => {
    const { userToken, userId } = useAuth();
    const params = useParams();
    const { refetch } = useProject(Number(params.id) || 0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [fileList, setFileList] = useState<any[]>([]);
    console.log('fileList: ', fileList);
    const [uploading, setUploading] = useState<boolean>(false); // Состояние для отслеживания загрузки файлов

    const uploadProps: UploadProps = {
        name: 'file',
        multiple: true,
        action: `${process.env.REACT_APP_API_URL}/upload`,
        headers: {
            Authorization: `Bearer ${userToken}`
        },
        showUploadList: true,
        beforeUpload: (file) => {
            setFileList(prev => [...prev, file]);
            return false; // Отменяем автоматическую загрузку
        },
        onRemove: (file) => {
            setFileList(prev => prev.filter(item => item.uid !== file.uid));
        }
    };

    const uploadFiles = async () => {
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('files', file);
        });

        try {
            setUploading(true);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            setUploading(false);
            return response.data; // Возвращаем данные ответа
        } catch (error) {
            setUploading(false);
            console.error('Error uploading files:', error);
            message.error('Error uploading files');
            return []; // Возвращаем пустой массив в случае ошибки
        }
    };

    const onFinish = async (values: { comment: string }) => {
        try {
            const files = await uploadFiles();

            // Отправляем комментарий вместе с URL загруженных файлов
            await axios.post(`${process.env.REACT_APP_API_URL}/comments`, {
                data: {
                    text: values.comment,
                    media: files,
                    task: task.id,
                    user: userId,
                }
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                }
            });

            message.success('Комментарий успешно отправлен');
            refetch(); 
            setFileList([]);
        } catch (error) {
            console.error('Error submitting comment:', error);
            message.error('Error submitting comment');
        }
    };

    return (
        <Form onFinish={onFinish}>
            <Form.Item name={'comment'} rules={[
                {
                    required: true,
                    message: '',
                },
            ]}>
                <TextArea placeholder="Напишите что-то…" rows={4} />
            </Form.Item>
            <Form.Item>
                <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Form.Item>
            <Button type="primary" htmlType="submit" disabled={uploading}>Отправить</Button>
        </Form>
    );
};

export default CreateComment;
import { UploadFile, UploadProps } from "antd/es/upload/interface";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/auth-context";
import { FileInterface } from "../types";

export interface UploadedFileResponse {
    id: number;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    url: string;
    formats: {
        thumbnail: {
            name: string;
            hash: string;
            ext: string;
            mime: string;
            url: string;
        };
    };
}

export const useUpload = (
    orderId: number,
    initialData: FileInterface[] | null,
    populateField: string
) => {
    const { userToken } = useAuth();
    const [files, setFiles] = useState<FileInterface[]>(initialData || []);

    const normFile = (e: { fileList: UploadFile[] }): UploadFile[] => e.fileList;

    const uploadProps: UploadProps = {
        name: "files",
        multiple: true,
        action: `${process.env.REACT_APP_API_URL}/upload`,
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
        onChange: async (info) => {
            if (info.file.status === "done" || info.file.status === "error") {
                const allUploadsDone = info.fileList.every(
                    (file) => file.status !== "uploading"
                );
                if (allUploadsDone) {
                    const successfulUploads = info.fileList.filter(
                        (file) => file.status === "done"
                    );
                    const newFiles = successfulUploads.map((file) => {
                        const response = file.response[0] as UploadedFileResponse;
                        return {
                            id: response.id,
                            attributes: {
                                name: response.name,
                                alternativeText: response.alternativeText,
                                caption: response.caption,
                                width: response.width,
                                height: response.height,
                                url: response.url,
                                formats: response.formats,
                            },
                        };
                    });
                    if (newFiles.length > 0) {
                        try {
                            await axios.put(
                                `${process.env.REACT_APP_API_URL}/orders/${orderId}?populate=${populateField}`,
                                {
                                    data: {
                                        [populateField]: [
                                            ...files.map((file) => file.id),
                                            ...newFiles.map((file) => file.id),
                                        ],
                                    },
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${userToken}`,
                                    },
                                }
                            );
                            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
                            /* toast.success("Файлы успешно загружены."); */
                        } catch (error) {
                            /* toast.error("Ошибка добавления файлов к заказу."); */
                        }
                    }
                }
            }
        },
    };

    const handleDelete = async (fileId: number) => {
        try {
            // Удаление привязки файла к заказу
            await axios.put(
                `${process.env.REACT_APP_API_URL}/orders/${orderId}`,
                {
                    data: {
                        [populateField]: files
                            .filter((file) => file.id !== fileId)
                            .map((file) => file.id),
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );
            // Удаление самого файла
            await axios.delete(
                `${process.env.REACT_APP_API_URL}/upload/files/${fileId}`,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                }
            );
            // Обновление состояния
            setFiles(files.filter((file) => file.id !== fileId));
            /* toast.success("Файл удален."); */
        } catch (error) {
            /* toast.error("Ошибка при удалении файла."); */
        }
    };

    return { files, normFile, uploadProps, handleDelete };
};
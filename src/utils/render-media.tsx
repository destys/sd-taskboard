import { Image, List, Typography } from "antd";
import { FileInterface } from "../types";

const RenderMedia = (media: FileInterface[]) => {
    const isImageUrl = (url: string) => {
        return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
    };

    if (media && media.length > 0) {
        // Фильтруем медиа по типу
        const images = media.filter(item => isImageUrl(item.url));
        const files = media.filter(item => !isImageUrl(item.url));

        return (
            <>
                {/* Рендерим изображения */}
                {images.length > 0 && (
                    <Image.PreviewGroup>
                        {images.map((image, index) => (
                            <Image
                                key={index}
                                width={200}
                                src={process.env.REACT_APP_API_UPLOAD_URL + image.url}
                                style={{ marginBottom: '10px' }}
                                alt={`media-${index}`}
                            />
                        ))}
                    </Image.PreviewGroup>
                )}

                {/* Рендерим другие файлы */}
                {files.length > 0 && (
                    <List
                        size="small"
                        bordered
                        dataSource={files}
                        renderItem={file => (
                            <List.Item>
                                <Typography.Text>
                                    <a href={process.env.REACT_APP_API_UPLOAD_URL + file.url} target="_blank" rel="noopener noreferrer">
                                        {file.name || 'Download'}
                                    </a>
                                </Typography.Text>
                            </List.Item>
                        )}
                    />
                )}
            </>
        );
    }
    return null;
};

export default RenderMedia;
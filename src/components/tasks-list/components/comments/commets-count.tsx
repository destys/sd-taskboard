import { CommentOutlined } from '@ant-design/icons';

const CommentsCount = ({ count }: { count: number }) => {
    return (
        <div className='relative text-xl'>
            <CommentOutlined />
            <span className='absolute w-4 h-4 bg-blue-500 -right-2 -bottom-1 flex justify-center items-center rounded-full text-[10px] text-white'>{count}</span>
        </div>
    )
}

export default CommentsCount
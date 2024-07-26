import { Task } from '../../../../types';
import CommentItem from './comment-item';
import CreateComment from './create-comment';

interface ICommentsList {
    task: Task;
}

const CommentsList: React.FC<ICommentsList> = ({ task }) => {
    console.log('task: ', task);

    return (
        <div>
            <CreateComment task={task} />

            <div className="grid gap-2 mt-6">
                {task.comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(comment => (
                    <CommentItem key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
};

export default CommentsList;
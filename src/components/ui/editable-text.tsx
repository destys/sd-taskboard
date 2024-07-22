import React, { useState } from 'react';

interface IEditableText {
    text: string;
    onTextChange: (newText: string) => void;
}

const EditableText: React.FC<IEditableText> = ({ text, onTextChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentText, setCurrentText] = useState(text);

    const handleBlur = () => {
        setIsEditing(false);
        onTextChange(currentText);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentText(event.target.value);
    };

    return (
        <div>
            {isEditing ? (
                <input
                    type="text"
                    value={currentText}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                    className='w-full'
                />
            ) : (
                <span onClick={() => setIsEditing(true)}>
                    {currentText}
                </span>
            )}
        </div>
    );
};

export default EditableText;
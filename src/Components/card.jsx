import React, { useRef, useState } from 'react';

const Card = ({ id, text, x, y, pinned, onDelete, onEdit, onPin, onDrag }) => {
    const [isEditing, setEditing] = useState(false);
    const [editedText, setEditedText] = useState(text);
    const textareaRef=useRef();
    
    const handleDelete = () => {
        onDelete(id);
    };

    const handleEdit = () => {
        setEditing(p=> !p);
        console.log(textareaRef.current)
        setTimeout(() => {
            if(textareaRef.current!==null)
            textareaRef.current.setSelectionRange(0, 0);
          }, 0) 
    }


    const handlePin = () => {
        onPin(id);
    };

    const handleDragStart = (e) => {
        console.log("dragStart",e.target.id);
        const offsetX = e.clientX - e.target.getBoundingClientRect().left;
        const offsetY = e.clientY - e.target.getBoundingClientRect().top ;
        console.log("offset",offsetX,offsetY,id);
        e.dataTransfer.setData('text/plain', JSON.stringify({ id, offsetX, offsetY }));

    };

    const handleDragOver = (e) => {
        e.preventDefault();    
    };

    const handleDragEnd = (e) => {
        const {id,offsetX, offsetY  } = JSON.parse(e.dataTransfer.getData('text/plain')) ;
        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;
        onDrag(id, newX, newY);
        setEditing(false)
        console.log("dragENd"); 
    };

    const handleSave = (e) => {
        e.preventDefault();
        onEdit(id,editedText);
        setEditing(p=>!p);
    }


    return (
        <div
            className={`note ${pinned ? 'pinned' : ''} ${isEditing ? 'editing' : ''} salsa-regular`}
            style={{ top: y, left: x}}
            draggable={!pinned}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="controls ">
                <button className='btn-st' onClick={handleEdit}>Edit</button>
                <button className='btn-st' onClick={handleDelete}>Delete</button>
                <button className='btn-st' onClick={handlePin}>{pinned ? 'Unpin' : 'Pin'}</button>
            </div>
            {isEditing ? (
                <div>
                    <textarea className='edit-area'
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        ref={textareaRef}
                    />
                    <button className='btn-st' onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div className={'note-text'}>{text}</div>
            )}

        </div>
    );
}
export default Card;

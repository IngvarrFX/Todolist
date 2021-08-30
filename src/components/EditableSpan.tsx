import React, {ChangeEvent, useState} from 'react';


type EditableSpanPropsType = {
    title: string
    callback: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    let [edit, setEdit] = useState(false)
    let [title, setTitle] = useState(props.title)
    const activateEditMode = () => setEdit(true)
    const deActivateEditMode = () => {
        setEdit(false)
        props.callback(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        edit ?
            <input value={title}
                   onBlur={deActivateEditMode}
                   autoFocus
                   onChange={onChangeHandler}
            />
            :
            <span
                onDoubleClick={activateEditMode}
            >{props.title}</span>
    )
}
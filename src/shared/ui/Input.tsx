import React, { InputHTMLAttributes, memo } from "react";

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = memo((props) => {
    return (
        <input {...props}/>
    )
})
import React, { InputHTMLAttributes, memo } from 'react';

import cls from './Input.module.scss';

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = memo(
  (props) => {
    return <input className={props.className || cls.input} {...props} />;
  },
);

import React, { ButtonHTMLAttributes, memo } from 'react';

import cls from './Button.module.scss';

export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = memo(
  (props) => {
    const { children, ...rest } = props;
    return (
      <button type="button" className={cls.button} {...rest}>
        {children}
      </button>
    );
  },
);

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg';
  border?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
  border = true,
}) => {
  const baseClasses = 'bg-white rounded-lg';
  
  const paddings = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };
  
  const shadows = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };
  
  const classes = [
    baseClasses,
    paddings[padding],
    shadows[shadow],
    border ? 'border border-gray-200' : '',
    className,
  ].join(' ');
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Card;
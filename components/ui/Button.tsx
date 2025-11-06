import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'learner' | 'mentor' | 'admin' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-nextstep-primary hover:bg-nextstep-primary-dark text-white focus:ring-nextstep-primary',
    secondary: 'bg-nextstep-secondary hover:bg-nextstep-secondary-dark text-white focus:ring-nextstep-secondary',
    learner: 'bg-learner hover:bg-blue-600 text-white focus:ring-learner',
    mentor: 'bg-mentor hover:bg-purple-600 text-white focus:ring-mentor',
    admin: 'bg-admin hover:bg-red-700 text-white focus:ring-admin',
    success: 'bg-success hover:bg-green-600 text-white focus:ring-success',
    warning: 'bg-warning hover:bg-yellow-500 text-gray-800 focus:ring-warning',
    error: 'bg-error hover:bg-red-600 text-white focus:ring-error',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const classes = [
    baseClasses,
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    className,
  ].join(' ');
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
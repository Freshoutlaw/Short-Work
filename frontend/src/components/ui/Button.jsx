// Button.jsx
import { memo } from 'react';

const Button = memo(({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-white text-black hover:bg-gray-200 font-semibold',
    secondary: 'bg-transparent border border-white text-white hover:bg-white/10',
    ghost: 'bg-transparent text-white hover:bg-white/5',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <button 
      className={`
        rounded-lg transition-all duration-200 font-medium
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;

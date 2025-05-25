interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  className = '',
}) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-bold transition-all duration-200 hover:scale-105';
  const variantStyles = {
    primary: 'bg-orange-500 text-white hover:bg-orange-400',
    secondary: 'border-2 border-orange-500 text-orange-500 hover:bg-orange-500/10',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
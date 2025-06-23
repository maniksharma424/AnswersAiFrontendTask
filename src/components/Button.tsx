import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  children,
  iconLeft,
  iconRight,
  ...buttonProps
}) => {
  const baseClasses =
    "bg-bg_primary_light border border-border_primary p-2 rounded-lg text-white text-sm font-normal flex items-center gap-2 font-robert transition-transform duration-100 active:scale-95";

  return (
    <button className={`  ${className} ${baseClasses}`} {...buttonProps}>
      {iconLeft && <span className="flex-shrink-0">{iconLeft}</span>}
      {children}
      {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </button>
  );
};

export default Button;

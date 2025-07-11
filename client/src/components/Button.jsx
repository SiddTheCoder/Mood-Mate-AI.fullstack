import React from "react";

function Button({
  children,
  onClick,
  variant = "primary", // 'primary', 'secondary', or 'outline'
  size = "sm", // 'sm', 'md', 'lg'
  disabled = false,
  className = "",
  type = "button",
  icon: Icon, // Lucide Icon component (optional)
}) {
  const baseStyles = `
    inline-flex items-center justify-center font-medium
    rounded-xl transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    active:scale-95 backdrop-blur-md 
    group
  `;

  const variantStyles = {
    primary: `
      bg-gradient-to-r from-blue-300 via-blue-100 to-purple-200
      text-purple-900 shadow-md
      hover:from-purple-200 hover:to-blue-300
      focus:ring-purple-300
    `,
    secondary: `
      bg-gradient-to-r from-blue-600 to-purple-600 text-white
      hover:from-purple-600 hover:to-blue-600
      focus:ring-blue-300
    `,
    outline: `
      bg-white/60 border border-purple-300 text-purple-700
      hover:bg-purple-100/30
      focus:ring-purple-200
    `,
  };

  const sizeStyles = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabledStyle}
        ${className}
      `}
    >
      <span className="inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
        {children}
        {Icon && <Icon size={16} />}
      </span>
    </button>
  );
}

export default Button;

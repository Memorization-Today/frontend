// src/components/ui/Button.jsx

export default function Button({
    children,
    variant = "primary",
    size = "md",
    className = "",
    ...props
  }) {
    const base = "rounded-lg font-medium transition text-sm focus:outline-none";
  
    const sizes = {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-3 text-base"
    };
  
    const variants = {
      primary: "bg-primary text-white hover:bg-blue-700",
      secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
      subtle: "bg-transparent text-gray-500 hover:text-gray-800"
    };
  
    return (
      <button
        {...props}
        className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  }
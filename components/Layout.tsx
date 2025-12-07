import React from 'react';

export const GlassCard: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div 
    onClick={onClick}
    className={`glass-card rounded-2xl p-6 text-slate-100 shadow-xl transition-all duration-300 ${onClick ? 'cursor-pointer glass-card-hover' : ''} ${className}`}
  >
    {children}
  </div>
);

export const Button: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'; 
  className?: string;
  disabled?: boolean;
}> = ({ children, onClick, variant = 'primary', className = '', disabled = false }) => {
  const baseStyle = "px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-tealAccent text-slate-900 hover:bg-teal-300 shadow-[0_0_15px_rgba(45,212,191,0.3)]",
    secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/10",
    danger: "bg-rose-500/80 text-white hover:bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]",
    ghost: "text-tealAccent hover:text-teal-300 hover:bg-white/5"
  };

  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export const Badge: React.FC<{ children: React.ReactNode; color?: 'green' | 'amber' | 'blue' | 'purple' }> = ({ children, color = 'blue' }) => {
    const colors = {
        green: 'bg-green-500/20 text-green-300 border-green-500/30',
        amber: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[color]}`}>
            {children}
        </span>
    );
}

import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'blue' | 'yellow' | 'gray' | 'red';
}

const variantClasses = {
  green: 'bg-green-100 text-green-700 border-green-200',
  blue: 'bg-blue-100 text-blue-700 border-blue-200',
  yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  gray: 'bg-gray-100 text-gray-700 border-gray-200',
  red: 'bg-red-100 text-red-700 border-red-200',
};

export default function Badge({ children, variant = 'blue' }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variantClasses[variant]
      )}
    >
      {children}
    </span>
  );
}

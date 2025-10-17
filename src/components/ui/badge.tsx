import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-champagne-beige text-jet-black hover:bg-dusty-rose',
        secondary:
          'border-transparent bg-blush-pink text-jet-black hover:bg-champagne-beige',
        destructive:
          'border-transparent bg-red-500 text-white hover:bg-red-600',
        outline: 'text-jet-black border-warm-gray',
        success:
          'border-transparent bg-green-100 text-green-800 hover:bg-green-200',
        warning:
          'border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
        sale:
          'border-transparent bg-dusty-rose text-soft-white hover:bg-red-600',
        new:
          'border-transparent bg-green-500 text-white hover:bg-green-600',
        trending:
          'border-transparent bg-gradient-primary text-jet-black',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

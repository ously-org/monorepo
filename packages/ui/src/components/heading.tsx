import * as React from 'react';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 1, className, ...props }, ref) => {
    const Tag = `h${level}` as const;
    return <Tag ref={ref} className={className} {...props} />;
  }
);
Heading.displayName = 'Heading';

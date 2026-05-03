import type * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';
import {
  Avatar as ShadcnAvatar,
  AvatarImage as ShadcnAvatarImage,
  AvatarFallback as ShadcnAvatarFallback,
} from '../internal/avatar';

export interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size?: 'default' | 'sm' | 'lg';
}

/**
 * Public Avatar component wrapping the internal shadcn implementation.
 */
const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  (props, ref) => <ShadcnAvatar ref={ref} {...props} />
);
Avatar.displayName = 'Avatar';

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>((props, ref) => <ShadcnAvatarImage ref={ref} {...props} />);
AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>((props, ref) => <ShadcnAvatarFallback ref={ref} {...props} />);
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback };

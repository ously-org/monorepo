import * as React from 'react';
import {
  Button as ShadcnButton,
  type ButtonProps as ShadcnButtonProps,
} from '../internal/button-shadcn';

export interface ButtonProps extends ShadcnButtonProps {}

/**
 * Public Button component wrapping the internal shadcn implementation.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <ShadcnButton ref={ref} {...props} />;
});

Button.displayName = 'Button';

export { Button };

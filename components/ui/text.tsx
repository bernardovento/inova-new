// ~/components/ui/text.tsx
import * as Slot from '@rn-primitives/slot';
import type { SlottableTextProps, TextRef } from '@rn-primitives/types';
import * as React from 'react';
import { Text as RNText } from 'react-native';
import { cn } from '~/lib/utils';

const TextClassContext = React.createContext<string | undefined>(undefined);

const Text = React.forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, style, ...props }, ref) => {
    const textClass = React.useContext(TextClassContext);
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn('text-base web:select-text', textClass, className)}
        style={style} // Passa o estilo diretamente
        ref={ref}
        {...props}
      />
    );
  }
);
Text.displayName = 'Text';

export { Text, TextClassContext };

/**
 * This file redirects TypeScript to use our local React types
 * instead of trying to look for the pnpm path
 */

declare module 'react' {
  export * from '@types/react';
}

declare module 'react-dom' {
  export * from '@types/react-dom';
} 
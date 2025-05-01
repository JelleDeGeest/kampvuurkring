// This file fixes TypeScript errors related to missing React types
// Provides minimal type definitions for the React package

declare module 'react' {
  // Minimal type definitions to satisfy imports
  export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useContext<T>(context: React.Context<T>): T;
  export function createContext<T>(defaultValue: T): React.Context<T>;
  export function useRef<T>(initialValue: T): { current: T };
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
  export function useMemo<T>(factory: () => T, deps: any[]): T;
  export function useReducer<S, A>(reducer: (state: S, action: A) => S, initialState: S): [S, (action: A) => void];
  export const Fragment: any;
  export function isValidElement(object: any): boolean;
  
  // Component types
  export interface ForwardRefExoticComponent<P> {
    (props: P): ReactElement | null;
    displayName?: string;
  }
  
  export function forwardRef<T, P>(render: (props: P, ref: React.Ref<T>) => React.ReactElement | null): ForwardRefExoticComponent<P & { ref?: React.Ref<T> }>;
  export function memo<P>(component: React.FunctionComponent<P>): React.FunctionComponent<P>;
  export function createRef<T>(): { current: T | null };
  
  // Common interfaces
  export interface Context<T> {
    Provider: Provider<T>;
    Consumer: Consumer<T>;
    displayName?: string;
  }

  export type Provider<T> = {
    (props: { value: T; children?: ReactNode }): ReactElement | null;
  };

  export type Consumer<T> = {
    (props: { children: (value: T) => ReactNode }): ReactElement | null;
  };

  export type ReactNode = ReactElement | string | number | boolean | null | undefined;
  export interface ReactElement<P = any> {
    type: any;
    props: P;
    key: any;
  }
  
  export type Ref<T> = { current: T | null } | ((instance: T | null) => void);
  export interface FunctionComponent<P = {}> {
    (props: P): ReactElement | null;
    displayName?: string;
  }
  
  // HTML attributes
  export interface HTMLAttributes<T> {
    className?: string;
    id?: string;
    style?: any;
    [key: string]: any;
  }
  
  export interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
  }
  
  export interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: string;
    value?: any;
    onChange?: any;
    disabled?: boolean;
  }
  
  export interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
    htmlFor?: string;
  }
  
  export interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: string;
    onChange?: any;
    rows?: number;
    cols?: number;
  }
  
  export default {
    useState,
    useEffect,
    useContext,
    createContext,
    useRef,
    useCallback,
    useMemo,
    useReducer,
    Fragment,
    forwardRef,
    memo,
    createRef,
    isValidElement
  };
}

declare module 'react-dom' {
  export function createPortal(children: any, container: Element): any;
  export function flushSync<R>(fn: () => R): R;
  export default {
    createPortal,
    flushSync
  };
} 
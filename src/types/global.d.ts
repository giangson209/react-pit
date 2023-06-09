import React from 'react';

declare module 'react' {
  interface HTMLAttributes<T> {
    'data-theme'?: 'dark' | 'light';
  }
}

declare global {
  interface Window {
    __settings: HTMLElement;
    __next: HTMLElement;
    __modals: HTMLElement;
    __tooltip: HTMLElement;
  }
  var __settings: HTMLElement;
  var __next: HTMLElement;
  var __modals: HTMLElement;
  var __tooltip: HTMLElement;
}

// typings.d.ts
import { DetailedHTMLProps, HTMLAttributes } from 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // allow all lowercase
    'ion-icon'?: any;
    // allow PascalCase as well
    IonIcon?: any;
  }
}


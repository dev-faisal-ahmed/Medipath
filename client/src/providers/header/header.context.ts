import { createContext, ReactNode, useContext } from 'react';

interface IHeaderContext {
  updateHeaderChild(child: ReactNode | null): void;
  updateHeaderTitle(title: ReactNode | string): void;
}

export const HeaderContext = createContext<IHeaderContext | null>(null);

export function useHeaderContext() {
  const context = useContext(HeaderContext);
  if (!context) throw new Error('UseHeaderContext must be used within HeaderProvider');
  return context;
}

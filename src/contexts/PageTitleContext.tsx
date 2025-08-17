import { createContext, useContext, useState, ReactNode } from "react";

interface PageTitleContextType {
  title: string;
  setTitle: (title: string) => void;
}

const PageTitleContext = createContext<PageTitleContextType | undefined>(undefined);

export const PageTitleProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState("");

  return (
    <PageTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
};

export const usePageTitle = (): PageTitleContextType => {
  const context = useContext(PageTitleContext);
  if (!context) {
    throw new Error("usePageTitle deve ser usado dentro de PageTitleProvider");
  }
  return context;
};
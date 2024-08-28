import { createContext, useContext, useState } from "react";

interface OptionsContextState {
  searchAsYouType: boolean;
  highlighting: boolean;
  toggleSearchAsYouType: () => void;
  toggleHighlighting: () => void;
}

const OptionsContext = createContext<OptionsContextState>({
  searchAsYouType: true,
  highlighting: true,
  toggleSearchAsYouType: () => {},
  toggleHighlighting: () => {},
});

export const useOptionsContext = () => useContext(OptionsContext);

interface OptionsProviderProps {
  children: React.ReactNode;
}

export const OptionsProvider: React.FC<OptionsProviderProps> = ({
  children,
}) => {
  const [searchAsYouType, setSearchAsYouType] = useState<boolean>(true);
  const [highlighting, setHighlighting] = useState<boolean>(true);

  function toggleSearchAsYouType() {
    setSearchAsYouType((prev) => !prev);
  }

  function toggleHighlighting() {
    setHighlighting((prev) => !prev);
  }

  return (
    <OptionsContext.Provider
      value={{
        searchAsYouType,
        highlighting,
        toggleSearchAsYouType,
        toggleHighlighting,
      }}>
      {children}
    </OptionsContext.Provider>
  );
};

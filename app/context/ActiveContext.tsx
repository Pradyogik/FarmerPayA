import React, { createContext, useContext, useState, ReactNode } from "react";

type ActiveState = {
  maritalStatus: boolean;
  education: boolean;
  familyMembers: boolean;
  domesticTravel: boolean;
  internationalTravel: boolean;
  personalIntrests: boolean;
};

type ActiveContextType = {
  activez: ActiveState;
  setActivez: React.Dispatch<React.SetStateAction<ActiveState>>;
};

const ActiveContext = createContext<ActiveContextType | undefined>(undefined);

export const ActiveProvider = ({ children }: { children: ReactNode }) => {
  const [activez, setActivez] = useState<ActiveState>({
    maritalStatus: false,
    education: false,
    familyMembers: false,
    domesticTravel: false,
    internationalTravel: false,
    personalIntrests: false,
  });

  return (
    <ActiveContext.Provider value={{ activez, setActivez }}>
      {children}
    </ActiveContext.Provider>
  );
};

export const useActivez = () => {
  const context = useContext(ActiveContext);
  if (!context) {
    throw new Error("useActive must be used within an ActiveProvider");
  }
  return context;
};

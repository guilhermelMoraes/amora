import Box from '@mui/material/Box';
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  SyntheticEvent,
} from 'react';

type TabProps = {
  index: number;
  children: ReactNode;
  name: string;
  icon?: string | ReactElement;
};

type TabPanelProps = {
  children: ReactNode;
  index: number;
  currentIndex: number;
};

function TabPanel({ currentIndex, index, children }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={currentIndex !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {currentIndex === index && children}
    </div>
  );
}

type TabsProps = {
  ariaLabel?: string;
  tabs: TabProps[];
  tabIndex: number;
  setTabIndex: Dispatch<SetStateAction<number>>;
};

function Tabs({ tabs, ariaLabel, setTabIndex, tabIndex }: TabsProps) {
  const navigateToTab = (_event: SyntheticEvent, currentTabIndex: number) => {
    setTabIndex(currentTabIndex);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MuiTabs
          value={tabIndex}
          onChange={navigateToTab}
          aria-label={ariaLabel}
          centered
        >
          {tabs.map(({ icon, name, index }) => {
            const id = `tab-${index}`;

            return (
              <MuiTab
                label={name}
                icon={icon}
                iconPosition="start"
                id={id}
                key={id}
              />
            );
          })}
        </MuiTabs>
      </Box>
      {tabs.map(({ children, index }) => (
        <TabPanel index={index} currentIndex={tabIndex} key={index}>
          {children}
        </TabPanel>
      ))}
    </>
  );
}

Tabs.defaultProps = {
  ariaLabel: 'Tabs',
};

export default Tabs;
export type { TabsProps, TabProps };

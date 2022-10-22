import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ReactNode, SyntheticEvent, useState } from 'react';

type TabProps = {
  index: number;
  children: ReactNode;
  name: string;
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
};

function Tabs({ tabs, ariaLabel }: TabsProps) {
  const [tabIndex, setTabIndex] = useState<number>(0);

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
          {tabs.map(({ name, index }) => {
            const id = `tab-${index}`;

            return <MuiTab label={name} id={id} key={id} />;
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

import { type FC } from 'react'
import { TabPanel, Tabs } from '@mui/joy'
import { Tab } from 'components/tabs/Tab'
import TabList from 'components/tabs/TabList'
import UsersTable from 'pages/dashboard/UsersTable'

const UsersTabs: FC = () => {
  return (
    <div>
      <Tabs orientation='horizontal' size='sm'>
        <TabList>
          <Tab>Users</Tab>
          <Tab disabled>User roles</Tab>
        </TabList>
        <TabPanel sx={{ p: '1.5rem 0 0 0' }}>
          <UsersTable />
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default UsersTabs

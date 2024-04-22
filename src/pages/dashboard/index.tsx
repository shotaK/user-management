import { type FC } from 'react'

import Header from 'components/layout/Header'
import Content from 'components/layout/Content'
import UsersTabs from 'pages/dashboard/UsersTabs'

const Dashboard: FC = () => {
  return (
    <Content>
      <Header />
      <UsersTabs />
    </Content>
  )
}

export default Dashboard

import { useContext } from 'react'

import { FrigadeContext } from '../components/Provider'

export function useGroup() {
  const { groupId, frigade } = useContext(FrigadeContext)

  async function setProperties(properties?: Record<string, any>) {
    await frigade.group(groupId, properties)
  }

  return { groupId, setProperties }
}
import { useContext } from 'react'

import { FrigadeContext } from '@/components/Provider'

import { useFlow } from '@/hooks/useFlow'
import { useCollections } from './useCollections'

export function useCollection(collectionId: string) {
  const { frigade } = useContext(FrigadeContext)
  const { collections } = useCollections()

  const collection = collections?.get(collectionId)

  const enrichedFlows =
    collections
      ?.get(collectionId)
      ?.flows?.filter((flowInCollection) => flowInCollection.visible)
      .map((item) => ({
        ...item,
        flow: frigade?.getFlowSync(item.flowId),
      })) ?? []

  const flowId = enrichedFlows.find(({ flow }) => flow.isVisible)?.flowId

  const { flow } = useFlow(flowId)

  return {
    collection,
    currentFlow: flow,
  }
}

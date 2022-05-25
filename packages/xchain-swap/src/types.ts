import { Asset, BaseAmount } from '@xchainjs/xchain-util'
import BigNumber from 'bignumber.js'

import { LiquidityPool } from './LiquidityPool'

export type TotalFees = {
  inboundFee: BaseAmount
  swapFee: BaseAmount
  outBoundFee: BaseAmount
  affiliateFee: BaseAmount
}

export type SwapEstimate = {
  totalFees: TotalFees
  slipPercentage: BigNumber
  netOutput: BaseAmount
  isHalted: boolean
}
export type PoolCache = {
  lastRefreshed: number
  pools: LiquidityPool[]
}
export type ThorchainAMMConfig = {
  expirePoolCacheMillis: number
  midgardBaseUrl: string
}

export type EstimateSwapParams = {
  sourceAsset: Asset
  inputAmount: BaseAmount
  destinationAsset: Asset
  affiliateFee: BigNumber
  slipLimit: BigNumber
}

import { Network } from '@xchainjs/xchain-client'
import { Configuration, MidgardApi } from '@xchainjs/xchain-midgard'
import { baseAmount } from '@xchainjs/xchain-util'
import BigNumber from 'bignumber.js'

import { LiquidityPool } from './LiquidityPool'
import { EstimateSwapParams, PoolCache, SwapEstimate, ThorchainAMMConfig } from './types'

const defaultThorchainAMMConfig: Record<Network, ThorchainAMMConfig> = {
  mainnet: {
    expirePoolCacheMillis: 6000,
    midgardBaseUrl: 'https://midgard.thorchain.info/',
  },
  stagenet: {
    expirePoolCacheMillis: 6000,
    midgardBaseUrl: 'https://stagenet-midgard.ninerealms.com/',
  },
  testnet: {
    expirePoolCacheMillis: 6000,
    midgardBaseUrl: 'https://testnet.midgard.thorchain.info/',
  },
}

export class ThorchainAMM {
  private midgardApi: MidgardApi
  private poolCache: PoolCache | undefined
  private network: Network
  private config: ThorchainAMMConfig

  constructor(network: Network) {
    this.network = network
    this.config = defaultThorchainAMMConfig[this.network]
    this.midgardApi = new MidgardApi(new Configuration({ basePath: this.config.midgardBaseUrl }))
    this.refereshPoolCache()
  }

  estimateSwap(params: EstimateSwapParams): SwapEstimate {
    console.log(params)

    //   // ---------- Checks -----------
    //   const isHalted = checkChainStatus(sourceAsset)// only for those chains that are not Thor.
    //       // checkChainStatus should live in chain-utils or something. Within xchain-util
    // // ---------- Remove Fees from inbound before doing the swap -----------
    //   //get inbound Fee from proxyInbound_address then calc the fee as per https://dev.thorchain.org/thorchain-dev/thorchain-and-fees
    //   const inBoundFee = inputAmount.minus(inputFee)
    //   // take the inbound fee away from the inbound amount
    //   const netInput = netInputAmount.minus(inBoundFee)
    //   // remove any affiliateFee. netInput * affiliateFee (%age) of the desitnaiton asset type
    //   const affiliateFeeAmount = netInput.times(affiliateFee)
    //   // remove the affiliate fee from the input.
    //    const netInputAmount = netInputAmount.minus(affiliateFeeAmount)
    //   // now netInputAmount = inputAmount.minus(inboundFee + affiliateFeeAmount)
    //   /// ------- Doing the swap ------------------------
    //   // if source and destination != rune then its a double swap.
    //   const isDoubleSwap = sourceAsset.symbol != "RUNE" && destinationAsset.symbol != "RUNE"
    //    if (!isDoubleSwap) { // if not doulbe swap, e.g a single swap
    //     // Need to work out which pool from the source asset. This could prob go in a util function
    //     // I assume Leena's idea is just to work the pool instead of a UI passing it down
    //       if(sourceAsset != RUNE)
    //        const poolName = new string(sourceAsset.Chain & "." & sourceAsset.ticker) // e.g. BTC.BTC
    //       else
    //       poolName = new string(destinationAsset.Chain & "." & destinationAsset.ticker) // e.g. BTC.BTC
    //       const PoolData1 = midgardApi.getPool(poolName)
    //       const swapOutput = getSingleSwap(netInputAmount, PoolData1)
    //    }
    //    else {
    //       pool1Name = new string(sourceAsset.Chain & "." & sourceAsset.ticker) // e.g. BTC.BTC
    //       pool2Name = new string(destinationAsset.Chain & "." & destinationAsset.ticker) // e.g. BTC.ETH
    //       const PoolData1 = midgardApi.getPool(pool1Name) // first pool data
    //       const PoolData2 = midgardApi.getPool(pool2Name) // second pool data
    //       const swapOutput1 = getSingleSwap(netInputAmount, PoolData1)
    //       const swapOutput2 = getSingleSwap(swapOutput1.output, PoolData1)
    //       // add up swap1 and swap 2 fees / slips
    //    }
    // if (totalSlip > slipLimit){
    //   }else {
    //     throw error "slip is too high at : & totalSlip"
    //   }
    //   /// ---------------- Remove Outbound Fee ---------------------- //////
    //    //get data from proxyInbound_address then calc the fee as per https://dev.thorchain.org/thorchain-dev/thorchain-and-fees
    //    // for BNB and RUNE it is fixed. For the rest it is 3* inbound fee
    //    const outBoundFee = inputAmount.minus(outBoundFee)
    //   const TotalFees = {
    //     inboundFee: inboundFee,
    //     swapFee: swapFee,
    //     outBoundFee: outboundFee,
    //     affiliateFee: affiliateFee
    //   }
    //   const SwapEstimate = {
    //     totalFees: TotalFees,
    //     slipPercentage: slipOnLiquidity,
    //     netOutput: netOutput,
    //     isHalted: isHalted
    //   }
    //   return SwapEstimate
    return {
      totalFees: {
        inboundFee: baseAmount(1),
        swapFee: baseAmount(1),
        outBoundFee: baseAmount(1),
        affiliateFee: baseAmount(1),
      },
      slipPercentage: new BigNumber(0.1),
      netOutput: baseAmount(1),
      isHalted: false,
    }
  }
  async getPoolCache(): Promise<PoolCache | undefined> {
    const millisSinceLastRefeshed = Date.now() - (this.poolCache?.lastRefreshed || 0)
    if (millisSinceLastRefeshed > this.config.expirePoolCacheMillis) {
      await this.refereshPoolCache()
    }
    return this.poolCache
  }

  private async refereshPoolCache(): Promise<void> {
    try {
      const pools = (await this.midgardApi.getPools()).data
      if (pools) {
        const lps = pools.map((pool) => new LiquidityPool(pool))
        this.poolCache = {
          lastRefreshed: Date.now(),
          pools: lps,
        }
        console.log('updated pool cache')
      }
    } catch (error) {
      console.error(error)
    }
  }
}

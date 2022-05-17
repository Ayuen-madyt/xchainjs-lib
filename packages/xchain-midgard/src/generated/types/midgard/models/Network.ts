// tslint:disable
/**
 * Midgard Public API
 * The Midgard Public API queries THORChain and any chains linked via the Bifröst and prepares information about the network to be readily available for public users. The API parses transaction event data from THORChain and stores them in a time-series database to make time-dependent queries easy. Midgard does not hold critical information. To interact with BEPSwap and Asgardex, users should query THORChain directly.
 *
 * The version of the OpenAPI document: 2.6.13
 * Contact: devs@thorchain.org
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import {
    BlockRewards,
    BondMetrics,
} from './';

/**
 * @export
 * @interface Network
 */
export interface Network {
    /**
     * Array of rune amounts (e8) bonded by each active node. 
     * @type {Array<string>}
     * @memberof Network
     */
    activeBonds: Array<string>;
    /**
     * Int64, Number of active nodes
     * @type {string}
     * @memberof Network
     */
    activeNodeCount: string;
    /**
     * @type {BlockRewards}
     * @memberof Network
     */
    blockRewards: BlockRewards;
    /**
     * @type {BondMetrics}
     * @memberof Network
     */
    bondMetrics: BondMetrics;
    /**
     * Float, E.g. 0.01 = 1%. Estimate of the compounded bonding earnings based on the current reserve size, emmission curve, blocks per year and pool share factor = (WeeklyBondIncome/BondAmount + 1)^52 - 1 
     * @type {string}
     * @memberof Network
     */
    bondingAPY: string;
    /**
     * Float, E.g. 0.01 = 1%. Estimate of the compounded  liquidity provider earnings based on the current reserve size, emmission curve, blocks per year and pool share factor = (WeeklyLiquidityIncome/(totalPooledRune*2) + 1)^52 - 1 
     * @type {string}
     * @memberof Network
     */
    liquidityAPY: string;
    /**
     * Int64, height (block number) of the next churn.
     * @type {string}
     * @memberof Network
     */
    nextChurnHeight: string;
    /**
     * Int64, the remaining time of pool activation (in blocks)
     * @type {string}
     * @memberof Network
     */
    poolActivationCountdown: string;
    /**
     * Float [0..1], the ratio which is used to split earnings between liquidity provider and nodes. LPIncome = rewards * poolShareFactor ; BondIncome :=  rewards * (1 - poolShareFactor) 
     * @type {string}
     * @memberof Network
     */
    poolShareFactor: string;
    /**
     * Array of rune amounts (e8) bonded by each standby node. 
     * @type {Array<string>}
     * @memberof Network
     */
    standbyBonds: Array<string>;
    /**
     * Int64, Number of standby nodes, some of them might become active at the next churn. 
     * @type {string}
     * @memberof Network
     */
    standbyNodeCount: string;
    /**
     * Int64(e8), total Rune in all pools. Because asset and Rune value is the same amount in every pool (by definition), the total amount pooled is totalPooledRune*2. 
     * @type {string}
     * @memberof Network
     */
    totalPooledRune: string;
    /**
     * Int64(e8), Current size of the Reserve.
     * @type {string}
     * @memberof Network
     */
    totalReserve: string;
}

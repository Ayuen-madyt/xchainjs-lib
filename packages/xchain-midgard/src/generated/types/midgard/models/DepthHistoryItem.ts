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

/**
 * @export
 * @interface DepthHistoryItem
 */
export interface DepthHistoryItem {
    /**
     * Int64(e8), the amount of Asset in the pool at the end of the interval
     * @type {string}
     * @memberof DepthHistoryItem
     */
    assetDepth: string;
    /**
     * Float, price of asset in rune. I.e. rune amount / asset amount
     * @type {string}
     * @memberof DepthHistoryItem
     */
    assetPrice: string;
    /**
     * Float, the price of asset in USD (based on the deepest USD pool).
     * @type {string}
     * @memberof DepthHistoryItem
     */
    assetPriceUSD: string;
    /**
     * Int64, The end time of bucket in unix timestamp
     * @type {string}
     * @memberof DepthHistoryItem
     */
    endTime: string;
    /**
     * Int64, Liquidity Units in the pool at the end of the interval
     * @type {string}
     * @memberof DepthHistoryItem
     */
    liquidityUnits: string;
    /**
     * Float, The liquidity unit value index. Sqrt(assetDepth * runeDepth)/liquidity units 
     * @type {string}
     * @memberof DepthHistoryItem
     */
    luvi: string;
    /**
     * Int64(e8), the amount of Rune in the pool at the end of the interval
     * @type {string}
     * @memberof DepthHistoryItem
     */
    runeDepth: string;
    /**
     * Int64, The beginning time of bucket in unix timestamp
     * @type {string}
     * @memberof DepthHistoryItem
     */
    startTime: string;
    /**
     * Int64, Synth supply in the pool at the end of the interval
     * @type {string}
     * @memberof DepthHistoryItem
     */
    synthSupply: string;
    /**
     * Int64, Synth Units in the pool at the end of the interval
     * @type {string}
     * @memberof DepthHistoryItem
     */
    synthUnits: string;
    /**
     * Int64, Total Units (synthUnits + liquidityUnits) in the pool at the end of the interval 
     * @type {string}
     * @memberof DepthHistoryItem
     */
    units: string;
}

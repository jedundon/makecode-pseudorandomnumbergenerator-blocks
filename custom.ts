/**
 * Class for creating a pseudorandom number generator.
 * Uses algorithm from: https://stackoverflow.com/a/29450606
 */
//% blockNamespace=Math
class Rando {
    _seed: number;
    _mask: number;
    _m_w: number;
    _m_z: number;

    constructor(seednum: number) {
        this._seed = seednum;
        this._mask = 0xffffffff;
        this._m_w = (123456789 + this._seed) & this._mask;
        this._m_z = (987654321 - this._seed) & this._mask;
    }

    /**
     * Get random number from a Rando
     * @param optional low number mapping, eg: 0
     * @param optional high number mapping, eg: 1
     * @param whether to round the number, eg: false
     */
    //% block="random number from %Rando(randogen) || from %tolow to %tohigh with rounding $roundnum"
    //% tolow.defl=0 tohigh.defl=1 roundnum=false
    //% roundnum.shadow="toggleOnOff"
    //% group="PseudoRandom"
    //% expandableArgumentMode="toggle"
    getNumber(tolow: number = 0, tohigh: number = 1, roundnum: boolean = false) {
        this._m_z = (36969 * (this._m_z & 65535) + (this._m_z >>> 16)) & this._mask;
        this._m_w = (18000 * (this._m_w & 65535) + (this._m_w >>> 16)) & this._mask;

        let result: number = ((this._m_z << 16) + (this._m_w & 65535)) >>> 0;
        result /= 4294967296;

        result = Math.map(result, 0, 1, tolow, tohigh);
        if (roundnum == true) {
            result = Math.round(result);
        }
        return result;
    }
}

/**
 * Add create function to Math namespace
 */
//% groups="['PseudoRandom']"
namespace Math {

    /**
     * Create a pseudorandom number generator and automatically set it to a variable
     */
    //% block="generator using seed %seed"
    //% blockSetVariable=randogen
    //% group="PseudoRandom"
    export function createRando(seed: number): Rando {
        return new Rando(seed);
    }

    /**
     * Pseudo Percent Chance Block
     * @param percent chance number, eg: 100
     * @param pseudo random generator variable, eg: randogen
     */
    //% block="%percent percent chance from %rando generator"
    //% percent.defl=100 rando.defl=randogen
    //% group="PseudoRandom"
    export function pseudoPercentChance(percent: number = 100, rando: Rando): boolean {
        let num: number = rando.getNumber(0, 100, false);
        if (num * 100 <= percent) {
            return true;
        }
        return false;
    }
}
import { FinalScoreKey, finalScoreMin } from "./staticData"

// Algo in 30/05/2024, may change in the future
export function estimateRequireScore(vo: number, da: number, vi: number, requireRank: string, ranking: number): number{
    const scoreRequire = finalScoreMin[requireRank as FinalScoreKey] || finalScoreMin["A+"];

    const resultPt = scoreRequire - rankingScore(ranking) - calculateThreeSum(vo, da, vi, ranking === 1);

    for(let sc = 0; sc < 165000; sc ++){
        const resultAduScore = finalScoreCal(sc);

        if(resultAduScore >= resultPt){
            return sc
        }
    }

    return 0
}

function calculateThreeSum(vo: number, da: number, vi: number, isRankOne: boolean, CURRENT_MAX: number = 1500): number {

    if(isRankOne){
        return Math.floor( 2.3 * ( 
            Math.min(CURRENT_MAX, vo + 30)
            + Math.min(CURRENT_MAX, da + 30)
            + Math.min(CURRENT_MAX, vi + 30)
            )
        )
    }
    else {
        return Math.floor( 2.3 * (vo + da + vi) )
    }
}

function rankingScore(rank: number): number {

    const rankPt: Record<number, number> = {
        1: 1700,
        2: 900,
        3: 500,
        4: 0,
        5: 0,
        6: 0,
    }

    return rankPt[rank] || 0

}

// https://ngabbs.com/read.php?tid=40230899
function finalScoreCal(score: number): number{

    const finalPt = score <= 5000 // (0 <  x ≤ 5000)
        ? 0.3 * score
        : score <= 10000          // (5000 < x ≤ 10000)
        ? 0.15 * score + 750
        : score <= 20000          // (10000 < x ≤ 20000)
        ? 0.08 * score + 1450
        : score <= 30000          // (20000 < x ≤ 30000)
        ? 0.04 * score + 2250
        : score <= 40000          // (30000 < x ≤ 40000)
        ? 0.02 * score + 2850
        : score <= 50000          // (40000 < x ≤ 50000)
        ? 0.01 * score + 3250
        : 0

    return Math.floor(finalPt)
}

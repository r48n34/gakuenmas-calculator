import { finalScoreMin } from "./staticData"

export function estimateRequireScore(vo: number, da: number, vi: number, requireRank: string, ranking: number){
    const aPlusRequire = finalScoreMin[requireRank] || finalScoreMin["A+"];

    const resultPt = aPlusRequire - rankingScore(ranking) - calculateThreeSum(vo, da, vi);

    for(let i = 0; i < 1650000; i ++){
        const resultAduScore = finalScoreCal(i);

        if(resultAduScore >= resultPt){
            return i
        }
    }

    return 0
}

function calculateThreeSum(vo: number, da: number, vi: number){
    return Math.floor( 2.3 * (vo + da + vi) )
}

function rankingScore(rank: number){

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
function finalScoreCal(score: number){

    let finalPt = 0

    if(score <= 5000){ // (0<x≤5000)
        finalPt = 0.3 * score
    }
    else if(score <= 10000){ // (5000 < x ≤ 10000)
        finalPt = 0.15 * score + 750
    } 
    else if(score <= 20000){  // (10000 < x ≤ 20000)
        finalPt = 0.08 * score + 1450
    }
    else if(score <= 30000){ // (20000 < x ≤ 30000)
        finalPt = 0.04 * score + 2250
    }
    else if(score <= 40000){ // (30000 < x ≤ 40000)
        finalPt = 0.02 * score + 2850
    }
    else if(score <= 50000){ // (40000 < x ≤ 50000)
        finalPt = 0.01 * score + 3250
    }

    return Math.floor(finalPt)
}

export const finalScoreMin = {
    "SS" : 16000, // Not Proof, just a estimated value regarding A+, S and S+
    "S+": 14500,
    "S": 13000,
    "A+": 11500,
    "A": 10000,
    "B+": 8000,
    "B": 6000,
}

export type FinalScoreKey = keyof typeof finalScoreMin;
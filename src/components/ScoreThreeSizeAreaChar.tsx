import { AreaChart } from '@mantine/charts';
import { Text } from '@mantine/core';
import { analysisData } from '../data/analysis';

function ScoreThreeSizeAreaChar() {
    return (
        <>
            <Text ta="center" mb={12} fw={300} fz={24} c="dimmed">
                Requirement Score for each rank
            </Text>

            <AreaChart
                h={500}
                data={analysisData}
                dataKey="currentThree"
                withLegend
                series={[
                    { name: 'A', color: 'pink' },
                    { name: 'A+', color: 'green' },
                    { name: 'S', color: 'gold' },
                ]}
                curveType="natural"
                withGradient
            />
        </>
    )
}

export default ScoreThreeSizeAreaChar

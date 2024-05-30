import { Text, Card } from '@mantine/core';

type ShowsRankBoxProps = {
    title: string
    score: number
}

function ShowsRankBox({ title, score }: ShowsRankBoxProps){
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text ta="center" fz={24}>
            { title }
        </Text>
        <Text ta="center" fz={32} fw={600}>
            {score  === 0 ? "Impossible" : '>= ' + score}
        </Text>
        </Card>
    )
}
    
export default ShowsRankBox

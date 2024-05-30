import { Text, Card } from '@mantine/core';

type ShowsRankBoxProps = {
    title: string
    score: number
    textColor?: string
}

function ShowsRankBox({ title, score, textColor = "gold" }: ShowsRankBoxProps){
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text ta="center" fz={34} c={textColor}>
            { title }
        </Text>
        <Text ta="center" fz={36} fw={600}>
            {score  === 0 ? "N/A" : score}
        </Text>
        </Card>
    )
}
    
export default ShowsRankBox

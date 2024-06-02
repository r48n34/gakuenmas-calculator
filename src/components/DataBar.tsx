import { DonutChart } from '@mantine/charts';
import { Card, Group, Text } from '@mantine/core';

type DataBarProps = {
    vo: number
    da: number
    vi: number
}

function DataBar({ vo, da, vi }: DataBarProps) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text ta="center" c="dimmed" fw={300} fz={16}>
                Final status
            </Text>
            <Group justify='center'>
            <DonutChart
                w={300}
                withLabelsLine withLabels
                paddingAngle={10}
                data={[
                    { name: 'vo', value: vo, color: '#e9347f' },
                    { name: 'da', value: da, color: '#1d80e3' },
                    { name: 'vi', value: vi, color: '#ecaa2c' },
                ]}
                chartLabel={vo + da + vi}
            />
            </Group>
        </Card>
    )
}

export default DataBar

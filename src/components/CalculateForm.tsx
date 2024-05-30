import { Button, Grid, Group, NumberInput, Select, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { estimateRequireScore } from '../utils/calculateScore';
import { useState } from 'react';
import ShowsRankBox from './ShowsRankBox';
import { IconCalculator, IconMicrophone, IconShoe, IconWorldCog } from '@tabler/icons-react';

interface FormData {
    vo: number
    da: number
    vi: number
    ranking: string
}

function CalculateForm() {

    const [ threeSum, setThreeSum ] = useState<number>(-1);

    const [scoreToS, setScoreToS] = useState<number>(-1);
    const [scoreToAPlus, setScoreToAPlus] = useState<number>(-1);
    const [scoreToA, setScoreToA] = useState<number>(-1);
    const [scoreToBPlus, setScoreToBPlus] = useState<number>(-1);

    const calForm = useForm<FormData>({
        initialValues: {
            vo: 100,
            da: 100,
            vi: 100,
            ranking: "1"
        },
        validate: {
            vo: (value) => (value >= 1 && value <= 1500 ? null : 'Invalid vo'),
            da: (value) => (value >= 1 && value <= 1500 ? null : 'Invalid da'),
            vi: (value) => (value >= 1 && value <= 1500 ? null : 'Invalid vi'),
            ranking: (value) => (!!value? null : 'Invalid ranking number'),
        },
    });

    function calFinalRequireScore(values: FormData) {
        setScoreToA(estimateRequireScore(values.vo, values.da, values.vi, "A", +values.ranking))
        setScoreToAPlus(estimateRequireScore(values.vo, values.da, values.vi, "A+", +values.ranking))
        setScoreToS(estimateRequireScore(values.vo, values.da, values.vi, "S", +values.ranking))
        setScoreToBPlus(estimateRequireScore(values.vo, values.da, values.vi, "B+", +values.ranking))

        setThreeSum(values.vo + values.da + values.vi)
    }

    return (
        <>
            {scoreToAPlus !== -1 && (
                <>
                
                <Grid grow>
                    <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                        <ShowsRankBox title={"B+"} score={scoreToBPlus} textColor={"gray"}/>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                        <ShowsRankBox title={"A"} score={scoreToA} textColor={"pink"}/>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                        <ShowsRankBox title={"A+"} score={scoreToAPlus} textColor={"pink"}/>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                        <ShowsRankBox title={"S"} score={scoreToS} textColor={"gold"}/>
                    </Grid.Col>
                </Grid>

                <Text ta="left" c="dimmed" mt={2}> 
                    Total Sum: { threeSum } {calForm.values.ranking === "1" ? ` + 90 = ${ threeSum + 90 } (90 is added to final calculations for 1st)` : ""}
                </Text>

                </>
            )}

            <Group justify="center" mt={18}>
                <form onSubmit={calForm.onSubmit((values) => calFinalRequireScore(values))}>

                    <Select
                        label="Final ranking"
                        description="No need to modify in general cases"
                        key={calForm.key('ranking')}
                        data={[
                            { value: '1', label: '1st 🥇' },
                            { value: '2', label: '2nd 🥈' },
                            { value: '3', label: '3rd 🥉' },
                            { value: '4', label: '4th' },
                            { value: '5', label: '5th' },
                            { value: '6', label: '6th' },
                        ]}
                        {...calForm.getInputProps('ranking')}
                    />

                    <NumberInput
                        mt={8}
                        label="Vo (ボーカル)"
                        description="Vocal value"
                        leftSection={<IconMicrophone color="#e9347f"/>}
                        
                        key={calForm.key('vo')}
                        min={1}
                        max={1500}
                        {...calForm.getInputProps('vo')}
                    />

                    <NumberInput
                        mt={8}
                        label="Da (ダンス)"
                        description="Dance value"
                        leftSection={<IconShoe color="#1d80e3"/>}
                        key={calForm.key('da')}
                        min={1}
                        max={1500}
                        {...calForm.getInputProps('da')}
                    />

                    <NumberInput
                        mt={8}
                        label="Vi (ビジュアル)"
                        description="Visual value"
                        leftSection={<IconWorldCog color="#ecaa2c"/>}
                        key={calForm.key('vi')}
                        min={1}
                        max={1500}
                        {...calForm.getInputProps('vi')}
                    />

                    <Group justify="flex-end" mt={24}>
                        <Button fullWidth type="submit" variant='light' leftSection={<IconCalculator size={15}/>}>
                            Calculate
                        </Button>
                    </Group>

                    <Text ta="center" mt={4} fw={300} fz={12} mb={12} c="dimmed">
                        Last update algo: 30/05/2024
                    </Text>
                </form>

            </Group>
        </>
    )
}

export default CalculateForm

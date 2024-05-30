import { Button, Grid, Group, NumberInput, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { estimateRequireScore } from '../utils/calculateScore';
import { useState } from 'react';
import ShowsRankBox from './ShowsRankBox';

interface FormData {
    vo: number
    da: number
    vi: number
    ranking: string
}

function CalculateForm() {

    const [scoreToS, setScoreToS] = useState<number>(-1);
    const [scoreToAPlus, setScoreToAPlus] = useState<number>(-1);
    const [scoreToA, setScoreToA] = useState<number>(-1);
    const [scoreToBPlus, setScoreToBPlus] = useState<number>(-1);

    const calForm = useForm<FormData>({
        initialValues: {
            vo: 0,
            da: 0,
            vi: 0,
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
    }

    return (
        <>
            {scoreToAPlus !== -1 && (
                <Grid grow>
                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                        <ShowsRankBox title={"B+"} score={scoreToBPlus} />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                        <ShowsRankBox title={"A"} score={scoreToA} />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                        <ShowsRankBox title={"A+"} score={scoreToAPlus} />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                        <ShowsRankBox title={"S"} score={scoreToS} />
                    </Grid.Col>
                </Grid>
            )}

            <Group justify="center" mt={18}>
                <form onSubmit={calForm.onSubmit((values) => calFinalRequireScore(values))}>

                    <Select
                        label="Final ranking"
                        description="No need to modify in general cases"
                        key={calForm.key('ranking')}
                        data={[
                            { value: '1', label: '1st' },
                            { value: '2', label: '2nd' },
                            { value: '3', label: '3rd' },
                            { value: '4', label: '4th' },
                            { value: '5', label: '5th' },
                            { value: '6', label: '6th' },
                        ]}
                        {...calForm.getInputProps('ranking')}
                    />

                    <NumberInput
                        mt={8}
                        label="Vo"
                        key={calForm.key('vo')}
                        min={1}
                        max={1500}
                        {...calForm.getInputProps('vo')}
                    />

                    <NumberInput
                        mt={8}
                        label="Da"
                        key={calForm.key('da')}
                        min={1}
                        max={1500}
                        {...calForm.getInputProps('da')}
                    />

                    <NumberInput
                        mt={8}
                        label="Vi"
                        key={calForm.key('vi')}
                        min={1}
                        max={1500}
                        {...calForm.getInputProps('vi')}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button type="submit" variant='light'>
                            Calculate
                        </Button>
                    </Group>
                </form>

            </Group>
        </>
    )
}

export default CalculateForm

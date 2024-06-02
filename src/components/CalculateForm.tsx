import { Button, Grid, Group, NumberInput, Select, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useScrollIntoView } from '@mantine/hooks';
import { estimateRequireScore } from '../utils/calculateScore';
import { useState } from 'react';
import ShowsRankBox from './ShowsRankBox';
import { IconCalculator, IconMicrophone, IconShoe, IconWorldCog, IconZoomReset } from '@tabler/icons-react';
import DataBar from './DataBar';

const CURRENT_MAX = 1500;

interface FormData {
    vo: number
    da: number
    vi: number
    ranking: "1" | "2" | "3" | "4" | "5" | "6"
}

function CalculateForm() {

    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
        offset: 60,
        duration: 400
    });

    const [currentThreeData, setCurrentThreeData] = useState<[number, number, number]>([-1, -1, -1]);

    const [scoreToS, setScoreToS] = useState<number>(-1);
    const [scoreToAPlus, setScoreToAPlus] = useState<number>(-1);
    const [scoreToA, setScoreToA] = useState<number>(-1);
    const [scoreToBPlus, setScoreToBPlus] = useState<number>(-1);

    const calForm = useForm<FormData>({
        initialValues: {
            vo: 1000,
            da: 1000,
            vi: 1000,
            ranking: "1"
        },
        validate: {
            vo: (value) => (value >= 1 && value <= 1500 ? null : 'Invalid vo'),
            da: (value) => (value >= 1 && value <= 1500 ? null : 'Invalid da'),
            vi: (value) => (value >= 1 && value <= 1500 ? null : 'Invalid vi'),
            ranking: (value) => (!!value ? null : 'Invalid ranking number'),
        },
    });

    function calFinalRequireScore(values: FormData) {
        setScoreToA(estimateRequireScore(values.vo, values.da, values.vi, "A", +values.ranking))
        setScoreToAPlus(estimateRequireScore(values.vo, values.da, values.vi, "A+", +values.ranking))
        setScoreToS(estimateRequireScore(values.vo, values.da, values.vi, "S", +values.ranking))
        setScoreToBPlus(estimateRequireScore(values.vo, values.da, values.vi, "B+", +values.ranking))

        setCurrentThreeData([
            Math.min(CURRENT_MAX, values.vo + 30),
            Math.min(CURRENT_MAX, values.da + 30),
            Math.min(CURRENT_MAX, values.vi + 30),
        ])

        scrollIntoView({
            alignment: 'center',
        })
    }

    function addValueToForm(field: "vo" | "da" | "vi", addedVal: number) {
        calForm.setFieldValue(field, Math.min(CURRENT_MAX, calForm.getValues()[field] + addedVal))
    }

    return (
        <>
            {/* <ScoreThreeSizeAreaChar />   */}
            
            {scoreToAPlus !== -1 && (
                <>
                    <Grid grow ref={targetRef}>
                        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 2 }}>
                            <ShowsRankBox title={"B+"} score={scoreToBPlus} textColor={"gray"} />
                        </Grid.Col>

                        <Grid.Col span={{ base: 6, sm: 6, md: 6, lg: 2 }}>
                            <ShowsRankBox title={"A"} score={scoreToA} textColor={"pink"} />
                        </Grid.Col>

                        <Grid.Col span={{ base: 6, sm: 6, md: 6, lg: 2 }}>
                            <ShowsRankBox title={"A+"} score={scoreToAPlus} textColor={"pink"} />
                        </Grid.Col>

                        <Grid.Col span={{ base: 6, sm: 6, md: 6, lg: 2 }}>
                            <ShowsRankBox title={"S"} score={scoreToS} textColor={"gold"} />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 2 }}>
                            <DataBar vo={currentThreeData[0]} da={currentThreeData[1]} vi={currentThreeData[2]} />
                        </Grid.Col>
                    </Grid>

                    <Text ta="left" c="dimmed" mt={6} fw={300} fz={14}>
                        Total Sum: {currentThreeData.reduce((a, b) => a + b, 0)} {calForm.values.ranking === "1" ? ` added 1st Bonus` : ""}
                    </Text>

                    {calForm.values.ranking === "1" && (
                        <Text ta="left" c="dimmed" mt={2} fw={300} fz={14}>
                            (90 bonus is added to final calculations for 1st) (Stats that larger than 1500 will not be adding 30)
                        </Text>
                    )}
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

                    <Group mt="md" justify="center">

                        <NumberInput
                            mt={8}
                            label="Vo (ボーカル)"
                            description="Vocal value"
                            leftSection={<IconMicrophone color="#e9347f" />}
                            allowNegative={false}
                            allowDecimal={false}
                            key={calForm.key('vo')}
                            min={1}
                            max={1500}
                            stepHoldDelay={500}
                            stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                            {...calForm.getInputProps('vo')}
                        />

                        <Button onClick={() => addValueToForm("vo", 100)} variant="default" mt={52}>
                            +100
                        </Button>

                    </Group>

                    <Group mt="md" justify="center">
                        <NumberInput
                            mt={8}
                            label="Da (ダンス)"
                            description="Dance value"
                            leftSection={<IconShoe color="#1d80e3" />}
                            allowNegative={false}
                            allowDecimal={false}
                            key={calForm.key('da')}
                            min={1}
                            max={1500}
                            stepHoldDelay={500}
                            stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                            {...calForm.getInputProps('da')}
                        />
                        <Button onClick={() => addValueToForm('da', 100)} variant="default" mt={52}>
                            +100
                        </Button>
                    </Group>

                    <Group mt="md" justify="center">
                        <NumberInput
                            mt={8}
                            label="Vi (ビジュアル)"
                            description="Visual value"
                            leftSection={<IconWorldCog color="#ecaa2c" />}
                            allowNegative={false}
                            allowDecimal={false}
                            key={calForm.key('vi')}
                            min={1}
                            max={1500}
                            stepHoldDelay={500}
                            stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                            {...calForm.getInputProps('vi')}
                        />
                        <Button onClick={() => addValueToForm('vi', 100)} variant="default" mt={52}>
                            +100
                        </Button>
                    </Group>

                    <Group justify="center" mt={24}>
                        <Button variant='light' leftSection={<IconZoomReset size={15} />} onClick={calForm.reset} color="green">
                            Reset
                        </Button>
                        <Button type="submit" variant='light' leftSection={<IconCalculator size={15} />}>
                            Calculate score
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

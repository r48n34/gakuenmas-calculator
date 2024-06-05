import { Button, Group, NumberInput, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { estimateInverseScore } from '../utils/calculateScore';
import { useState } from 'react';
import { IconCalculator, IconMicrophone, IconScoreboard, IconShoe, IconWorldCog, IconZoomReset } from '@tabler/icons-react';

interface CalculateInvFormProps {
    CURRENT_MAX?: number
}

interface FormData {
    vo: number
    da: number
    vi: number
    pt: number
}

function CalculateInvForm({ CURRENT_MAX = 1500 }: CalculateInvFormProps) {

    const [finalScore, setFinalScore] = useState<number>(-1);

    const calForm = useForm<FormData>({
        initialValues: {
            vo: 1000,
            da: 1000,
            vi: 1000,
            pt: 10000
        },
        validate: {
            vo: (value) => (value >= 1 && value <= 1500 ? null : 'Invalid vo'),
            da: (value) => (value >= 1 && value <= 1500 ? null : 'Invalid da'),
            vi: (value) => (value >= 1 && value <= 1500 ? null : 'Invalid vi'),
            pt: (value) => (value >= 1 ? null : 'Invalid ranking number'),
        },
    });

    function calFinalRequireScore(values: FormData) {
        setFinalScore(
            estimateInverseScore(values.vo, values.da, values.vi, 1, values.pt)
        )
    }

    function addValueToForm(field: "vo" | "da" | "vi" | "pt", addedVal: number) {
        calForm.setFieldValue(
            field,
            Math.min(CURRENT_MAX, calForm.getValues()[field] + addedVal)
        )
    }

    return (
        <>
            {finalScore !== -1 && (
                <>
                    <Text ta="center" mt={6} fw={300} fz={48}>
                        Exam pt: {finalScore}
                    </Text>

                    {finalScore === 0 && (
                        <Text ta="center" c="dimmed" fw={300} fz={18}>
                            Invalid pt or data
                        </Text>
                    )}
                </>
            )}

            <Group justify="center" mt={18}>
                <form onSubmit={calForm.onSubmit((values) => calFinalRequireScore(values))}>

                    <Group mt="md" justify="left">
                        <NumberInput
                            mt={8}
                            label="Final pt"
                            description="Point at final result"
                            leftSection={<IconScoreboard />}
                            allowNegative={false}
                            allowDecimal={false}
                            key={calForm.key('pt')}
                            min={1}
                            max={999999}
                            stepHoldDelay={500}
                            stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
                            {...calForm.getInputProps('pt')}
                        />
                    </Group>

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

export default CalculateInvForm

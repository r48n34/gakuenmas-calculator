import { useDisclosure } from '@mantine/hooks';
import { Modal, Tooltip, ActionIcon } from '@mantine/core';
import { IconChartArcs } from '@tabler/icons-react';
import ScoreThreeSizeAreaChar from './ScoreThreeSizeAreaChar';

function AnalysisScore() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} title="" size="90%">
                <ScoreThreeSizeAreaChar/> 
            </Modal>

            <Tooltip label={"Analysis"}>
            <ActionIcon
                variant="light"
                onClick={open}
            >
                <IconChartArcs/>
            </ActionIcon>
        </Tooltip>
        </>
    );
}

export default AnalysisScore

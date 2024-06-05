import { useDisclosure } from '@mantine/hooks';
import { Modal, Tooltip, ActionIcon, Text } from '@mantine/core';
import { IconCalculator } from '@tabler/icons-react';
import CalculateInvForm from './CalculateInvForm';

function CalInvScoreModal() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} title="Inverse calculate final exam pt" size="90%">
                <CalculateInvForm/> 
                <Text ta="center" mt={-5} fw={300} fz={16} mb={12} c="dimmed">
                    The following score are a estimated score, and may not reflected to actual values. 
                </Text>
            </Modal>

            <Tooltip label={"Inv Score cal"}>
            <ActionIcon
                variant="light"
                onClick={open}
            >
                <IconCalculator size={18}/>
            </ActionIcon>
        </Tooltip>
        </>
    );
}

export default CalInvScoreModal

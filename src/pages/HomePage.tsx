import { Container, Text, Group } from "@mantine/core";
import CalculateForm from "../components/CalculateForm";
import { IconBrandGithubFilled } from '@tabler/icons-react';
import GoUrlBtn from "../components/GoUrlBtn";
import ColorToggleBtn from "../components/ColorToggleBtn";

function HomePage(){
    return (
        <>
        <Group justify="flex-end" mr={16}>
            <ColorToggleBtn />
            <GoUrlBtn
                title="Github"
                url={"https://github.com/r48n34/gakuenmas-calculator"}
                icon={<IconBrandGithubFilled size={14} />}
            />   
        </Group>

        <Container>
            <Text ta="center" fw={300} fz={52}>
                I@MA Calculator
            </Text>

            <Text ta="center" mt={-5} fw={300} fz={16} mb={12} c="dimmed">
                Calculator the extimated final Rank
            </Text>

            <Text ta="center" mt={-5} fw={300} fz={16} mb={12} c="dimmed">
                The following score are a estimated score, and may not reflected to actual values.
            </Text>
       
            <CalculateForm />
        </Container>
        </>
    )
}
    
export default HomePage

import { Container, Text, Group } from "@mantine/core";
import CalculateForm from "../components/CalculateForm";
import { IconBrandGithubFilled, IconScoreboard } from '@tabler/icons-react';
import GoUrlBtn from "../components/GoUrlBtn";
import ColorToggleBtn from "../components/ColorToggleBtn";
import AnalysisScore from "../components/AnalysisScore";

function HomePage(){
    return (
        <>
        <Group justify="flex-end" mr={16}>
            <AnalysisScore />
            <ColorToggleBtn />
            <GoUrlBtn
                title="Github"
                url={"https://github.com/r48n34/gakuenmas-calculator"}
                icon={<IconBrandGithubFilled size={14} />}
            />   
        </Group>

        <Container>
            <Text ta="center" fw={300} fz={46}>
               <IconScoreboard size={32}/> 学園アイドルマスター Calculator
            </Text>

            <Text ta="center" mt={-5} fw={300} fz={16} mb={12} c="dimmed">
                Calculator the estimated final exam score (Before exam)
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

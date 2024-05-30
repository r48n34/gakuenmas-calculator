import { Container, Text } from "@mantine/core";
import CalculateForm from "../components/CalculateForm";

function HomePage(){
    return (
        <Container>
            <Text ta="center" mt={12} fw={300} fz={52}>
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
    )
}
    
export default HomePage

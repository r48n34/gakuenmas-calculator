import { Switch, Group, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

export default function ColorToggleBtn() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const theme = useMantineTheme();

    return (
        <Group justify="center" my={25} ml={4}>
            <Switch
                checked={colorScheme === 'dark'}
                onChange={() => toggleColorScheme()}
                size="sm"
                onLabel={<IconSun color={theme.white} size="1.25rem" stroke={1.5} />}
                offLabel={<IconMoonStars color={theme.colors.gray[6]} size="1.25rem" stroke={1.5} />}
            />
        </Group>
    );
}
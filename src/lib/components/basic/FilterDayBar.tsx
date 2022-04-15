import { ButtonGroup, Button, Box } from "@chakra-ui/react";
import React from "react";

export function FilterDayBarBox({
    filters,
    onClick,
    onResetClick,
    selecteRange
}: {
    filters: { day: number; name: string; }[];
    onClick: (day: number) => void;
    onResetClick: VoidFunction;
    selecteRange: number | string;
}) {
    return (
        <Box height={"44px"}>
            <ButtonGroup size={"sm"} variant="outline" spacing={2}>
                {filters.map(({ day, name }) => (
                    <Button variant={selecteRange === day ? 'solid' : 'outline'} key={day} onClick={() => onClick(day)}>
                        {name}
                    </Button>
                ))}
                <Button variant={selecteRange === 'all' ? 'solid' : 'outline'} onClick={onResetClick}>All</Button>
            </ButtonGroup>
        </Box>
    );
}

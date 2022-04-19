import { ButtonGroup, Button, Box, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger, useDisclosure, FormControl, FormLabel, useColorModeValue } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import FocusLock from "react-focus-lock"
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export function FilterDayBarBox({
    filters,
    onSelectLastNthDay,
    onSelectRangeDay,
    onResetClick,
    minDate,
    maxDate,
    selecteRange
}: {
    filters: { day: number; name: string; }[];
    onSelectLastNthDay: (day: number) => void;
    onSelectRangeDay: (start: Date, end: Date) => void;
    onResetClick: VoidFunction;
    minDate: Date,
    maxDate: Date,
    selecteRange: number | string;
}) {

    return (
        <Box height={"36px"}>
            <ButtonGroup size={"xs"} variant="outline" spacing={1}>
                {filters.map(({ day, name }) => (
                    <Button variant={selecteRange === day ? 'solid' : 'outline'} key={day} onClick={() => onSelectLastNthDay(day)}>
                        {name}
                    </Button>
                ))}
                <Button variant={selecteRange === 'all' ? 'solid' : 'outline'} onClick={onResetClick}>All</Button>
            </ButtonGroup>
            <PopoverForm selecteRange={selecteRange} maxDate={maxDate} minDate={minDate} onSave={onSelectRangeDay} />
        </Box>
    );
}





const PopoverForm = ({ maxDate, minDate, onSave, selecteRange }: { selecteRange: any, minDate: Date, maxDate: Date, onSave: (start: Date, end: Date) => void }) => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const firstFieldRef = useRef(null)
    const [dateRange, setDateRange] = useState<[Date, Date]>([minDate, maxDate]);
    const [formIsDirty, setFormIsDirty] = useState(false)
    const inputcls = useColorModeValue("dp-light", "dp-dark");
    const [startDate, endDate] = dateRange;
    const closePopover = () => {
        setFormIsDirty(false)
        onClose()
    }
    const selectRangeDate = (data: [Date, Date]) => {
        setDateRange(data)
        setFormIsDirty(true)
    }

    const handlePopOverSave = () => {
        onSave(dateRange[0], dateRange[1])
        closePopover()
    }

    return (
        <>
            <Popover
                placement='top-start'
                isOpen={isOpen}
                initialFocusRef={firstFieldRef}
                onOpen={onOpen}
                onClose={onClose}
                closeOnBlur={false}
            >
                <PopoverTrigger>
                    <Button variant={selecteRange === 'custom' ? 'solid' : 'outline'} ms={'1'} size={'xs'} onClick={() => { }}>Custom</Button>
                </PopoverTrigger>
                <PopoverContent p={5}>
                    <FocusLock returnFocus persistentFocus={false}>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <FormControl>
                            <FormLabel htmlFor={"test"}>
                                Custom Duration
                            </FormLabel>
                            <Box mb={'4'}>
                                <DatePicker
                                    id="test"

                                    className={`date-picker ${inputcls}`}
                                    selectsRange={true}
                                    startDate={startDate}
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    endDate={endDate}
                                    onChange={(update: any) => {
                                        selectRangeDate(update)
                                    }}
                                />
                            </Box>
                        </FormControl>
                        <ButtonGroup gap={'0.5'}>
                            <Button variant='outline' onClick={closePopover}>
                                Cancel
                            </Button>
                            <Button onClick={handlePopOverSave} colorScheme='linkedin'>
                                Save
                            </Button>
                        </ButtonGroup>
                    </FocusLock>
                </PopoverContent>
            </Popover>
        </>
    )
}

function addDays(date: Date, days: number): Date {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
import { MenuItemOption, MenuOptionGroup } from "@chakra-ui/react";

export function YAxixOption({ setYAxisDatakey, yAxisData, yAxixDataOptions }: { setYAxisDatakey: (value: string) => void, yAxisData: string, yAxixDataOptions: { name: string; value: string; }[] }) {
    return <MenuOptionGroup onChange={(value) => { setYAxisDatakey(value as string); }} defaultValue={yAxisData} title='Show Balance According' type='radio'>
        {yAxixDataOptions.map(({ name, value }) => <MenuItemOption value={value}>{name}</MenuItemOption>)}
    </MenuOptionGroup>;
}
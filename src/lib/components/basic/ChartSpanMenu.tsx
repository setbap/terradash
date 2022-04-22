import { MenuOptionGroup, MenuItemOption } from '@chakra-ui/react'

export default function ChartSpanMenu({ baseSpan, onChange }: { baseSpan: number, onChange: (span: string | string[]) => void }) {
    return (
        <MenuOptionGroup onChange={onChange} defaultValue={baseSpan + ''} title='Chart Width' type='radio'>
            <MenuItemOption value={'1'}>1 {baseSpan === 1 && '(default)'}</MenuItemOption>
            <MenuItemOption value={'2'}>2 {baseSpan === 2 && '(default)'}</MenuItemOption>
            <MenuItemOption value={'3'}>3 {baseSpan === 3 && '(default)'}</MenuItemOption>
        </MenuOptionGroup>
    )
}

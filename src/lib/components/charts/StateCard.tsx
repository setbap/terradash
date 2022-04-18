import {
	Stat,
	StatLabel,
	StatNumber,
	useColorModeValue,
} from "@chakra-ui/react";
import millify from 'millify'
import { useEffect, useState } from "react";

interface StatsCardProps {
	title: string;
	stat: number;
	status?: 'inc' | 'dec' | 'unchanged';
}
export const StatsCard = (props: StatsCardProps) => {
	const bgCard = useColorModeValue('white', '#191919');
	const { title, stat, status = 'unchanged' } = props;
	const defaultColor = useColorModeValue("gray.600", "gray.400")
	const incColor = useColorModeValue("green.800", "green.300")
	const decColor = useColorModeValue("red.800", "red.500")
	const [statusColor, setStatusColor] = useState<any>();
	useEffect(() => {
		if (status === 'inc' && statusColor !== incColor) {
			setStatusColor(incColor)
		}
		if (status === 'dec' && statusColor !== decColor) {
			setStatusColor(decColor)
		}

		if (status === 'unchanged' && statusColor !== defaultColor) {
			setStatusColor(defaultColor)
		}
	}, [])

	return (
		<Stat
			px={{ base: 4, md: 8 }}
			py="5"
			shadow="base"
			transition={'box-shadow 0.4s'}
			_hover={{ boxShadow: 'var(--chakra-shadows-xl)' }}
			backgroundColor={bgCard}
			border="1px solid"
			borderColor={statusColor}
			rounded="lg"
		>
			<StatLabel fontWeight="medium" isTruncated>
				{title}
			</StatLabel>
			<StatNumber color={statusColor} fontSize="2xl" fontWeight="medium">
				{millify(stat, {
					precision: 3,
					decimalSeparator: "."
				})}
			</StatNumber>
		</Stat>
	);
}



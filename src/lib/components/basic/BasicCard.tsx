import {
	Stat,
	StatLabel,
	StatNumber,
	useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface StatsCardProps {
	title: string;
	stat: number;
	status?: 'inc' | 'dec' | 'unchanged';
}
export const StatsCard = (props: StatsCardProps) => {
	const { title, stat, status = 'unchanged' } = props;
	const defaultColor = useColorModeValue("gray.800", "gray.500")
	const incColor = useColorModeValue("green.800", "green.500")
	const decColor = useColorModeValue("red.800", "red.500")
	const [statusColor, setStatusColor] = useState(defaultColor)
	useEffect(() => {
		if (status === 'inc') {
			setStatusColor(incColor)
			return
		}
		if (status === 'dec') {
			setStatusColor(decColor)
			return
		}
		setStatusColor(defaultColor)
		return () => { }
	}, [status])

	return (
		<Stat
			px={{ base: 4, md: 8 }}
			py="5"
			shadow="xl"
			border="1px solid"
			borderColor={statusColor}
			rounded="lg"
		>
			<StatLabel fontWeight="medium" isTruncated>
				{title}
			</StatLabel>
			<StatNumber color={statusColor} fontSize="2xl" fontWeight="medium">
				{stat}
			</StatNumber>
		</Stat>
	);
}



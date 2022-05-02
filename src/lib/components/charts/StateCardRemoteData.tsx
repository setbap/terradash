import {
	Box,
	IconButton,
	Link,
	Progress,
	Skeleton,
	Stat,
	StatLabel,
	StatNumber,
	Tooltip,
	useColorModeValue,
} from "@chakra-ui/react";
import millify from "millify";
import { useQuery } from 'react-query'
import { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import Renderer from "chakra-ui-markdown-renderer";

interface StateCardRemoteDataProps {
	title: string;
	getStat: (data: any) => number;
	url: string;
	status?: "inc" | "dec" | "unchanged" | "custom";
	link?: string;
	comment?: string;
	unit?: string
	forceDecimal?: boolean
	customColor?: string
}
export const StateCardRemoteData = (props: StateCardRemoteDataProps) => {
	const bgCard = useColorModeValue("white", "#191919");
	const { title, status = "unchanged", forceDecimal = false, customColor = "#ec5f7e" } = props;
	const defaultColor = useColorModeValue("gray.600", "gray.400");
	const incColor = useColorModeValue("green.800", "green.300");
	const decColor = useColorModeValue("red.800", "red.500");
	const [statusColor, setStatusColor] = useState<any>();
	const fetchPrice = async () => {
		const res = await fetch(props.url)
		const data = await res.json()
		return props.getStat(data)
	}

	const { isLoading, error, data, isFetching } = useQuery([title], fetchPrice, {
		retry: 10,
	})




	useEffect(() => {
		if (status === "inc" && statusColor !== incColor) {
			setStatusColor(incColor);
		}
		if (status === "dec" && statusColor !== decColor) {
			setStatusColor(decColor);
		}
		if (status === "unchanged" && statusColor !== defaultColor) {
			setStatusColor(defaultColor);
		}
		if (status === "custom" && statusColor !== defaultColor) {
			setStatusColor(customColor);
		}

	}, []);

	const calculateNum = (num: number) => {
		if (!forceDecimal) {
			return millify(num, {
				precision: 2,
				decimalSeparator: ".",
			})
		}
		const word = millify(num, {
			precision: 2,
			decimalSeparator: ".",
		})
		const splited = word.split(".");
		if (splited.length === 1) {
			const numValue = word.match(/\d+/g);
			const text = word.match(/[a-zA-Z]+/g) ?? " ";
			return `${numValue![0]}.00${text![0]}`;
		} else {
			const firstNum = splited[0];
			const secondNum = splited[1].match(/\d+/g);
			const text = splited[1].match(/[a-zA-Z]+/g) ?? " ";
			return `${firstNum}.${secondNum![0].padEnd(2, "0")}${text[0]}`;
		}
	}

	const tooltip = props.comment && (
		<Tooltip
			rounded={"lg"}
			px="2"
			pt={"2"}
			bg="#100e"
			boxShadow={"xl"}
			color={"white"}
			aria-label='a tooltip that add extra information like attribution for api'
			hasArrow
			label={
				<ReactMarkdown components={Renderer()}>{props.comment}</ReactMarkdown>
			}
		>
			<IconButton
				size={"xs"}
				variant="link"
				_focus={{ outline: 'none' }}
				pt={"-1"}
				px={"3"}
				icon={<AiOutlineInfoCircle />}
				aria-label={""}
			/>
		</Tooltip>
	);

	return (
		<Stat
			px={{ base: 4, md: 8 }}
			zIndex={0}
			pt="5"
			pb={"4"}
			shadow="base"
			transition={"box-shadow 0.4s"}
			_hover={{ boxShadow: "var(--chakra-shadows-xl)" }}
			backgroundColor={bgCard}
			border="1px solid"
			borderColor={statusColor}
			rounded="lg"
		>
			<Progress pointerEvents={'none'} pos={'absolute'} right={0} left={0} bottom={0} height={'100%'} opacity={isFetching ? 0.2 : 0} colorScheme='green' isIndeterminate={isFetching} />
			{props.link === undefined ? (
				<StatLabel fontWeight="medium" isTruncated display={"inline-flex"}>
					{title} {tooltip}
				</StatLabel>
			) : (
				<Link href={props.link} isExternal>
					<StatLabel fontWeight="medium" display={"inline-flex"} isTruncated>
						{title}{" "}
						<Box px={"1"}>
							<FiExternalLink />
						</Box>
						{tooltip}
					</StatLabel>
				</Link>
			)}

			<StatNumber
				pt={"1"}
				color={statusColor}
				fontSize="4xl"
				fontWeight="extrabold"
			>
				<Skeleton isLoaded={!isLoading} colorScheme={'orange'} height={['32px', '40px']} minWidth={'240px'} display={'inline-flex'}>
					{data && calculateNum(data!)}
					{error && <Box fontSize={["lg", "sm", "lg"]} isTruncated noOfLines={1} color={'red.400'}>{'Error in Fetching Data'}</Box>}
					<Box fontSize={'2xl'} fontWeight={'bold'}>	{props.unit ?? ''}</Box>
				</Skeleton>
			</StatNumber >
		</Stat >
	);
};

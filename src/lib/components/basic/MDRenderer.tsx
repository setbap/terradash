import { Box, Link, chakra } from '@chakra-ui/react'
import React from 'react'
import { FiExternalLink } from 'react-icons/fi'
import ReactMarkdown from 'react-markdown'
import Renderer from "chakra-ui-markdown-renderer";

export default function MDRenderer({ children }: any) {
    return (
        <ReactMarkdown components={Renderer({
            a: CustomMarkDownLink,
            p: (props) => <chakra.p fontWeight={'light'} lineHeight={'8'} >{props.children}</chakra.p>,
        })}>
            {children}
        </ReactMarkdown>
    )
}

const CustomMarkDownLink = (props: any) => {
    return (
        <Link href={props.href} isExternal target="_blank" rel="noopener noreferrer" display={'inline-flex'}>
            {props.children} <Box ps={'1'}><FiExternalLink /></Box>
        </Link>
    )
}
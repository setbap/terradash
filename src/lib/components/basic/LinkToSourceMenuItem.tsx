import { Link, MenuItem } from '@chakra-ui/react'
import React from 'react'
import { FiExternalLink } from 'react-icons/fi'

function LinkToSourceMenuItem({ queryLink }: { queryLink: string }) {
    return (
        <MenuItem icon={<FiExternalLink />} as={Link} href={queryLink} isExternal >
            Open Query Detail
        </MenuItem>
    )
}

export default LinkToSourceMenuItem
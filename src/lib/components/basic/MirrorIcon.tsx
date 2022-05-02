import * as React from "react"
import { IconType } from "react-icons"

const MirrorIcon: IconType = (props: any) => (
    <svg
        width={26}
        height={26}
        fill="white"
        fontSize={'1.5rem'}
        markerStart='-3px'
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...props}
    >
        <path d="M25 4.167l5.834 1.389v6.69l5.833 1.391v21.596l-5.833-1.391v6.691L25 39.143v6.69l-5.832-1.39v-6.691l-5.835-1.39V14.767l5.835 1.39V9.467L25 10.857v-6.69zm-7 16.17v12.679l8.167 1.944V22.283L18 20.337z"></path>
    </svg>
)

export default MirrorIcon

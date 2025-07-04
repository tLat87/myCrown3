import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        className="ionicon"
        viewBox="0 0 512 512"
        {...props}
    >
        <Path
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth={32}
            d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z"
        />
    </Svg>
)
export default SvgComponent

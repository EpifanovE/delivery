import * as React from "react";
import {FC} from "react";
import {IconProps} from "../../types/general";

const ArrowUpIcon: FC<IconProps> = (props) => {

    const {className} = props;

    return (
        <svg className={`${className ? ' ' + className : ''}`} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
            <path d="M205.7 117.7C204.171 119.179 202.127 120.005 200 120.005C197.873 120.005 195.829 119.179 194.3 117.7L136 59.3V216C136 218.122 135.157 220.157 133.657 221.657C132.157 223.157 130.122 224 128 224C125.878 224 123.843 223.157 122.343 221.657C120.843 220.157 120 218.122 120 216V59.3L61.6999 117.7C60.1456 118.976 58.1723 119.628 56.1638 119.529C54.1554 119.43 52.2555 118.588 50.8336 117.166C49.4117 115.744 48.5696 113.844 48.4709 111.836C48.3723 109.828 49.0242 107.854 50.2999 106.3L122.3 34.3C123.817 32.7977 125.865 31.955 128 31.955C130.135 31.955 132.183 32.7977 133.7 34.3L205.7 106.3C207.202 107.817 208.045 109.865 208.045 112C208.045 114.135 207.202 116.183 205.7 117.7Z" />
        </svg>
    )
}

export default ArrowUpIcon;

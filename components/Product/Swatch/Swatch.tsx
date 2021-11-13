
import {FC} from "react";
import styles from "./Swatch.module.css";
import {Check} from "@components/icons";
import cn from "classnames";

interface Props {
    color?: string
    label?: string
    variant: "size" | "color" | string
    onClick: () => void
    active?: boolean
}



const Swatch: FC<Props> = ({color,label,variant,active,...rest}) => {

    label = label?.toLowerCase();
    variant = variant?.toLowerCase();

    const rootClassName = cn(styles.root, {
        [styles.active]: active,
        [styles.color]: color,
        [styles.size]: variant === "size"
    })


    return(
        <button style={color ? {backgroundColor: color} : {}} className={rootClassName} {...rest}>
            {
                /* <span>
                    <Check/>
                </span> */
            }
            {variant === "size" ? label : null}
        </button>
    )
}

export default Swatch;
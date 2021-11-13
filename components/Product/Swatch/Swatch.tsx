
import {FC} from "react";
import styles from "./Swatch.module.css";
import {Check} from "@components/icons";
import cn from "classnames";
import {isDark} from "@lib/color";

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
        [styles.size]: variant === "size",
        [styles.dark]: color && isDark(color)
    })


    return(
        <button style={color ? {backgroundColor: color} : {}} className={rootClassName} {...rest}>
            {
                variant === "color" && active && (
                    <span>
                        <Check/>
                    </span>
                )
            }
            {variant === "size" ? label : null}
        </button>
    )
}

export default Swatch;
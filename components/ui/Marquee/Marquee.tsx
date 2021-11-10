import {ReactNode,FC} from "react";
import styles from "./Marquee.module.css"
import Ticker from "react-ticker"


interface Props {
    children: ReactNode[]
}

const Marquee: FC<Props> = ({children}) => {
    return (
        <div className={styles.root}>
            <Ticker offset={180}>
                {
                    () =>
                        <div className={styles.container}>
                            {children}
                        </div>
                }
            </Ticker>

        </div>
    )
}

export default Marquee;
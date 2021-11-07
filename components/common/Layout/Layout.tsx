
import {FC} from "react";
import styles from "./Layout.module.css";

const Layout: FC = ({children}) => {
    return(
        <>
            <main className={styles.root}>
                {children}
            </main>
        </>
    )
}

export default Layout;
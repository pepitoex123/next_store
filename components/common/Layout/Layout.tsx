
import {FC} from "react";
import styles from "./Layout.module.css";
import {Footer} from "@components/common";

const Layout: FC = ({children}) => {
    return(
        <div className={styles.root}>
            <main className="fit">
                {children}
            </main>
            <Footer/>
        </div>
    )
}

export default Layout;
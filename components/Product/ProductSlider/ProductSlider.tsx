import {FC} from "react";
import styles from "./ProductSlider.module.css";


const ProductSlider: FC = ({children}) => {
    return(
        <div className={styles.root}>
            <div className="h-full transition-opacity">
                {children}
            </div>
        </div>
    )
}

export default ProductSlider
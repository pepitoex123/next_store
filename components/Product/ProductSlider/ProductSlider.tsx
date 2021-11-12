import React,{FC, Children, isValidElement} from "react";
import styles from "./ProductSlider.module.css";


const ProductSlider: FC = ({children}) => {
    return(
        <div className={styles.root}>
            <div className="keen-slider h-full transition-opacity">
                {
                    Children.map(children, (child) => {
                        if(isValidElement(child)){

                            return {
                                ...child,
                                props: {
                                    ...child.props,
                                    className: "keen-slider__slide"
                                }
                            }


                            // return React.cloneElement(child, {className: "keen-slider__slide"})
                        }

                        return child
                    }
                    )
                }
            </div>
        </div>
    )
}

export default ProductSlider
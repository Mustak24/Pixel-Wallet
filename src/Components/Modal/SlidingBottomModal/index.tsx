import { Modal, ModalProps, View } from "react-native";
import AnimateButton from "../../Buttons/AnimateButton";
import SlidingContainer from "./SlidingContainer";
import { Dispatch, ReactNode, SetStateAction } from "react";
import useCountCallback from "../../../Hooks/useCountCallback";
import ShowWhen from "../../Other/ShowWhen";
import AlertCard from "../../Alert/AlertCard";

export type SlidingBottomModalProps = ModalProps & {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>> | ((val: boolean) => void),
    doubleBackExit?: boolean,
    closeOnBack?: boolean,
    children: ReactNode,
    header?: ReactNode,
    footer?: ReactNode,
    alertId?: string,
    onClose?: () => void
}


export default function SlidingBottomModal({children, visible, setVisible, doubleBackExit = false, closeOnBack = true, header, footer, alertId, onClose, ...props}: SlidingBottomModalProps): React.JSX.Element {

    function handleClose() {
        setVisible(false);
        onClose?.();
    }

    const handleCloseRequest = closeOnBack ? useCountCallback({
        callback: handleClose,
        renderText: (count) => `Press back ${count} more time to exit`,
        count: doubleBackExit ? 2 : 1,
        delay: 2000
    }) : () => {};

    return (
        <Modal {...props}
            visible={visible} 
            onRequestClose={handleCloseRequest}
            animationType="fade"
            backdropColor={'rgba(0, 0, 0, 0.5)'}
        >
            <ShowWhen when={!!alertId} >
                <AlertCard id={alertId} />
            </ShowWhen>
            
            <View style={{height: '100%', width: '100%', justifyContent: 'flex-end'}} >
                <AnimateButton 
                    duration={500} 
                    bubbleScale={100} 
                    style={{flex: 1, width: '100%'}} 
                    onPress={handleClose} 
                />

                <SlidingContainer 
                    header={header}
                    footer={footer}
                    visible={visible} 
                    handleClose={handleClose}
                >

                    {children}
                </SlidingContainer>
            </View>
        </Modal>
    );
}
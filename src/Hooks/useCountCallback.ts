import { useRef } from "react";
import { ToastAndroid } from "react-native";

type UseCountCallbackProps = {
    callback: () => void,
    renderText?: (count: number) => string,
    count?: number,
    delay?: number
}

export default function useCountCallback({callback, renderText, count: _count=1, delay: _delay=2000}: UseCountCallbackProps): () => void {
    
    const count = useRef<number>(_count);
    const timeout = useRef<NodeJS.Timeout>(undefined);

    function handleCallback() {
        count.current--;

        if(count.current <= 0) {
            count.current = _count;
            clearTimeout(timeout.current);
            return callback();
        }

        if(renderText) {
            ToastAndroid.show(renderText(count.current), _delay);
        }

        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            count.current = _count;
        }, _delay);
    }

    return handleCallback;
}
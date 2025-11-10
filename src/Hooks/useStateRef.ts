import { RefObject, useRef, useState } from "react";

export default function useStateRef<Type>(val: Type): [Type, (val: Type) => void, RefObject<Type>] {
    const [state, setState] = useState<Type>(val);
    const ref = useRef<Type>(val);

    function updateState(val: Type) {
        setState(val);
        ref.current = val;
    }

    return [state, updateState, ref];
}
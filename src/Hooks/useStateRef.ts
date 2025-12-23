import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react";


type Callback<T> = ((val: T) => T) | T;

export default function useStateRef<Type>(val: Type): [Type, (cb: Callback<Type>) => void, RefObject<Type>] {
    const [state, setState] = useState<Type>(val);
    const ref = useRef<Type>(val);

    function updateState(cb: Callback<Type>) {
        setState(pre => {
            const val = typeof cb === 'function' ? (cb as (val: Type) => Type)(pre) : cb;
            ref.current = val;
            return val;
        });
    }

    return [state, updateState, ref];
}
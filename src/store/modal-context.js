import { createContext, useState } from 'react';

export const ModalContext = createContext({
    mounted: false,
    handleMount: () => {},
});

export default function ModalContextProvider(props) {
    const [mounted, setMounted] = useState(false),
        handleMount = () => {
            setMounted(prevMounted => !prevMounted);
        };
    return (
        <ModalContext.Provider value={{ mounted, handleMount }}>
            {props.children}
        </ModalContext.Provider>
    );
}

import { useState } from 'react';

export const useForceUpdate = () => {
    const forceUpdate = useState(0); // integer state
    const setValue = forceUpdate[1];
    return () => setValue(value => ++value); // update the state to force render
};
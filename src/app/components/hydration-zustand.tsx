'use client';

import { useState, useEffect } from 'react';

export default function HydrationZustand({ children }: { children: React.ReactNode }) {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    return isHydrated ? children : null;
}
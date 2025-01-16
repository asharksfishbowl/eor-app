import React, { createContext, useContext, useEffect, useState } from "react";
import { initWalletConnect } from "@/hooks/useWalletConnect";


type WalletConnectContextType = {
    isConnected: boolean;
    session?: any;
    accounts?: string[];
};

const WalletConnectContext = createContext<WalletConnectContextType>({
    isConnected: false,
    session: undefined,
    accounts: [],
});

export function WalletConnectProvider({ children }: { children: React.ReactNode }) {
    const [isConnected, setIsConnected] = useState(false);
    const [session, setSession] = useState<any>(null);
    const [accounts, setAccounts] = useState<string[]>([]);

    useEffect(() => {
        async function initialize() {
            try {
                await initWalletConnect();
                console.log("WalletConnect initialized!");
            } catch (error) {
                console.error("Error initializing WalletConnect:", error);
            }
        }
        initialize().then(r => console.log("WalletConnect Ready"));
    }, []);

    return (
        <WalletConnectContext.Provider value={{ isConnected, session, accounts }}>
            {children}
        </WalletConnectContext.Provider>
    );
}

export function useWalletConnectContext() {
    return useContext(WalletConnectContext);
}

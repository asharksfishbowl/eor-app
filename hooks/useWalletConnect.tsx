import "react-native-get-random-values";
import { Buffer } from "buffer";

global.Buffer = Buffer;

import SignClient from "@walletconnect/sign-client";
import { Linking, Alert } from "react-native";
import Config from "react-native-config";
import { WalletOptionType } from "@/constants/WalletOptions";

let signClient: SignClient | null = null;

type WalletConnectSession = {
    topic: string;
    relay: {
        protocol: string;
        data?: string;
    };
    namespaces: {
        [key: string]: {
            accounts: string[];
            methods: string[];
            events: string[];
        };
    };
    expiry: number;
    acknowledged: boolean;
};


export async function initWalletConnect(): Promise<SignClient> {
    if (!signClient) {
        signClient = await SignClient.init({
            projectId: Config.WALLETCONNECT_PROJECT_ID || "8c79350de47521099fa8faccafb0faaf",
            relayUrl: "wss://relay.walletconnect.com",
            metadata: {
                name: "Quantum WiFi Provider",
                description: "Demo for WalletConnect v2",
                url: "https://example.com",
                icons: ["https://myapp.com/favicon.ico"],
            },
        });
    }

    return signClient;
}

export async function connectWallet(wallet: WalletOptionType) {
    if (!signClient) {
        throw new Error("WalletConnect is not initialized.");
    }

    try {
        const requiredNamespaces = {
            eip155: {
                methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData"],
                chains: ["eip155:43114"], // Avalanche C-Chain
                events: ["accountsChanged", "chainChanged"],
            },
        };

        const { uri, approval } = await signClient.connect({ requiredNamespaces });

        if (uri) {
            console.log("WalletConnect URI:", uri);
            console.log("Opening wallet app...");
            console.log("Wallet Scheme:", wallet.scheme);
            const walletUri = `${wallet.scheme}wc?uri=${encodeURIComponent(uri)}`;
            await Linking.openURL(walletUri).catch(() => {
                Alert.alert(
                    "Wallet Not Found",
                    `Could not open wallet. Please ensure ${wallet.scheme} is installed on your device.`
                );
                throw new Error(`Could not open wallet with scheme: ${wallet.scheme}`);
            });
        }

        const session: WalletConnectSession = await approval();
        console.log("Session approved:", session);

        const eip155Accounts = session.namespaces.eip155.accounts;
        console.log("Connected accounts:", eip155Accounts);

        return { uri: uri, approval: session };
    } catch (error) {
        console.error("Error connecting wallet:", error);
    }
}


export function openWalletApp(wallet: WalletOptionType, uri: string): void {
    const walletUri = `${wallet.scheme}wc?uri=${encodeURIComponent(uri)}`;
    Linking.openURL(walletUri).catch((err) => {
        console.error(`Could not open ${wallet.name}:`, err);
        Alert.alert(
            "Wallet Not Found",
            `${wallet.name} is not installed on your device. Please install it from the App Store or Play Store.`
        );
    });
}

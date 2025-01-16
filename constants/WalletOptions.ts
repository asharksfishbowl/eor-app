export type WalletOptionType = {
    name: string;
    scheme: string;
    icon: any;
};

export const WalletOptions = [
    {
        name: "MetaMask",
        scheme: "metamask://",
        icon: require("../assets/images/metamask.png"),
    },
    {
        name: "Phantom",
        scheme: "phantom://",
        icon: require("../assets/images/phantom.png"),
    },
    {
        name: "Coinbase",
        scheme: "coinbase://",
        icon: require("../assets/images/coinbase.png"),
    },
];

import { createSolanaRpc, devnet, generateKeyPair, createKeyPairSignerFromBytes, createSignerFromKeyPair } from "@solana/kit";
import { readFile, writeFile } from "node:fs/promises"

const rpc = createSolanaRpc(devnet("https://api.devnet.solana.com"));

// wallet file path
const WALLET_FILE = "wallet.json";


async function loadOrCreateWallet() {
    // try to load an existing wallet
    try {
        const data = JSON.parse(await readFile(WALLET_FILE, "utf-8"));
        const secretBytes = new Uint8Array(data.secretKey);
        const wallet = await createKeyPairSignerFromBytes(secretBytes);
        console.log("Existing wallet:", wallet.address);
        return wallet;
    } catch {
        // No wallet found create a new one
        const keyPair = await generateKeyPair(true);

        // Export public key
        const publicKeyBytes =
            new Uint8Array(await crypto.subtle.exportKey("raw", keyPair.publicKey));

        // Export private key
        const pkcs8 = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey);
        const privateKeyBytes = new Uint8Array(pkcs8).slice(-32);

        // in solana keypair format
        const keyPairBytes = new Uint8Array(64);
        keyPairBytes.set(privateKeyBytes, 0);
        keyPairBytes.set(publicKeyBytes, 32);

        // save it in wallet file
        await writeFile(WALLET_FILE, JSON.stringify({ secretKey: Array.from(keyPairBytes) }));

        const wallet = await createSignerFromKeyPair(keyPair);

        console.log("Created a new wallet:", wallet.address);
        console.log(`Saved to ${WALLET_FILE}`);
        return wallet;
    }
}

const wallet = await loadOrCreateWallet();

// check balance


const {value: balance} = await rpc.getBalance(wallet.address).send();

const balanceInSol = Number(balance)/1_000_000_000;


console.log(`Address: ${wallet.address}`);
console.log(`Balance: ${balanceInSol} SOL`);

if (balanceInSol === 0) {
  console.log(
    `\nThis wallet has no SOL. Visit https://faucet.solana.com/ and airdrop some to:`
  );
  console.log(wallet.address);
}

import { generateKeyPairSigner, createSolanaRpc, devnet, address } from "@solana/kit";

// const wallet = await generateKeyPairSigner();

// console.log("Your new wallet address", wallet.address);

const rpc = createSolanaRpc(devnet("https://api.devnet.solana.com"));

const {value: balance} = await rpc.getBalance(address("D9q8QTs35iZBdE7iJGuKgWFRXgWATA4ZJ2rxAURWN5xt")).send();

const balanceInSol = Number(balance)/1_000_000_000;

console.log(`Balance: ${balanceInSol} SOL`);

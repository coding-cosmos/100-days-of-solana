import { createSolanaRpc,devnet,address } from "@solana/kit";

const rpc = createSolanaRpc(devnet("https://api.devnet.solana.com"));

const addr = address("585UWLk97aarhzVnLA2cwsNDzvDSAq8ekGtK9pHRnj9Y");

const {value:balanceInLamports} = await rpc
    .getBalance(addr)
    .send();


const balanceInSol = Number(balanceInLamports)/1_000_000_000;

console.log(`Address: ${addr}`);
console.log(`Balance: ${balanceInSol} SOL`);
import { createSolanaRpc, devnet,address } from "@solana/kit";

const rpc = createSolanaRpc(devnet("https://api.devnet.solana.com"));

const targetAddr = address("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");

const signatures = await rpc
.getSignaturesForAddress(targetAddr, {limit:5})
.send();

console.log(`\n Last 5 trasactions for ${targetAddr}:`);


for (const tx of signatures){
    const time = tx.blockTime? new Date(Number(tx.blockTime)*1000).toLocaleString(): "unknown";


    console.log(`Signature : ${tx.signature}`);
    console.log(`Slot      : ${tx.slot}`);
    console.log(`Time      : ${time}`);
    console.log(`Status    : ${tx.err? "Falied": "Sucess"}`);
    console.log("---");
}


import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  type TransactionSignature,
} from "@solana/web3.js";
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  createInitializeMint2Instruction,
  createMintToInstruction,
  getAssociatedTokenAddress,
  getMinimumBalanceForRentExemptMint,
} from "@solana/spl-token";

export type SendTransaction = (
  transaction: Transaction,
  connection: Connection,
  options?: { signers?: Keypair[] }
) => Promise<TransactionSignature>;

const DECIMALS = 6;

/**
 * Creates a real SPL token mint for a community and mints the initial supply to
 * the creator's associated token account. The creator's wallet is the mint +
 * freeze authority and the fee payer; a fresh ephemeral keypair is the mint
 * account. Returns the mint address (base58).
 *
 * Runs on whatever cluster the ConnectionProvider is pointed at (devnet by
 * default) — the wallet needs a little SOL for rent + fees.
 */
export async function createCommunityMint(
  connection: Connection,
  payer: PublicKey,
  sendTransaction: SendTransaction,
  opts: { supply: number }
): Promise<{ mint: string; signature: string }> {
  const mintKeypair = Keypair.generate();
  const lamports = await getMinimumBalanceForRentExemptMint(connection);
  const ata = await getAssociatedTokenAddress(mintKeypair.publicKey, payer);

  const amount =
    BigInt(Math.max(1, Math.floor(opts.supply))) *
    BigInt(Math.round(Math.pow(10, DECIMALS)));

  const tx = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: mintKeypair.publicKey,
      space: MINT_SIZE,
      lamports,
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeMint2Instruction(
      mintKeypair.publicKey,
      DECIMALS,
      payer,
      payer
    ),
    createAssociatedTokenAccountInstruction(
      payer,
      ata,
      payer,
      mintKeypair.publicKey
    ),
    createMintToInstruction(mintKeypair.publicKey, ata, payer, amount)
  );

  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash();
  tx.feePayer = payer;
  tx.recentBlockhash = blockhash;

  const signature = await sendTransaction(tx, connection, {
    signers: [mintKeypair],
  });
  await connection.confirmTransaction(
    { signature, blockhash, lastValidBlockHeight },
    "confirmed"
  );

  return { mint: mintKeypair.publicKey.toBase58(), signature };
}

/** Explorer link for a mint (cluster-aware for devnet). */
export function explorerAddress(address: string, cluster = "devnet"): string {
  const suffix = cluster === "mainnet-beta" ? "" : `?cluster=${cluster}`;
  return `https://explorer.solana.com/address/${address}${suffix}`;
}

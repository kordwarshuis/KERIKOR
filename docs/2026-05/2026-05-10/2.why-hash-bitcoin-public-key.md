# Why hash Bitcoin public key?

Follow up on [this](../2026-05-09/1.private-public-keys.md).

## Why hash Bitcoin public key?

You said:

> Check address ownership  Take the public key that B just revealed.  
> Hash it (SHA256 + RIPEMD160, plus encoding).  
> Verify that this hash exactly matches the address that was used in the earlier “receive” transaction (the one in the locked UTXO).
> → This proves “this is the correct public key for that address.”

Why not store the public key itself instead of the public address, since the private key cannot be generated from the public key anyway?

## Answer (KERI wizard)

**Great question.** This is one of the deliberate design choices Satoshi made, and there are several practical and security-related reasons why Bitcoin uses the **hash of the public key** (the address) instead of storing the full public key directly.

### 1. **Much Shorter & More User-Friendly Addresses**
- A full public key is **33 bytes** (compressed) or **65 bytes** (uncompressed).
- The address is only **~20 bytes** internally (after hashing), which becomes a short string:
  - Legacy (P2PKH): ~34 characters (e.g., `1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa`)
  - Bech32 (native SegWit): ~42–62 characters but more efficient and error-resistant.

Short strings are easier to share (QR codes, typing, reading aloud, etc.).

### 2. **Better Privacy**
- When coins are **received**, only the **hash** (address) is visible on the blockchain.
- The actual public key is **not revealed** until the moment B spends the coins.
- This means observers cannot link the receiving address to a specific public key until spending happens. It gives a modest privacy boost and makes certain types of analysis harder.

### 3. **Extra Security Layer (Hash as Second Preimage Protection)**
Even though it is computationally infeasible to derive the private key from the public key today, hashing adds defense-in-depth:

- An attacker would need to find a **preimage** (find a public key that hashes to the exact address) *and* break the elliptic curve.
- If elliptic curve cryptography were ever weakened or broken in the future (e.g., by large-scale quantum computers), the hash still provides an additional barrier for coins that have not yet been spent.
- It makes certain theoretical attacks more expensive.

### 4. **Smaller Output Scripts = Lower Fees and Smaller Blockchain**
- Storing a 20-byte hash in the locking script is smaller than storing a 33- or 65-byte public key.
- This reduces transaction fees for the sender (who pays for the output size) and keeps the overall blockchain leaner.

### 5. **Checksum & Error Detection**
Address formats (Base58Check or Bech32) include a built-in checksum. This means if you mistype a character, the wallet can immediately detect the error. Raw public keys don’t have this convenience by default.

### Historical Note: Pay-to-PubKey (P2PK) vs Pay-to-PubKey-Hash (P2PKH)

Bitcoin *does* support direct Pay-to-PubKey (you can lock coins to a raw public key), and it was used in the very early days. Satoshi quickly moved to P2PKH because the advantages above were obvious.

Modern Bitcoin has gone even further:
- **P2WPKH** (SegWit) and **Taproot** further improve this model with even smaller scripts and better privacy/security.

---

**Summary**:  
We don’t store the public key directly because **hashing gives us shorter addresses, better privacy, slightly stronger security, smaller on-chain data, and error-checking** — all while the fundamental security (private key → public key one-way function) remains intact.

The hash doesn’t reduce security; it adds practical and defensive benefits on top of the elliptic curve math.

Would you like me to show the actual script differences between locking to a public key vs. locking to a hash of a public key?
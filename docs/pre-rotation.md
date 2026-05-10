# Pre-rotation

2026-05-10

Explain how KERI (Key Event Receipt Infrastructure) pre-rotation works. Target audience: understands public private keys and hashing more or less since a week.

## Pre-rotation

Grok, reviewed and improved by KERI Wizzard (Henk van Cann):

**Pre-rotation** is KERI’s mechanism for secure key rotation: transferring control of an identifier to new keys while minimizing the risk that compromise of the *current* signing keys leads to permanent identifier theft.

It works by publishing a **cryptographic commitment** to future keys *before* those keys are ever used.

Instead of revealing future keys directly, KERI publishes only a digest (hash commitment) of them. The actual future keys remain secret until the rotation occurs.

---

## Why Pre-rotation? (The Problem It Solves)

In any public-key system:

* The **private key** signs messages/events.
* The **public key** lets others verify those signatures.

Over time, active signing keys become increasingly exposed:

* They are repeatedly used in signatures.
* They may reside on online devices.
* They may eventually be leaked, stolen, or weakened by advances in cryptanalysis.

In many systems, if an attacker steals the current private key, they can permanently seize control by rotating the identifier to attacker-controlled keys.

KERI prevents this by separating:

* **Current keys** — used to sign events now.
* **Next keys** — committed to in advance, but kept secret until the next rotation.

The next keys are therefore protected from exposure while the current keys are in use.

---

## How Pre-rotation Works

### 1. Inception (Creating the Identifier)

Suppose your first active keypair is:

* Public key: **A**
* Private key: **a**

You also generate the *next* keypair in advance:

* Public key: **B**
* Private key: **b**

But instead of publishing **B**, you publish only a commitment to it:

* `H(B)` = hash/digest of B’s public key material

The **Inception Event** includes:

* Current public key(s): **A**
* Next-key commitment: **H(B)**
* Signing thresholds and configuration data

The inception event is signed using private key **a**.

At this point:

* **A** is the active signing key.
* **B** remains secret.
* Observers know only that some future key matching `H(B)` must eventually appear.

---

### 2. Rotation

Later, you decide to rotate keys.

You now:

* Reveal public key **B**
* Generate another future keypair **C**
* Publish commitment `H(C)`

The new **Rotation Event** includes:

* New current public key(s): **B**
* New next-key commitment: `H(C)`

Critically:

* The rotation event is signed by the **old current key(s)** (**A** / private key **a**)
* Verifiers check that the newly revealed key **B** hashes to the previously committed `H(B)`

This proves continuity of control.

After rotation:

* **B** becomes the active signing key.
* **C** remains secret behind commitment `H(C)`.

The process repeats indefinitely.

---

## Verification

Anyone verifying the KEL checks:

1. The previous event committed to `H(B)`
2. The rotation event reveals **B**
3. `hash(B) == H(B)`
4. The rotation event is correctly signed by the prior current keys
5. Event chaining digests are consistent

This creates a cryptographically verifiable chain of key state transitions.

---

## Why This Is Powerful

### Protection Against Current-Key Compromise

Suppose an attacker steals the current private key **a**.

They still cannot arbitrarily rotate the identifier to attacker-controlled keys because:

* The next keys were already committed to earlier via `H(B)`
* The attacker cannot produce private key **b**
* Therefore they cannot continue the identifier’s key state beyond the next rotation

At worst, they may temporarily misuse the current key, but they cannot permanently seize control if the legitimate controller still possesses the pre-rotated keys.

This is one of KERI’s most important security properties.

---

### Reduced Exposure Window

Future keys remain:

* Offline
* Air-gapped
* Unused
* Unpublished

until needed.

This dramatically reduces exposure risk.

---

### Continuous Recoverability

Every rotation establishes the next recovery path in advance.

Control continuity is therefore always anchored by a previously committed future state.

---

### Stronger Long-Term Security

Pre-rotation supports crypto agility and long-term survivability because keys can continuously evolve without changing the identifier itself.

This is especially important for long-lived decentralized identifiers.

---

## Mental Model

Think of it as a rolling cryptographic promise:

* Inception:

  > “I currently use A, and later I will reveal a key matching H(B).”

* Rotation:

  > “Here is B (which matches the earlier commitment). Now I commit to H(C).”

* Next rotation:

  > “Here is C. Now I commit to H(D).”

and so on forever.

---

## Important Subtlety

The commitment is to the **next keys**, not merely the next event.

KERI is therefore committing future *control authority* in advance.

That distinction is what gives pre-rotation its security value.

---

## Additional Notes

* KERI supports multisig and threshold signing during rotations.
* The commitment can represent threshold key configurations, not just a single key.
* Witnesses and receipts help detect duplicity (forked key event logs).
* Partial rotations and delegated identifiers extend the model further.

---

## One-Sentence Summary

Pre-rotation lets KERI commit future control authority in advance using cryptographic commitments, so compromise of current keys does not automatically allow permanent identifier takeover.


# UNIA contracts — $UNIA + UNIA PASS (Robinhood Chain)

Real, deployable contracts for UNIA's on-chain economy.

- **`UniaToken.sol`** — `$UNIA` ERC-20 (1B supply to deployer; the Pass is set as `minter` to stream rewards).
- **`UniaPass.sol`** — `UNIA PASS` ERC-721. Mint is **FREE if you hold ≥ 5,000,000 $UNIA**, otherwise **0.005 ETH**. Holding a Pass streams **420 $UNIA/day** and flags the wallet as **premium** (`isPremium`).

## Deploy (Foundry)

```bash
cd contracts

# one-time deps
forge install foundry-rs/forge-std --no-commit
forge install OpenZeppelin/openzeppelin-contracts --no-commit

forge build

# deploy to Robinhood Chain (needs a funded deployer key)
export PRIVATE_KEY=0xYOUR_DEPLOYER_KEY
forge script script/Deploy.s.sol:Deploy \
  --rpc-url https://rpc.mainnet.chain.robinhood.com \
  --broadcast
```

The script prints the two addresses. Paste them into `lib/config.ts`:

```ts
UNIA.token.address = "0x…";  // UniaToken
UNIA.pass.address  = "0x…";  // UniaPass
```

Once both are non-placeholder, the frontend automatically switches from
the built-in simulation to **real on-chain reads/writes** (balanceOf, mint,
claim) via wagmi. Until then it runs as a paper/demo.

> Security note: never share or commit your `PRIVATE_KEY`. Deploy from a
> wallet you control with enough ETH for gas on Robinhood Chain.

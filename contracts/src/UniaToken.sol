// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "openzeppelin-contracts/token/ERC20/ERC20.sol";
import {Ownable} from "openzeppelin-contracts/access/Ownable.sol";

/// @title $UNIA — the reward token for the first agent on Uniswap (Robinhood Chain).
/// @notice 1,000,000,000 supply minted to the deployer. The UNIA PASS contract is
///         set as `minter` so it can stream rewards to Pass holders.
contract UniaToken is ERC20, Ownable {
    address public minter;

    event MinterSet(address indexed minter);

    constructor(address initialOwner) ERC20("Unia", "UNIA") Ownable(initialOwner) {
        _mint(initialOwner, 1_000_000_000 ether); // 1B $UNIA (18 decimals)
    }

    /// @notice Authorize the rewards contract (UNIA PASS) to mint reward $UNIA.
    function setMinter(address m) external onlyOwner {
        minter = m;
        emit MinterSet(m);
    }

    /// @notice Mint reward tokens. Callable only by the configured minter.
    function mint(address to, uint256 amount) external {
        require(msg.sender == minter, "UNIA: not minter");
        _mint(to, amount);
    }
}

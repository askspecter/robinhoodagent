// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "openzeppelin-contracts/token/ERC721/ERC721.sol";
import {Ownable} from "openzeppelin-contracts/access/Ownable.sol";

interface IUnia {
    function balanceOf(address) external view returns (uint256);
    function mint(address to, uint256 amount) external;
}

/// @title UNIA PASS — the membership NFT for UNIA.
/// @notice Mint is FREE if you hold >= 5,000,000 $UNIA, otherwise 0.005 ETH.
///         Holding a Pass streams 420 $UNIA/day and flags the wallet as premium.
contract UniaPass is ERC721, Ownable {
    IUnia public immutable unia;

    uint256 public constant FREE_HOLD = 5_000_000 ether; // hold >= 5M $UNIA -> free
    uint256 public constant PRICE = 0.005 ether;         // public mint price
    uint256 public constant MAX_SUPPLY = 10_000;
    uint256 public constant REWARD_PER_DAY = 420 ether;  // $UNIA / day / pass

    uint256 public totalMinted;
    mapping(address => uint256) public lastClaim;

    event Minted(address indexed to, uint256 indexed id, bool free);
    event Claimed(address indexed to, uint256 amount);

    constructor(address unia_, address initialOwner)
        ERC721("UNIA PASS", "UPASS")
        Ownable(initialOwner)
    {
        unia = IUnia(unia_);
    }

    /// @notice Your mint price: 0 if you hold >= 5M $UNIA, else 0.005 ETH.
    function mintPrice(address user) public view returns (uint256) {
        return unia.balanceOf(user) >= FREE_HOLD ? 0 : PRICE;
    }

    /// @notice Mint one UNIA PASS. Free for 5M+ $UNIA holders, else 0.005 ETH.
    function mint() external payable {
        require(totalMinted < MAX_SUPPLY, "UNIA: sold out");
        require(balanceOf(msg.sender) == 0, "UNIA: already holder");
        uint256 price = mintPrice(msg.sender);
        require(msg.value >= price, "UNIA: insufficient ETH");

        uint256 id = ++totalMinted;
        _safeMint(msg.sender, id);
        emit Minted(msg.sender, id, price == 0);

        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price); // refund overpay
        }
    }

    /// @notice Streamed $UNIA a wallet can currently claim.
    function pendingRewards(address user) public view returns (uint256) {
        uint256 held = balanceOf(user);
        if (held == 0 || lastClaim[user] == 0) return 0;
        uint256 elapsed = block.timestamp - lastClaim[user];
        return (REWARD_PER_DAY * held * elapsed) / 1 days;
    }

    /// @notice Claim streamed $UNIA rewards (mints via the token contract).
    function claim() external {
        uint256 amt = pendingRewards(msg.sender);
        require(amt > 0, "UNIA: nothing to claim");
        lastClaim[msg.sender] = block.timestamp;
        unia.mint(msg.sender, amt);
        emit Claimed(msg.sender, amt);
    }

    /// @notice True if the wallet holds a Pass (premium unlocked).
    function isPremium(address user) external view returns (bool) {
        return balanceOf(user) > 0;
    }

    /// @notice Withdraw collected ETH to the owner.
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    /// @dev Reset the reward clock whenever a Pass lands in a wallet (mint or transfer).
    function _update(address to, uint256 tokenId, address auth)
        internal
        override
        returns (address)
    {
        address from = super._update(to, tokenId, auth);
        if (to != address(0)) lastClaim[to] = block.timestamp;
        return from;
    }
}

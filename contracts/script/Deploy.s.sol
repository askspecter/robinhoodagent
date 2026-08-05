// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console2} from "forge-std/Script.sol";
import {UniaToken} from "../src/UniaToken.sol";
import {UniaPass} from "../src/UniaPass.sol";

/// @notice Deploys $UNIA + UNIA PASS and wires the Pass as the token minter.
///  Run:  forge script script/Deploy.s.sol:Deploy \
///          --rpc-url https://rpc.mainnet.chain.robinhood.com --broadcast
contract Deploy is Script {
    function run() external {
        uint256 pk = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(pk);

        vm.startBroadcast(pk);
        UniaToken token = new UniaToken(deployer);
        UniaPass pass = new UniaPass(address(token), deployer);
        token.setMinter(address(pass)); // let the Pass stream reward $UNIA
        vm.stopBroadcast();

        console2.log("UNIA token :", address(token));
        console2.log("UNIA PASS  :", address(pass));
        console2.log("chainId    :", block.chainid);
    }
}

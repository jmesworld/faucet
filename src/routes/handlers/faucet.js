const MissingBodyParameterError = require("../errors/MissingBodyParameterError");
const MissingQueryParameterError = require("../errors/MissingQueryParameterError");

function faucetHandler({ faucetManager, identityManager } = {}) {
  async function getTokenForUsername(req, res, next) {
    const {
      params: { username },
    } = req;
    try {
      throw new Error("Failed method. Invalid since update");
      if (!username) throw new MissingQueryParameterError(path, "username");

      try {
        const resolvedIdentity = await identityManager.resolveIdentity({
          username,
        });
        if (!resolvedIdentity.address) {
          throw new Error("User is not a registered identity");
        }
        const sendParams = {
          address: resolvedIdentity.address,
          amount: 1,
        };
        const sendTransactionRequest = await faucetManager.sendTransaction(
          sendParams
        );
        const txid = sendTransactionRequest.transactionHash;
        console.log({ sendTransactionRequest });
        return res.json({ txid, error: false });
      } catch (e) {
        console.error(e);
        return next(e);
      }
    } catch (e) {
      console.error({ ea2: e });
      return next(e);
    }
  }

  async function getCreditForAddress(req, res, next) {
    const {
      query: { address, denom, amount },
      path,
    } = req;
    try {
      const denomination = denom ?? "ujmes";
      const sendAmount = amount ?? 1e6;
      if (!address) throw new MissingQueryParameterError(path, "address");

      try {
        const sendParams = {
          address: address,
          amount: sendAmount,
        };
        const sendTransactionRequest = await faucetManager.sendTransaction(
          sendParams
        );
        console.log({ sendTransactionRequest });
        const txid = sendTransactionRequest.transactionHash;
        return res.json({ txid, address, denomination, error: false });
      } catch (e) {
        console.error(e);
        return next(e);
      }
    } catch (e) {
      console.error({ getCreditForRequestError: e });
      return next(e);
    }
  }
  async function getBalance(req, res, next) {
    try {
      const balance = await faucetManager.getBalance();
      const address = await faucetManager.getAddress();
      return res.json({ balance, address, error: false });
    } catch (e) {
      console.error({ getBalance: e });
      return next(e);
    }
  }

  return {
    getTokenForUsername,
    getCreditForAddress,
    getBalance,
  };
}

module.exports = faucetHandler;

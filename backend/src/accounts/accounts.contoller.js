
// | `GET`       | `/accounts`            | Returns all accounts within the database.                        
// | `GET`       | `/accounts/:accountId` | Returns a single account with the matching ID.                   
// | `POST`      | `/accounts`            | Should create a new account and return that account with its ID. 
// | `PUT`       | `/accounts/:accountId` | Updates an account based on the                                  
// | `DELETE`    | `/accounts/:accountId` | Should delete the specified account.        

const service = require("./accounts.service");

async function accountIdExists(req, res, next) {
    const { accountId } = req.params; // Check if accountId is coming through
    const account = await service.read(accountId); // Fetch the account from the database
    res.locals.account = account;
    account 
     ? next()
     : next({ status: 404, message: `Account ID ${accountId}: Does not exist.` });
 }
 
async function list(req, res, next) {
    const accounts = await service.list();
    res.json({ data: accounts });
}

async function read(req, res, next) {
    res.json({ data: res.locals.account });
}


module.exports = {
    list, 
    read: [accountIdExists, read],
}
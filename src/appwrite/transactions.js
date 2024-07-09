import config from "./appwrite_config";
import { Client, Databases, Query } from "appwrite";
 
export class Transactions{

    client = new Client();
    databases;

    constructor(){
        this.client.setEndpoint(config.appwriteUrl)
                   .setProject(config.appwriteProjectId)

        this.databases = new Databases(this.client);
    }

    async addTransaction({user_id, transaction_id, transaction_date, transaction_time, transaction_amount, transaction_mode, transaction_category,transaction_message, wallet_balance }){

        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                transaction_id,
                {
                    user_id,
                    transaction_id,
                    transaction_amount,
                    transaction_category,
                    transaction_mode,
                    transaction_message,
                    transaction_time,
                    transaction_date,
                    wallet_balance
                }
            )
        } catch (error) {
            console.log('Appwrite Error : createTransaction : ', error);
        }
    }

    async viewTransactions(user_id){

        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [
                    Query.equal('user_id',user_id)
                ]
            )
        } catch (error) {
            console.log('Appwrite Error : viewTransactions : ', error);
        }
    }

    async getTransaction(transaction_id){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [
                    Query.equal('transaction_id',transaction_id)
                ]
            )
        } catch (error) {
            console.log('Appwrite Error : getTransaction : ', error);
        }
    }

    async removeTransaction(transaction_id){

        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                transaction_id
            )
            return true;
        } catch (error) {
            console.log('Appwrite Error : removeTransaction : ', error);
        }
    }

}

const myTransactions = new Transactions();
export default myTransactions
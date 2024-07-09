import { Client, Databases, Query } from "appwrite";
import config from "./appwrite_config";
import { useSelector } from "react-redux";

const user_id = useSelector(state => state.auth.user.$id);

export class Users{

    client = new Client();
    databases;

    constructor(){
        this.client.setEndpoint(config.appwriteUrl)
                   .setProject(config.appwriteProjectId)

        this.databases = new Databases();
    }

    async addUser(){
        try {
            const user = await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                user_id,
                {

                }
            )
        } catch (error) {
            
        }
    }

    async viewUser(){
        try {
            
        } catch (error) {
            
        }
    }
}
import conf from "../conf/conf.js";
import { Client , Account , ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteurl)
        .setProject(conf.ProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email,password,name})
    {
        try {
            const userAccount = await this.account.create
            (ID.unique(), email , password , name);
            if(!userAccount) {
                return userAccount;
            }
            else {
                return this.login({email,password});
            }
        } catch (error) {
            throw error
        }
    }

    async login({email,password}) {
        try {
            return await this.account.createEmailPasswordSession({email,password}) //Change here emailPasswordSession
        } catch (error) {
            throw error
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.getCurrentUser();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null; 
    }
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService
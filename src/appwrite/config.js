import conf from "../conf/conf.js";
import { Client , Databases , Storage , ID , Query } from "appwrite";


export class Service{
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
        .setEndpoint(conf.appwriteurl)
        .setProject(conf.ProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title , Slug , featuredImage , content , status , userId}) {
        try {
            return await this.databases.createDocument(
                conf.DatabaseId,
                conf.CollectiontId,
                Slug,
                {
                    title,
                    status,
                    content,
                    featuredImage,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite : createPost :: error" , error);
        }
    }

    async updatePost(Slug , {title , featuredImage , content , status}) {
        try {
            return await this.databases.updateDocument(
                conf.DatabaseId,
                conf.CollectiontId,
                Slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite : updatePost : error",error);
        }
    }
    async deletePost(Slug) {
        try {
            await this.databases.deleteDocument(
                conf.DatabaseId,
                conf.CollectiontId,
                Slug,
            )
            return true;
        } catch (error) {
            console.log("Appwrite : deletePost : error",error);
            return false; 
        }
    }

    async getPost(Slug) {
        try {
            return await this.databases.getDocument(
                conf.DatabaseId,
                conf.CollectiontId,
                Slug
            )
        } catch (error) {
            console.log("Appwrite : getPost : error",error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]) {
        try {
            return await this.databases.listDocuments(
                conf.DatabaseId,
                conf.CollectiontId,
                queries,

            )
        } catch (error) {
            console.log("Appwrite : getposts : error",error);
            return false;
        }
    }

    //File services
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.BucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite: uopload file : error",error);
            return false;
        }
    }
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.BucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite : delete file error",error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.BucketId,
            fileId
        )
    }
}
const service = new Service()
export default service;
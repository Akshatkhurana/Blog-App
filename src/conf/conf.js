const conf = {
    appwriteurl : String(import.meta.env.VITE_APPWRITE_URL),
    ProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    DatabaseId : String(import.meta.env.VITE_DATABASE_ID),
    BucketId : String(import.meta.env.VITE_BUCKET_ID),
    CollectiontId : String(import.meta.env.VITE_COLLECTION_ID)
}
export default conf

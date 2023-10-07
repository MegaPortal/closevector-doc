---
sidebar_position: 2
---

# CloseVector Node

`closevector-node` is a Node.js library, which means it is designed to be used with Node.js applications. It provides functionality for embedding texts, adding documents and vectors, performing similarity searches, and other operations related to CloseVector. Additionally, it offers IO functions for uploading, updating, and retrieving indices, as well as various utility functions and constants.

## Installation

To install the `closevector-node` library, run the following command:

```bash
npm install closevector-node
```

for more information, checkout [closevector-node](https://www.npmjs.com/package/closevector-node).

## CloseVectorEmbeddings

### Interface: `CloseVectorEmbeddingsParams`
  - **Properties**:
  - `timeout?: number`: Optional timeout for requests.
  - `batchSize?: number`: Maximum number of documents to embed in a single request (limited by the OpenAI API to a max of 2048).
  - `stripNewLines?: boolean`: Option to remove new lines from the input text.

### Class: `CloseVectorEmbeddings`
- **Class Fields**:
  - `batchSize`: Default is 512, specifies the max number of texts to embed in one batch.
  - `stripNewLines`: Default is true, specifies whether to strip new lines from input texts.
  - `timeout`: Optional timeout for HTTP requests.
  - `config`: An object containing `key` and `secret` for API authentication.
  
- **Constructor**:
  - Takes an object of type `Partial<CloseVectorEmbeddingsParams>` and additional properties `key` and `secret`.

- **Methods**:
  - `async embedDocuments(texts: string[]): Promise<number[][]>`: Embeds an array of texts and returns a 2D array of numbers (embeddings).
  - `async embedQuery(text: string): Promise<number[]>`: Embeds a single text and returns an array of numbers (embedding).
  - `private async embeddingWithRetry(textList: string[]): Promise<any>`: A private method for embedding a list of texts. Called internally by `embedDocuments` and `embedQuery`.
## CloseVectorHNSWNode

### Class: `CloseVectorHNSWNode`

- **Extends**: `CloseVectorSaveableVectorStore`
  
- **Constructor**:
  - `constructor(embeddings: CloseVectorEmbeddings, args: CloseVectorHNSWLibArgs<HierarchicalNSWT> & { accessKey?: string; secret?: string; })`: Initializes a new instance of `CloseVectorHNSWNode`, setting up the necessary properties and optionally using a provided document store.

- **Properties**:
  - `index?: HierarchicalNSWT`: The HierarchicalNSW index instance.
  - `docstore: SynchronousInMemoryDocstore`: The document store instance.
  - `args: CloseVectorHNSWLibBase`: Arguments for hnswlib.
  - `uuid?: string`: Universally unique identifier.
  - `accessKey?: string`: Access key of CloseVector.
  - `secret?: string`: Secret key of CloseVector.

- **Methods**:
  - `async addDocuments(documents: CloseVectorDocument[]): Promise<void>`: Adds documents to the index by converting their content to vectors and adding them along with the documents to the vector store.
  - `async addVectors(vectors: number[][], documents: CloseVectorDocument[])`: Adds vectors and their associated documents to the index, ensuring the vectors and index are properly initialized and resized as needed.
  - `async similaritySearchVectorWithScore(query: number[], k: number, filter?: this['FilterType'])`: Performs a similarity search using a query vector, returning up to `k` results, optionally filtered using a filter function.
  - `async delete(params: { directory: string })`: Deletes the hnswlib index, docstore, and args files in a specified directory.
  - `async save(directory: string)`: Saves the current state of the hnswlib index, docstore, and args to specified directory.
  - `async saveToCloud(options: Omit<Parameters<typeof upsertIndex>[1], 'accessKey' | 'secret'>)`: Saves the current state to the cloud, using provided options and the instance’s access and secret keys.
  - `static async load(directory: string, embeddings: CloseVectorEmbeddings)`: Static method to load saved state from a directory and create an instance using specified embeddings.
  - `static async loadFromCloud(options: Parameters<typeof getIndex>[0])`: Static method to load saved state from the cloud and create an instance, using provided options.
  - `static async fromTexts(texts: string[], metadatas: object[] | object, embeddings: CloseVectorEmbeddings, dbConfig?: { docstore?: SynchronousInMemoryDocstore }): Promise<CloseVectorHNSWNode>`: Static method to create an instance from texts and metadata, using specified embeddings and optional document store configuration.
  - `static async fromDocuments(docs: CloseVectorDocument[], embeddings: CloseVectorEmbeddings, dbConfig?: { docstore?: SynchronousInMemoryDocstore }): Promise<CloseVectorHNSWNode>`: Static method to create an instance from documents, using specified embeddings and optional document store configuration.
  - `static async imports(): Promise<{ HierarchicalNSW: typeof HierarchicalNSWT }>`: Static method to dynamically import dependencies, providing a helpful error message if the import fails.

## IO Functions

1. **uploadOrUpdateIndexFile(fileUrl: string, options: object)**
    - Uploads or updates an index file.
    - `fileUrl`: The URL of the file to upload.
    - `options`: Configuration options including `uuid`, `description`, `accessKey`, `secret`, `uploadUrl`, and an optional `onProgress` callback.

2. **upsertIndex(lib: HNSWLib, options: object)**
    - Inserts or updates an index.
    - `lib`: An instance of the `HNSWLib` class.
    - `options`: Configuration options including `description`, `public`, `uuid`, `accessKey`, `secret`, and an optional `onProgress` callback.
  
3. **getIndex(options: object)**
    - Retrieves an index.
    - `options`: Configuration options including `uuid`, `accessKey`, `secret`, `embeddings`, and an optional `onProgress` callback.

## Utilities
### Constants

1. **`END_POINT`**: A constant string that stores the endpoint URL "https://vector-kv.mega-ug.uk".

### Enumerations

1. **`FileVisibility`**: An enumeration with two values: `Public = 0` and `Private = 1`, used for setting file visibility.

### Functions

1. **`chunkArray<T>(arr: T[], chunkSize: number): T[][]`**
   - Splits an array into chunks of a given size.
  
2. **`encryptToken(object: Record<string, any>, secret: string): Promise<string>`**
   - Encrypts a JavaScript object into a JWT token with a provided secret. The token has a 1-hour expiration time.

3. **`createUploadFileOperationUrl(options: object): Promise<object>`**
   - Generates an upload URL and UUID for a file.
   - `options`: Configuration options including `uuid`, `public`, `description`, `accessKey`, and `secret`.

4. **`createGetFileOperationUrl(options: object): Promise<object>`**
   - Generates a download URL for a file using its UUID.
   - `options`: Configuration options including `uuid`, `accessKey`, and `secret`.
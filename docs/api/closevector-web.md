---
sidebar_position: 1
---

# CloseVector Web

`closeVector-web` is a browser-based package designed for handling text embeddings and vector storage. It features two core classes: CloseVectorEmbeddings for embedding operations, including timeout and batch size options, and HNSWLib for document and vector management, including similarity searches. The library also comes with IO capabilities, utility functions like array chunking, token encryption, and an IDBFS class for client-side file system operations.

## Installation

To install the `closevector-web` library, run the following command:

```bash
npm install closevector-web
```

for more information, checkout [closevector-web](https://www.npmjs.com/package/closevector-web).

## CloseVectorEmbeddings

### Interfaces

1. **`CloseVectorEmbeddingsParams`**: Extends `EmbeddingsParams` and adds additional optional parameters:
   - `timeout`: Time limit for the operation.
   - `batchSize`: Maximum number of documents to embed in a single request (limited to 2048 by OpenAI).
   - `stripNewLines`: Whether to remove new lines from the input text or not.

### Classes

1. **`CloseVectorEmbeddings`**:

   #### Properties:
   - `batchSize`: Sets the batch size for document embedding (default is 512).
   - `stripNewLines`: Whether to strip new lines from the text (default is `true`).
   - `timeout`: Time limit for the operation.
   - `config`: Holds `key` and `secret` for authorization.

   #### Methods:
   - `constructor(fields: Partial<CloseVectorEmbeddingsParams> & {key: string; secret: string})`: Initializes the class instance with the provided fields.
   - `embedDocuments(texts: string[]): Promise<number[][]>`: Embeds a list of documents and returns their embeddings.
   - `embedQuery(text: string): Promise<number[]>`: Embeds a single query text and returns its embedding.
   - `embeddingWithRetry(textList: string[]): Promise<any>`: Handles embedding with retries and authorization.

## CloseVectorHNSWWeb

### Interfaces

1. **`CloseVectorHNSWLibBase`**: Describes the basic parameters for HNSWLib, including:
    - `space`: Type `string`
    - `maxElements`: Type `number`
    - `numDimensions`: Type `number`, optional

2. **`CloseVectorHNSWLibArgs`**: Extends `CloseVectorHNSWLibBase` with:
    - `docstore`: Type `SynchronousInMemoryDocstore`, optional
    - `index`: Type `HierarchicalNSWT`, optional

### Classes

1. **`CloseVectorHNSWWeb`**: Extends `CloseVectorSaveableVectorStore`.
    - **Methods**:
        - `constructor(embeddings: CloseVectorEmbeddings, args: CloseVectorHNSWLibArgs)`: Initializes a new instance.
        - `addDocuments(documents: CloseVectorDocument[]): Promise<void>`: Adds new documents to the docstore and index.
        - `addVectors(vectors: number[][], documents: CloseVectorDocument[])`: Adds vectors and metadata to the index and docstore.
        - `similaritySearchVectorWithScore(query: number[], k: number, filter?: this['FilterType'])`: Searches the vector store and returns documents along with their scores.
        - `save(directory: string)`: Saves the index, docstore, and args to disk.
        - `saveToCloud(options: Omit<Parameters<typeof upload>[0], 'path'>)`: Saves the index, docstore, and args to the cloud.
        
    - **Static Methods**:
        - `static async getHierarchicalNSW(args: CloseVectorHNSWLibBase)`: Returns a HierarchicalNSW instance.
        - `static async load(directory: string, embeddings: CloseVectorEmbeddings)`: Loads a pre-existing vector store from disk.
        - `static async loadFromCloud(options: Parameters<typeof download>[0] & { uuid: string, embeddings: CloseVectorEmbeddings })`: Loads a pre-existing vector store from the cloud.
        - `static async fromTexts(texts: string[], metadatas: object[] | object, embeddings: CloseVectorEmbeddings, dbConfig?: { docstore?: SynchronousInMemoryDocstore; }): Promise<CloseVectorHNSWWeb>`: Creates an instance from text documents.
        - `static async fromDocuments(docs: CloseVectorDocument[], embeddings: CloseVectorEmbeddings, dbConfig?: { docstore?: SynchronousInMemoryDocstore; }): Promise<CloseVectorHNSWWeb>`: Creates an instance from Document objects.
        - `static async imports(): Promise<HnswlibModule>`: Imports the hnswlib-wasm library.

### Additional Exports

- **`HNSWLib`**: Alias for `CloseVectorHNSWWeb`.
- **`HierarchicalNSWT`**: Type export from 'closevector-hnswlib-wasm'.
- **`HnswlibModule`**: Type export.
- Various exports from 'closevector-common' including:
    - `CloseVectorEmbeddings`
    - `CloseVectorHNSWLibArgs`
    - `CloseVectorSaveableVectorStore`
    - `CloseVectorDocument`
    - `SynchronousInMemoryDocstore`
    - `CloseVectorHNSWLibBase`
    - `CloseVectorCredentials`

## IO Functions

- `download(options: { url: string; onProgress?: (progress: { loaded: number; total: number }) => void; })`: Downloads a tar archive from a given URL, extracts it, and writes it to IndexedDB. Optionally, allows tracking the progress of the download.
  
- `upload(options: { path: string; url: string; onProgress?: (progress: { uploaded: number; total: number }) => void; })`: Packs files from a given path in IndexedDB into a tar archive and uploads it to a specified URL. Optionally, allows tracking the progress of the upload.

## Utilities

### Constants

- `END_POINT`: A string constant that holds the endpoint URL for the vector-kv server.

### Functions

- `chunkArray(arr: T[], chunkSize: number)`: Splits an array into chunks of a given size.
- `encryptToken(object: Record<string, any>, secret: string)`: Encrypts an object using JWT and returns the token.
- `createUploadFileOperationUrl(options: {uuid?: string, description: string, accessKey: string, secret: string})`: Asynchronously fetches a URL and UUID for uploading a file.
- `createGetFileOperationUrl(options: {uuid: string, accessKey: string, secret: string})`: Asynchronously fetches a URL for downloading a file.
- `fetchUsingToken(url: string, options: RequestInit & {accessKey: string, secret: string})`: Performs an asynchronous fetch operation using an Authorization token. Not recommended for web usage.
- `pathJoin(...parts: string[])`: Joins the given strings into a path.

### Classes

- `IDBFS`
  - `writeBufferToFile(path: string, buffer: Uint8Array)`: Writes a buffer to a file.
  - `writeStringToFile(path: string, data: string)`: Writes a string to a file.
  - `getBufferFromFile(path: string)`: Fetches a buffer from a file.
  - `getStringFromFile(path: string)`: Fetches a string from a file.
  - `writeFs()`: Synchronizes the filesystem.
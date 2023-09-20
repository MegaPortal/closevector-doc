
import { promises as fs } from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';
import {
    CloseVectorEmbeddings,
    HNSWLib,
    upsertIndex
} from 'closevector-node';
import { Document } from 'langchain/document';
import * as parser from '@textlint/markdown-to-ast';

let ACCESS_KEY = process.env.CLOSEVECTOR_ACCESS_KEY;
let SECRET = process.env.CLOSEVECTOR_SECRET;
let CLOSEVECTOR_FILE_ID = process.env.CLOSEVECTOR_FILE_ID;

dotenv.config();
dotenv.config({
    path: path.join(__dirname, '../.env.local'),
    override: true
});

if (!ACCESS_KEY) {
    ACCESS_KEY = process.env.CLOSEVECTOR_ACCESS_KEY;
}
if (!SECRET) {
    SECRET = process.env.CLOSEVECTOR_SECRET;
}
if (!CLOSEVECTOR_FILE_ID) {
    CLOSEVECTOR_FILE_ID = process.env.CLOSEVECTOR_FILE_ID;
}

async function walk(dir: string): Promise<string[]> {
    const files = await fs.readdir(dir);

    const result: string[] = [];

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = await fs.stat(filePath);

        if (stat.isDirectory()) {
            result.push(...await walk(filePath));
        } else {
            result.push(filePath);
        }
    }

    return result;
}


(async () => {

    if (!ACCESS_KEY || !SECRET) {
        throw new Error("ACCESS_KEY or SECRET not set");
    }

    console.log("inject.ts", "ACCESS_KEY", ACCESS_KEY);

    const dirPath = path.join(__dirname, '../docs');

    const files = await walk(dirPath);
    const mdFiles = files.filter((x) => x.endsWith('.md'))

    const documents: Document[] = [];

    console.log("inject.ts", "processing", mdFiles.length, "files");

    for (const file of mdFiles) {
        const content = await fs.readFile(file, 'utf-8');

        const ast = parser.parse(content);

        const header = ast.children.find((x: any) => x.type === 'Header' && x.depth === 1);
        const description = ast.children.find((x: any) => x.type === 'Paragraph');

        const document = new Document({
            pageContent: content,
            metadata: {
                url: file.replace(dirPath, ""),
                header: header ? header.raw.replace(/#/g, "").trim() : undefined,
                description: description ? description.raw.trim() : undefined,
            }
        })
        documents.push(document);
    }

    console.log("inject.ts", "creating index");

    const vectorStore = await HNSWLib.fromDocuments(
        documents,
        new CloseVectorEmbeddings({
            key: ACCESS_KEY,
            secret: SECRET,
        })
    );

    console.log("inject.ts", "index created");
    console.log("inject.ts", "indexing documents");

    let uuid = await upsertIndex(vectorStore, {
        description: '',
        public: true,
        uuid: CLOSEVECTOR_FILE_ID,
        accessKey: ACCESS_KEY,
        secret: SECRET,
        onProgress: (e) => {
            console.log(e)
        }
    });

    console.log("uuid", uuid)

    if (!CLOSEVECTOR_FILE_ID) {
        console.log("inject.ts", "updating .env.local");
        // appending CLOSEVECTOR_FILE_ID="${uuid}" to file .env.local
        const envFilePath = path.join(__dirname, '../.env.local');
        const envFileContent = await fs.readFile(envFilePath, 'utf-8');
        const newEnvFileContent = envFileContent + `\nCLOSEVECTOR_FILE_ID="${uuid}"`;
        await fs.writeFile(envFilePath, newEnvFileContent);
    }

    console.log("inject.ts", "done");

})();

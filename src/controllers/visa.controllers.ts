import { Request, Response } from 'express';

import { ChatPromptTemplate } from '@langchain/core/prompts'
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents'
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio'
import { GEmbbeding, GModel } from '../modules/model';
import { URI_SCRAP } from '../config/config';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { createRetrievalChain } from 'langchain/chains/retrieval';

// === [ Functions Controllers ] ===
// visaController
export const visaController = async (req: Request, resp: Response) => {

    const question = req.body.question;

    if(!question) {
        resp.status(400).json({ message: 'Expected a Question from User' });
        return;
    }

    try {
        // Create Prompt and first CHAIN for Many Documents
        const prompt = ChatPromptTemplate.fromTemplate(`
            -----------------------------------------
            contesta las preguntas del usuario, responde detalladamente.
            Enlista los requisitos.
            Las respuestas deben ser en español
            -----------------------------------------
            Context: {context}
            Question: {input}
        `);

        const chain = await createStuffDocumentsChain({
            llm: GModel,
            prompt
        });
    
        // ===== CREATE Documents or EMBEDDINGS, from a LOADER: cheerios =====
        // [START]___
        // 1. Loader Docs
        const loader = new CheerioWebBaseLoader(URI_SCRAP);
        const docs = await loader.load();
        // 2. Create Splitter, create the chunks
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 2000,
            chunkOverlap: 200
        });
        const chunkDocs = await splitter.splitDocuments(docs);
        
        // 3. Create VectoStore in memory and Save
        const vectoreStore = await MemoryVectorStore.fromDocuments(
            chunkDocs, 
            GEmbbeding
        );
            
        // 4. Create the Retriver for Retrive the document info from the vectorStore
        const retriever = vectoreStore.asRetriever({ k: 10 });
        // ___[END]

        // CREATE RETRIEVER CHAIN
        const retrieverChain = await createRetrievalChain({
            retriever, 
            combineDocsChain: chain,
        });

        // INVOKE/STREAM CHAIN
        const response = await retrieverChain.stream({
            input: question
        });


        // SEND RESPONSE
        resp.header( 'Content-Type', 'application/json' );
        resp.status(200)
        for await ( const chunk of response ) {
            if(chunk.answer) resp.write(chunk.answer)
        }
        resp.end();


    } catch (error) {
        resp.status(404).json({ resp: `ERROR => ${error}` });
    }
}
# Test Langchain JS with NodeJS-TS
[LangChain](https://js.langchain.com/docs/get_started/introduction)

LangChain is a framework for developing applications powered by language models. It enables applications that:

**Are context-aware:** connect a language model to sources of context (prompt instructions, few shot examples, content to ground its response in, etc.).

**Reason:** rely on a language model to reason (about how to answer based on provided context, what actions to take, etc.)

First steps with langchaind

> You need a Google  Gemini Key

## Steeps

### npm

``
npm i
npm run dev
``

### Docker
``
docker build -t name:version .
docker run -p 3000:3000 --env-file ./.env -d name:version 
``
### Your .env file:

- Google Gemini ApiKey
- The URIto scraping


> GG_API_KEY=
>
> URI_SCRAP=

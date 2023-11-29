# Local AI Stack

Make it possible for anyone to run a simple AI app that can do document Q&A **100% locally** without having to swipe a credit card 💳. Based on [AI Starter Kit](https://github.com/a16z-infra/ai-getting-started).

<img width="600" alt="Screen Shot 2023-10-30 at 10 20 17 PM" src="https://github.com/ykhli/local-ai-stack/assets/3489963/b4a7eddb-e655-45c3-93d4-fbb26e94a96c">

Have questions? Join [AI Stack devs](https://discord.gg/TsWCNVvRP5) and find me in #local-ai-stack channel.

## Stack

- 🦙 Inference: [Ollama](https://github.com/jmorganca/ollama)
- 💻 VectorDB: [Supabase pgvector](https://supabase.com/docs/guides/database/extensions/pgvector)
- 🧠 LLM Orchestration: [Langchain.js](https://js.langchain.com/docs/)
- 🖼️ App logic: [Next.js](https://nextjs.org/)
- 🧮 Embeddings generation: [Transformer.js](https://github.com/xenova/transformers.js) and [
all-MiniLM-L6-v2](https://huggingface.co/Xenova/all-MiniLM-L6-v2)

## Quickstart

### 1. Fork and Clone repo

Fork the repo to your Github account, then run the following command to clone the repo:

```
git clone git@github.com:[YOUR_GITHUB_ACCOUNT_NAME]/local-ai-stack.git
```

### 2. Install dependencies

```
cd local-ai-stack
npm install
```

### 3. Install Ollama

Instructions are [here](https://github.com/jmorganca/ollama#macos)

### 4. Run Supabase locally

1. Install Supabase CLI

```
brew install supabase/tap/supabase
```

2. Start Supabase

Make sure you are under `/local-ai-stack` directory and run:

```
supabase start
```

### 5. Fill in secrets

```
cp .env.local.example .env.local
```

Then get `SUPABASE_PRIVATE_KEY` by running

```
supabase status
```

Copy `service_role key` and save it as `SUPABASE_PRIVATE_KEY` in `.env.local`

### 6. Generate embeddings

```bash
node src/scripts/indexBlogLocal.mjs
```

This script takes in all files from /blogs, generate embeddings using [transformers.js](https://github.com/xenova/transformers.js), and store embeddings as well as metadata in Supabase.

### 7. Run app locally

Now you are ready to test out the app locally! To do this, simply run `npm run dev` under the project root and visit `http://localhost:3000`.

### 8. Deploy the app

If you want to take the local-only app to the next level, feel free to follow instructions on [AI Starter Kit](https://github.com/a16z-infra/ai-getting-started) for using Clerk, Pinecone/Supabase, OpenAI, Replicate and other cloud-based vendors.

## Refs & Credits

- [AI SDK](https://sdk.vercel.ai/docs)
- [LangUI](https://www.langui.dev/components)
- [Tailwind CSS](https://tailwindcss.com/)
- [a16z AI starter kit](https://github.com/a16z-infra/ai-getting-started)
- https://js.langchain.com/docs/modules/indexes/vector_stores/integrations/pinecone
- https://js.langchain.com/docs/modules/models/llms/integrations#replicate
- https://js.langchain.com/docs/modules/chains/index_related_chains/retrieval_qa

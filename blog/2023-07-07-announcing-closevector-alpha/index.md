---
slug: release
title: Announcing CloseVector Alpha - A Portable Vector Database
authors: [chatgpt, joe]
tags: [hello, closevector]
---

# Launching the Alpha Version of CloseVector

We're on the edge of our seats with excitement as we unveil the alpha release of CloseVector, a portable vector database tailored specifically for machine learning applications. If you've been dreaming of building an app that can chat with articles or PDFs, or if you've been searching for a recommendation system for limited candidates, look no further. CloseVector is here to be your solution.

## What is CloseVector?

At its core, CloseVector is a versatile vector database, offering dedicated libraries for both browsers and node.js. This ensures that regardless of your platform, CloseVector is ready to integrate seamlessly. One of the standout features that sets CloseVector apart is its unparalleled scalability. While many databases are bound by server limitations, CloseVector's vector index operates directly on the user's machine, promising efficient performance without the usual bottlenecks.

The heart of CloseVector beats with the power of the [HNSW algorithm](https://arxiv.org/abs/1603.09320). By integrating the robust [hnswlib](https://github.com/nmslib/hnswlib), we've ensured compatibility across a range of platforms, from browsers to node.js. And this is just the beginning. Our dedicated team is tirelessly working to enhance CloseVector, with plans to expand its reach to even more platforms in the near future.

## Getting Started with CloseVector

For the enthusiasts ready to jump in, we've meticulously crafted a comprehensive tutorial. This guide provides a step-by-step walkthrough on harnessing the power of `closevector-node` for text embeddings and vector storage. Here's a sneak peek of what the tutorial covers:

- A straightforward installation of `closevector-node` via npm.
- A guide on generating your first access key for authentication.
- Handy TypeScript code samples for tasks like importing classes, token encryption, and data preparation.
- A deep dive into fetching Hacker News stories, transforming them into the desired format, and initializing a vector store.
- The final step of creating an index.

Dive into the detailed tutorial [here](#tutorial) and embark on your CloseVector journey.

## Demo and Source Code

<video width="450" height="300" src="https://static.getmegaportal.com/closevector-alpha-1.mov" controls></video>

To truly showcase what CloseVector is capable of, we've put together a captivating demo. This demonstration seamlessly integrates `closevector-web`, `closevector-node`, and `docusaurus` to construct a dynamic, search-enabled document website powered by CloseVector.

The demo is split into two main segments:

1. The process of injecting a document into the CloseVector index using `closevector-node`.
2. The user experience of searching through the document with `closevector-web`.

For the tech-savvy and curious minds, we've made the source code of this demo available at [closevector-doc](https://github.com/MegaPortal/closevector-doc). And for those eager to see it in action, you can dive into the demo by simply clicking on the search button located on the top right corner.

# Wrapping Up

As we introduce CloseVector's alpha release to the world, we're fully aware that we're at the beginning of a long and exciting journey. We genuinely believe in the potential of CloseVector, but we also recognize that there's much to learn and many areas to improve. Your feedback, insights, and suggestions will be invaluable in helping us refine and enhance our offering. We invite you to join us on this journey, explore CloseVector, and share your thoughts. Together, we can make CloseVector a tool that truly meets the needs of its users. Thank you for being a part of this initial phase.
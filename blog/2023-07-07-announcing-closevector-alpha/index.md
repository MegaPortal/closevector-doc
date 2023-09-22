# Introducing the Alpha Version of CloseVector

We're pleased to present the alpha release of CloseVector, a portable vector database designed with machine learning applications in mind. If you've been considering building an app that interacts with articles or PDFs, or if you're in need of a recommendation system for limited candidates, we hope CloseVector can be a potential solution for you.

## What is CloseVector?

CloseVector is fundamentally a vector database. We have made dedicated libraries available for both browsers and node.js, aiming for easy integration no matter your platform. One feature we've been working on is its potential for scalability. Instead of being bound by server limitations, CloseVector's vector index operates directly on the user's machine, aiming for more efficient performance.

The foundation of CloseVector is built on the [HNSW algorithm](https://arxiv.org/abs/1603.09320). We've integrated the [hnswlib](https://github.com/nmslib/hnswlib) to ensure compatibility across various platforms, from browsers to node.js. We're continuously looking to enhance and expand the capabilities of CloseVector.

## Starting with CloseVector

For those interested, we've put together a tutorial. This guide provides a step-by-step overview on using `closevector-node` for text embeddings and vector storage. Some of the tutorial highlights include:

- How to install `closevector-node` using npm.
- Generating your first access key for authentication.
- TypeScript code samples for various tasks.
- An overview of fetching Hacker News stories, formatting them, and initializing a vector store.
- Creating an index.

You can access the detailed tutorial [here](/docs/tutorial).

## Demo and Source Code

<video width="360" height="240" src="https://static.getmegaportal.com/closevector-alpha-1.mov" controls></video>

To provide a glimpse of CloseVector in action, we have a demo. This integrates `closevector-web`, `closevector-node`, and `docusaurus` to create a document website using CloseVector's capabilities.

The demo includes:

1. Injecting a document into the CloseVector index using `closevector-node`.
2. Experiencing the search function with `closevector-web`.

If you're keen to see the behind-the-scenes, the source code for this demo is available at [closevector-doc](https://github.com/MegaPortal/closevector-doc). You can also interact with the demo by using the search button on the top right.

# Conclusion

As we share CloseVector's alpha release, we understand that this is just the starting point. We see potential in CloseVector, but also know there's room for growth and improvement. Your feedback and suggestions will be crucial in shaping its evolution. We invite you to test out CloseVector and let us know your thoughts. With your input, we hope to better align CloseVector with user needs. Thank you for considering joining us in this phase.
---
sidebar_position: 1
---

# CloseVector Intro

A lightweight vector database for machine learning.

## Use Cases

1. Chat with Article/PDF
2. Recommendation for limited candidates
3. ...

## How It Works

See [How It Works](./how-it-works.md) for details.

## Why CloseVector

1. Easy to use: we provide both browser and nodejs library.
2. Scalable: The vector index is ran on user machine.

## Why CloseVector uses HNSW

Some people who have experience in ANN (Approximate Nearest Neighbors) search might be questioning why we use HNSW, because SQ, PQ, or even brute force can be faster than HNSW in small datasets, so we thought we'd write a quick blog post about it.

> Before delving into the main topic, let's briefly explain "SQ" and "PQ" for those unfamiliar with these terms. "PQ" refers to Product Quantization, a technique used to compress high-dimensional vectors into compact codes, which can then be used for approximate nearest neighbor search in a compressed domain. On the other hand, "SQ" refer to Scalar Quantization, which involves representing high-dimensional vectors using a lower-dimensional space, also aiming to facilitate efficient similarity search.

Yes, at different data scales, the HNSW algorithm might not be the optimal solution. The core value of CloseVector is not to achieve the optimal solution in computational performance at different scales, but to provide a set of solutions for running a vector database locally. This kind of solution might be suitable for scenarios that are data-sensitive and require relatively strong scalability (CloseVector relies only on local storage or CDN storage). These scenarios might not necessarily require the participation of a server-side vector database, for instance, when you need to index all local images, or index all local documents, as long as the local device can accept the running, storage, and transmission costs.

As for why CloseVector chooses HNSW, it is because firstly, HNSW performs acceptably at different data scales; and secondly, the HNSW algorithm is simple enough and there are mature open-source libraries available, which can conveniently support subsequent versions of CloseVector in languages like Python, Swift, Kotlin, etc.

In scenarios with smaller scales, the performance of HNSW should not have a noticeable impact within the user-perceptible range. If CloseVector needs to optimize operational efficiency in the future, it can optimize the serialization structure and then adopt different algorithms at different scales.
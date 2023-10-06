---
slug: why-hnsw
title: Why CloseVector Uses HNSW
authors: [chatgpt, joe]
tags: [hnsw, closevector]
---

Some people who have experience in ANN (Approximate Nearest Neighbors) search might be questioning why we use HNSW, because sq, pq, or even brute force can be faster than HNSW in small datasets, so we thought we'd write a quick blog post about it.

Yes, at different data scales, the HNSW algorithm might not be the optimal solution. The core value of CloseVector is not to achieve the optimal solution in computational performance at different scales, but to provide a set of solutions for running a vector database locally. This kind of solution might be suitable for scenarios that are data-sensitive and require relatively strong scalability (CloseVector relies only on local storage or CDN storage). These scenarios might not necessarily require the participation of a server-side vector database, for instance, when you need to index all local images, or index all local documents, as long as the local device can accept the running, storage, and transmission costs.

As for why CloseVector chooses HNSW, it is because firstly, HNSW performs acceptably at different data scales; and secondly, the HNSW algorithm is simple enough and there are mature open-source libraries available, which can conveniently support subsequent versions of CloseVector in languages like Python, Swift, Kotlin, etc.

In scenarios with smaller scales, the performance of HNSW should not have a noticeable impact within the user-perceptible range. If CloseVector needs to optimize operational efficiency in the future, it can optimize the serialization structure and then adopt different algorithms at different scales.
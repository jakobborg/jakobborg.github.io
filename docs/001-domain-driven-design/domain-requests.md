---
title: Domain Requests
tags:
- ddd
- parameter object
---

How to use Parameter Objects to maintain entity consistency.

:::caution draft
This is an unfinished draft.
:::

*Always valid* and *eventually valid* are two concepts used to describe different approaches to handling the consistency of domain entities.

"Always valid" means that the domain entities are always in a consistent state and that any changes made to them are validated immediately. This approach is suitable for domains where consistency is critical, and there is little tolerance for errors or invalid states. With this approach, the domain entities are designed to prevent any invalid state transitions, and the business rules are enforced rigorously.

On the other hand, "eventually valid" means that the domain entities can be temporarily in an invalid state while changes are being made to them, and the validation is deferred until some later point in time. This approach is suitable for domains where the cost of enforcing immediate consistency is too high, and the risk of inconsistency is acceptable. With this approach, the domain entities are designed to handle temporary inconsistencies and ensure that they can be resolved in a timely manner.

In summary, "always valid" prioritizes consistency at all times, while "eventually valid" prioritizes efficiency and accepts temporary inconsistencies. The choice between the two approaches depends on the requirements of the domain and the trade-offs between consistency and efficiency.
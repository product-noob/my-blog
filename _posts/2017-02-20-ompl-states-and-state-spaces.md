---
published: false
title: States and State Space
author_profile: true
mathjax: true
categories:
  - Motion Planning
tags:
  - OMPL
  - Algorithm
---


To use ompl state, a state space need to be defined first.   

Use one of the three methods below

```
ompl::base::StateSpacePtr space(new T());
1.
ompl::base::ScopedState<> state(space);
2.
ompl::base::SpaceInformationPtr si(space);
ompl::base::ScopedState<T> state(si);
3.
ompl::base::StateInformationPtr si(space);
ompl::base::State* state = si->allocState();  // without using ScopedState cast
...
si->freeState(state);  
```

to define the specific space like $$SE(2)$$ or $$SE(3)$$.

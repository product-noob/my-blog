---
title: "HMPL"
permalink: /hmpl_project/
layout: splash
classes: wide
excerpt: "hybrid motion planning library for autonomous driving."
header:
  overlay_color: "#000"
  overlay_filter: "0.2"
  overlay_image: ./assets/images/ground_s.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  #cta_label: "More Info"
  #cta_url: "https://unsplash.com"


feature_row:
  - url: /assets/images/planner_s.jpg
    #btn_label: "Read More"
    #btn_class: "btn--primary"
    #title: "Motion Planning Problem."
    excerpt: Motion Planning Problems.
    image_path: /assets/images/planner_s.jpg
solutions:
  - url: /assets/images/planner_s.jpg
    image_path: /assets/images/planner_s.jpg
    alt: "Motion Planning Problems."
  - url: /assets/images/failures.jpg
    image_path: /assets/images/failures.jpg
    excerpt: Motion Planning Problems.
    alt: "Failures of existing methods."

challenges:
  - url: /assets/images/hmpl/hmpl_without_obs.png
    image_path: /assets/images/hmpl/hmpl_without_obs.png
  - url: /assets/images/hmpl/hmpl_with_obs.jpg
    image_path: /assets/images/hmpl/hmpl_with_obs.jpg
scenes:
    - url: /assets/images/hmpl/scene1.png
      image_path: /assets/images/hmpl/scene1.png
    - url: /assets/images/hmpl/scene2.png
      image_path: /assets/images/hmpl/scene2.png
    - url: /assets/images/hmpl/scene3.png
      image_path: /assets/images/hmpl/scene3.png
    #alt: "Motion Planning Problems"
  #- url: /assets/images/unsplash-gallery-image-2.jpg
  #  image_path: assets/images/unsplash-gallery-image-2-th.jpg
  #  alt: "placeholder image 2"
  #- url: /assets/images/unsplash-gallery-image-3.jpg
  #  image_path: assets/images/unsplash-gallery-image-3-th.jpg
  #  alt: "placeholder image 3"
  # {% include gallery id="gallery1" caption="Motion Planning Problems." %}

---


All the projects I get involved in are highly related to autonomous driving or autonomous systems.
{: .notice--info}


## Hybrid Motion Planning Library Development
### Highlights Video
If you are visiting my website from China, you probably cannot see the video since all my videos are hosted on [vimeo](https://en.wikipedia.org/wiki/Vimeo).
{: .notice--danger}
{% include video id="257666203" provider="vimeo" %}

{% include toc %}


### **Background:**
<figure style="width: 450px" class="align-left">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/planner_s.jpg" alt="">
  <figcaption>Motion Planning Problems.</figcaption>
</figure>
In general, a trajectory planning problem refers to finding an optimal path with time stamped positions, orientations, and velocities from the current configuration to the goal configuration by minimizing certain objectives subject to geometry constraints (feasible paths must lie in the free space), task constraints (requirements to visit certain intermediate targets), and nonholonomic constraints (vehicle kinematics and dynamics).  This kind of problem is known to be PSPACE-hard, which means there is no polynomial-time algorithm able to solve all instances of the problem {% cite reif1979complexity paden2016survey --file hmpl %}. The compounding effect of geometry, task and and nonholonomic constraints (differential constraints) increases the difficulty of developing practical trajectory planning algorithms that directly solve the complete trajectory planning problem {% cite barraquand1989nonholonomic li2015simultaneous --file hmpl %}.

### **Our solution**
In order to solve the motion planning problem in real time for autonomous driving, we propose a hybrid trajectory planning algorithm by combining the strengths of different methods. We assume the drivable region and the global path, which may be or may not be collision-free, are provided. As an optimization problem with both nonholonomic and geometry constraints is PSPACE-hard {% cite reif1979complexity paden2016survey --file hmpl %}, the trajectory planning problem is decomposed into spatial path planning and speed planning sub-problems. The spatial path planning problem is further decomposed to a global path modification layer within the given drivable region and a multi-phase state space sampling planner layer. The speed planning sub-problem is solved by an optimization-based speed planning layer along the fixed path. In this way, the combinatorial constraints of the motion planning problems are separated, which is convenient to address different constraints by taking advantages of different methods. Besides, the decomposition makes the planner be able to limit the search space by leveraging the constraint information while still maintaining richness of the feasible solution space in different layers.
<figure style="width: 600px" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/framework_hmpl.jpg" alt="">
  <figcaption>Hybrid motion planning framework.</figcaption>
</figure>
### **Highlights**
We
* Present a novel and efficient trajectory planning framework that is able to handle geometry constraints, nonholonomic constraints and dynamics constraints of cars in a human-like and layered fashion and generate curvature-continuous, kinodynamically feasible, smooth and collision-free trajectories in real-time.
* Develop a derivative-free global path modification algorithm to extract high-order state information in free space for state sampling.
* Extend the regular state space sampling method widely used in on-road autonomous driving systems to a multi-phase deterministic state space sampling method that is able to approximate complex maneuvers.
* Improve collision checking accuracy and efficiency by using a different car footprint approximation strategy and a two-phase collision checking routine.

### **Featured Results**
A range of challenging simulation experiments show that the proposed method returns high quality trajectories in real-time and outperforms existing planners such as hybrid A*, conjugate-gradient descent path smoother in terms of path quality, efficiency and computation resources used. Please see our paper {% cite zhang2018hmpl --file hmpl %} for details.

#### Featured Scenarios

{% include gallery id="challenges" %}

#### Other Scenarios
{% include gallery id="scenes" %}


### References

{% bibliography --file hmpl --cited_in_order %}

---
title: "Convex-optimization-based Speed Planning"
permalink: /speed_project/
layout: splash
classes: wide
excerpt: "for autonomous drving in both static and dynamic environments."
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
    - url: /assets/images/speed_planning/jaywalking.png
      image_path: /assets/images/speed_planning/jaywalking.png
    - url: /assets/images/speed_planning/merging.png
      image_path: /assets/images/speed_planning/merging.png

    #alt: "Motion Planning Problems"
  #- url: /assets/images/unsplash-gallery-image-2.jpg
  #  image_path: assets/images/unsplash-gallery-image-2-th.jpg
  #  alt: "placeholder image 2"
  #- url: /assets/images/unsplash-gallery-image-3.jpg
  #  image_path: assets/images/unsplash-gallery-image-3-th.jpg
  #  alt: "placeholder image 3"
  # {% include gallery id="gallery1" caption="Motion Planning Problems." %}

---
Coming soon!

## Speed Planning for Autonomous Driving in Static and Dynamic Environments

### Background
Speed planning plays an important role in guaranteeing the ride comfort and safety in autonomous driving applications. All different kind of scenarios together raises distinct requirements and consequently different constraint types for speed planning problem formulations, which makes it challenging to solve.

{% include gallery id="scenes" %}

  <figure style="width: 500px" class="align-center">
    <img src="{{ site.url }}{{ site.baseurl }}/assets/images/speed_planning/cross.png" alt="">
    <figcaption></figcaption>
  </figure>

We analyze the requirements of various driving scenarios for speed planning along the fixed path, summarize, and categorize constraints need to be addressed by speed planners as follows:
<figure style="width: 1000px" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/speed_planning/constraint_type.png" alt="">
  <figcaption></figcaption>
</figure>

We describe reasons why every constraint is needed to address speed planning problems in detail in our paper {% cite zhang2018speed yzhang2018speed --file speed %}. We view these constraints as requirements for speed planner design and metrics to measure the capacity of the existing speed planners for autonomous driving.

In light of this, we review the state-of-the-art speed planning methods and compare them with others in terms of constraints coverage, optimality, safety, flexibility, and capacity without revealing details, as seen in Table 2. Most of the existing methods just provided a workable speed profile rather than an optimal one for autonomous driving.  None of them covered all the constraints we list in the Table 1.
<figure style="width: 1000px" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/speed_planning/capacity.png" alt="">
  <figcaption></figcaption>
</figure>

### Our Solution and Highlights

By taking some additional steps beyond the seminal work done by {% cite verscheure2009time  lipp2014minimum --file speed %}, we present a general speed planning framework specifically for autonomous driving that is able to handle a wide range of different scenarios using convex optimization subject to a large collection of relevant constraints. Our contributions are as follows:
*  We summarize the most common constraints raised in various autonomous driving scenarios as the ***requirements*** for speed planner design and ***metrics*** to measure the capacity of the existing speed planners roughly for autonomous driving. We clarify which constraints need to be addressed by speed planners to guarantee safety in general.

* We present a more general, flexible and complete speed planning mathematical model including ***friction circle*** , ***dynamics***, ***smoothness***, ***time efficiency***, ***time window***, ***ride comfort***, ***IoD***, ***path and boundary conditions*** constraints compared to similar methods explained in {% cite lipp2014minimum Liu2017 --file speed %}. We addressed the limitations of the method of Lipp *et al.* {% cite lipp2014minimum --file speed %} by introducing a ***pseudo jerk*** objective in longitudinal dimension to improve smoothness, adding time window constraints at certain point of the path to avoid dynamics obstacles, capping a path constraint (most-likely non-smooth) on speed decision variables to deal with task constraints like speed limits, imposing a boundary condition at the end point of the path to guarantee safety for precise stop or merging scenarios. Compared to the approach of Liu *et al.* {% cite Liu2017 --file speed %}, our formulation optimizes the time efficiency directly while still staying inside of the friction circle, which ensures our method exploits the full acceleration capacity of the vehicle when necessary.  

*  We introduce a semi-hard constraint concept to describe unique characters of the ***comfort box constraints*** and implement this kind of constraints using slack variables and penalty functions, which emphasizes comfort while guaranteeing fundamental motion safety without sacrificing the mobility of cars.  To the best of our knowledge, none of the existing methods handle these constraints like ours. In contrast, Refs {% cite li2016real gu2013focused gu2015tunable gu2017improved Liu2017  --file speed %} regarded *comfort box constraints* as hard constraints, which dramatically reduces the solution space and in consequence limits the mobility of cars.

*  We demonstrate that our problem still preserves convexity with the added constraints, and hence, that the global optimality is guaranteed.  This means our problem can be solved using state-of-the-art convex optimization solvers efficiently as well.  We also provide some evidence to prove that our solution is able to keep consistent when the boundary conditions encounter some disturbances, which means only the part of results needed to be adjusted will be regulated due to the global optimality. This may benefit the track performance of speed controllers by providing a relative stable reference.  It is not the case for these methods that solve the speed planning problem using local optimization techniques like {% cite Liu2017 --file speed %}. A small change of boundary conditions or initial guess may result in a totally different solution due to local minimas in their problem.

*  We showcase how our formulation can be used in various autonomous driving scenarios by providing several challenging case studies solved in our framework, such as safe stop on a curvy road with different entry speeds, dealing with jaywalking in two different ways and merging from a freeway entrance ramp to expressways with safety guaranteed.



### Abilities of Our Method
* maintain the smoothness of the speed profile  
* driving within the limits of the friction cricle
* achieve the time efficiency
* cap a user-defined path constraint on the speed profile
* control the arrival time at a certain point on the path (time window)
* determine the end boundary condition of the state
* align well with the user-defined speed profile while maintian smoothness and safety
* dynamic obstacle avoidance
* precise safe stop


### Featured Results

<figure style="width: 1000px" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/speed_planning/smoothness.png" alt="">
  <figcaption></figcaption>
</figure>

<figure style="width: 1000px" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/speed_planning/boundary_condition.png" alt="">
  <figcaption></figcaption>
</figure>
<figure style="width: 1000px" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/speed_planning/path_constraint.png" alt="">
  <figcaption></figcaption>
</figure>

<figure style="width: 1000px" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/speed_planning/task_constraint.png" alt="">
  <figcaption></figcaption>
</figure>

<figure style="width: 800px" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/speed_planning/semi_hard.png" alt="">
  <figcaption></figcaption>
</figure>

<figure style="width: 1000px" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/speed_planning/result_jay.png" alt="">
  <figcaption></figcaption>
</figure>


### References

{% bibliography --file speed --cited_in_order %}

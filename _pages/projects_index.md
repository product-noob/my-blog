---
title: "Projects"
layout: splash
permalink: /projects_index/
classes: wide
excerpt: "about autonomous driving and autonomous systems."
header:
  overlay_color: "#000"
  overlay_filter: "0.2"
  overlay_image: ./assets/images/ground_s.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"

feature_hmpl:
  - image_path: /assets/images/planner_s.jpg
    alt: "placeholder image 2"
    title: "Hybrid Motion Planning for Autonomous Driving"
    excerpt: 'HMPL is a real-time C++ motion planning library for autonomous driving that is able to handle task constraints, geometry constraints, nonholonomic constraints and dynamics constraints of cars in a human-like and layered fasion.'
    url: "/hmpl_project"
    btn_label: "Read More"
    btn_class: "btn--primary"

feature_convexspeed:
    - image_path: /assets/images/speed_planning.png
      alt: "placeholder image 2"
      title: "Convex-optimization-based Speed Planning for Autonomous Driving"
      excerpt: 'Speed planning plays an important role in guaranteeing the ride comfort and safety in autonomous driving applications. To address this problem, we develop a **complete**, **flexible**, **safe**, and **globally-optimal** convex-optimization-based method to solve speed planning problems over a fixed path for autonomous driving in both static and dynamic environments.'
      url: "/speed_project"
      btn_label: "Read More"
      btn_class: "btn--primary"

feature_autonomoose:
  - image_path: /assets/images/autonomoose.jpg
    alt: "placeholder image 2"
    title: "Autonomoose"
    excerpt: 'Autonomous driving towards the ultimately level 4 autonomy with the **Autonomoose** platform in all-weather conditions that are specific to Canada in University of Waterloo. This project has attracted several industrial partners such as RENESAS, DENSO, QNX and Huawei.'
    url: "/autonomoose_project"
    btn_label: "Read More"
    btn_class: "btn--primary"

feature_skyline:
  - image_path: /assets/images/skyline.jpg
    alt: "placeholder image 2"
    title: "Skyline CES 2017"
    excerpt: 'The Skyline CES (Consumer Electronics Show) 2017 is a demo project to show the functional safety of autonomous driving systems with collaboration of RENESAS, [Autonomoose team in UW](https://www.autonomoose.net/team), QNX, POLYSYNC, AutonomouStuff, and eTRANS.'
    url: "/skyline_project"
    btn_label: "Read More"
    btn_class: "btn--primary"

feature_row:
  - image_path: /assets/images/titian.jpg
    alt: "placeholder image 1"
    title: "Unmanned Ground Vehicle Challenge 2014"
    excerpt: "We won the second place in **'Kua Yue Xian Zu'** Unmannded Ground Vehicle Challenge 2014."
  - image_path: /assets/images/byd_ray.jpg
    alt: "placeholder image 2"
    title: "China Intelligent Vehicle Future Challenge 2013"
    excerpt: "We won the championship in China Intelligent Vehicle Challenge 2013."
    #url: "/projects_index"
    #btn_label: "Read More"
    #btn_class: "btn--primary"
  - image_path: /assets/images/summary.jpg
    title: "Previous Projects Portfolio"
    excerpt: "Past projects related to autonomous systems that I get involved in. Please find the brief introductions [on my old website](https://sites.google.com/site/yuzhangmiracle/conferences)."

feature_simulation:
    - image_path: /assets/images/simulation/vrep_simulator.png
      alt: "placeholder image 2"
      title: "Lightweight and Flexible Simulation Toolset for Autonomous Driving."
      excerpt: 'A summary of my simulation work for supporting the development of motion planning algorithms.'
      url: "/simulation_project"
      btn_label: "Read More"
      btn_class: "btn--primary"
---

## Selected Projects

{% include feature_row id="feature_simulation" type="right" %}

{% include feature_row id="feature_hmpl" type="left" %}

{% include feature_row id="feature_convexspeed" type="right" %}

## Previous Projects

{% include feature_row id="feature_autonomoose" type="left" %}

{% include feature_row id="feature_skyline" type="right" %}

{% include feature_row %}

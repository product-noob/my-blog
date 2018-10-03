---
published: false
title: Several Ways of Writing a ROS Node
classes: wide
categories:
  - Tools
tags:
  - ROS
  - Programming
---

The design of nodes varies according to the requirements of different applications. Selecting the right node pattern is pretty important for achieving certain goals.
Here we mainly involve `ros::spin()`, `ros::spinOnce()`, `timer`, `single-thread node` and `multi-thread node` and `nodelet` topics.

The [ROS tutorials](http://wiki.ros.org/ROS/Tutorials/WritingPublisherSubscriber%28c%2B%2B%29) explain how to write a simple publisher and subscriber, which also demonstrate the usage of `ros::spinOnce()` and `ros::spin()` respectively. Note that if you write a node the same as the example from the tutorials, don't omit `spinOnce()` or `spin()`, or you can't trigger the callback functions of subscribers and timers. All the callbacks won't be executed until the `spinOnce()` or `spin()` is called. These two `spins` are slightly different.

`ros::spinOnce()` ask ROS to execute all the pending callbacks of subcribers and timers once, then return control back to us. You can keep doing your work.
```c++
ros::spinOnce() // ask ROS to handle callbacks  
doYourWork()    // this line will be executed
```

`ros::spin()` is like a button without going back, which means asking ROS to wait for and execute callbacks until the node shuts down. You fully give control to ROS.
```c++
ros::spin()  // ask ROS to handle callbacks
youWantToDoYourWork()  // this line will never be executed.
```

Roughly speeking, `ros::spin()` is equivalent to the loop below:
```c++
while(ros::ok()) {
  ros::spinOnce();
}
```


## Single Thread Node
### `ros::spin()` vs `ros::spinOnce()`

### Normal Nodes and Modular Nodes

## Multi-thread Node
### `MultiThreadedSpinner` vs `AsyncSpinner`


## Nodelet

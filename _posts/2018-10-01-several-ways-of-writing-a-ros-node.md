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

The [ROS tutorials](http://wiki.ros.org/ROS/Tutorials/WritingPublisherSubscriber%28c%2B%2B%29) explain how to write a simple publisher and subscriber clearly, which also demonstrate the usage of `ros::spinOnce()` and `ros::spin()` respectively. Note that if you write a node the same as the example from the tutorials, don't omit `spinOnce()` or `spin()`, or you can't trigger the callback functions of subscribers and timers. When nodes receive messages via topics or service, they do not process them immediately. All the callbacks are on-hold in a line until the `spinOnce()` or `spin()` is called. These two `spins` are slightly different.

`ros::spinOnce()` ask ROS to execute all the pending callbacks of subscribers and timers once, then return control back to us. You can keep doing your work.
```c++
ros::spinOnce() // ask ROS to handle callbacks  
doYourWork()    // this line will be executed
```

`ros::spin()` is like a button without going back, which means asking ROS to wait for and execute callbacks until the node shuts down. You fully give control to ROS.
```c++
ros::spin()  // ask ROS to handle callbacks
youWantToDoYourWork()  // this line will never be executed.
```

Roughly speaking, `ros::spin()` is equivalent to the loop below:
```c++
while(ros::ok()) {
  ros::spinOnce();
}
```
Thus, `spinOnce()` gives you more control on when to process callbacks. You need to be aware of and control the time between two `spinOnce()` by yourself and don't let the callbacks be activated too late.  This is how publisher in tutorial use `spinOnce()` with `ros::rate.sleep` for repetitive work. In the simple subscriber, you don't need to process information periodically, only callbacks need to be handled. For this case, `ros::spin()` is enough.

But this doesn't mean you can't do periodic work by using `ros::spin()`. By combining `ros::spin()` with timers, you can also achieve the same result as following codes:
```c++
ros::Rate loop_rate(10);
while(ros::ok()) {
  doYourWork();
  ros::spinOnce();
  loop_rate.sleep()
}
```
Timers are(have) callbacks as well, right?

The way the [ROS tutorials](http://wiki.ros.org/ROS/Tutorials/WritingPublisherSubscriber%28c%2B%2B%29) that write a node is clear and simple. But we want more -- a more modular, clear, organized node structure.  

Here is the class node pattern I prefer in practice:
![nodeclass](/assets/images/nodeclass.png)

In `construtor` you can pass in the ros node handle and private handle. You can define subscribers, publishers, timers, update parameters from servers, and bind the callbacks in `init()` functions, do periodic work in `timerCallback()` (for exmaple, publish a message  in a fixed rate the same as in the while loop), buffer or update incoming information in `subscriberCallback()`. Then instantiate a node as blow:
```c++
#include "node_class.hpp"
#include <string>

int main(int argc, char** argv) {
    std::string node_name = "simple_class_node";
    ros::init(argc, argv, node_name);
    ros::NodeHandle nh("");
    ros::NodeHandle nh_private("~");
    NodeClass node(nh, nh_private);
    ROS_INFO("Initialized a single-thread class node.");
    ros::spin();
}
```
Seems clean and elegant, right?

Although we encourage doing information updating or buffering in the `subscriberCallback()` and leaving computation-intensive work to the main loop or `timerCallback()`, you may have to do some heavy work that takes time in the callbacks on occasion. If you expect to publish a message in 10hz in the periodic loop while the `subscriberCallback()` blocks for 200ms, your publishing rate is going to drop to 5hz for sure.  
This is caused by the single thread mode we use in the simple ros node with `ros::spin()` or `ros::spinOnce()`. The main loop and all the callbacks are running in a single thread in sequence. The publishing rate will be determined by the summation of time consumed by callbacks.

I provide such examples using both `spinOnce()` and `spin()` with above class node pattern in the [demo](https://github.com/yuzhangbit/ros_node_pattern/tree/master/demo) package of [ros_node_pattern](https://github.com/yuzhangbit/ros_node_pattern) repo.

* [`spinOnce()` with a while loop implementation](https://github.com/yuzhangbit/ros_node_pattern/blob/master/demo/src/simple_node.cpp)
* [`spin()` with a timer in the node class implementaion](https://github.com/yuzhangbit/ros_node_pattern/blob/master/demo/src/single_thread_node_instance.cpp)

Both periodic loops are set to 10hz. Three subscribers are defined to subscribing to the same topic. Each subscriber callback will block the program for 200ms. Then the publishing rate becomes to 1.666hz instead of 10hz.

Below are steps to recreate this result.
1. clone the repo to your `catkin_ws/src`
2. `catkin build`
3. `roscore`
4. `rosrun demo simple_node` or `rosrun demo single_thread_node_instance` in another terminal.
5. Check the publishing rate
  ```
  rostopic hz /publisher
  ```
  You should get 10hz roughly.
6. Now trigger the subscriber callbacks with a simple python publisher in [demo/scripts/sender.py](https://github.com/yuzhangbit/ros_node_pattern/blob/master/demo/scripts/sender.py).
  ```
  python sender.py
  ```
7. Now check the publishing rate again.
  ```
  rostopic hz /publisher
  ```
  You should get 1.66hz roughly. You can also check the thread ID in the console as well.
















## Single Thread Node
### `ros::spin()` vs `ros::spinOnce()`

### Normal Nodes and Modular Nodes

## Multi-thread Node
### `MultiThreadedSpinner` vs `AsyncSpinner`


## Nodelet

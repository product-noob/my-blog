---
published: true
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


## Single-thread Node

### ros::spinOnce vs ros::spin

The [ROS tutorials](http://wiki.ros.org/ROS/Tutorials/WritingPublisherSubscriber%28c%2B%2B%29) explain how to write a simple publisher and subscriber clearly, which also demonstrate the usage of `ros::spinOnce()` and `ros::spin()` respectively. Note that if you write a node the same as the example from the tutorials, don't omit `spinOnce()` or `spin()`, or you can't trigger the callback functions of subscribers and timers. When nodes receive messages via topics or service, they do not process them immediately. All the callbacks are on-hold in a line until the `spinOnce()` or `spin()` is called. These two `spins` are slightly different.

`ros::spinOnce()` asks ROS to execute all the pending callbacks of subscribers and timers once, then return control back to us. You can keep doing your work.
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

### Class Node Pattern
The way that the [ROS tutorials](http://wiki.ros.org/ROS/Tutorials/WritingPublisherSubscriber%28c%2B%2B%29) write a node (I call it **simple node pattern**) is clear and simple. But we want more -- a more modular, clear, organized node structure.  

Here is the **class node pattern** I prefer in practice:
![nodeclass](/assets/images/nodeclass.png)
You can find the example node class codes in [`demo/include/simple_node_class.hpp`](https://github.com/yuzhangbit/ros_node_pattern/blob/master/demo/include/simple_node_class.hpp) and [`demo/src/simple_node_class.cpp`](https://github.com/yuzhangbit/ros_node_pattern/blob/master/demo/src/simple_node_class.cpp) in [ros_node_pattern](https://github.com/yuzhangbit/ros_node_pattern).

In `construtor` you can pass in the ros node handle and private handle. You can define subscribers, publishers, timers, update parameters from servers, and bind the callbacks in `init()` functions, do periodic work in `timerCallback()` (for exmaple, publish a message  in a fixed rate the same as in the while loop), buffer or update incoming information in `subscriberCallback()`. Then instantiate a node using the class as blow:
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
Seems readable, clean and elegant!



Although we encourage only updating or buffering information in the `subscriberCallback()` and leaving computation-intensive work to the main loop or `timerCallback()`, someone may do some heavy work that takes time in the callbacks on occasion. If you expect to publish a message in 10hz in the periodic loop while the `subscriberCallback()` blocks for 200ms, your publishing rate is going to drop to 5hz for sure.  
This is caused by the single thread mode we use in the simple ros node with `ros::spin()` or `ros::spinOnce()`. The main loop and all the callbacks are running in a single thread in sequence. The publishing rate will be determined by the summation of time consumed by all the callbacks if the main loop rate is higher.

I provide such examples using both `spinOnce()` and `spin()` with above class node pattern in the [demo](https://github.com/yuzhangbit/ros_node_pattern/tree/master/demo) package of [ros_node_pattern](https://github.com/yuzhangbit/ros_node_pattern) repo.

* [simple_node]((https://github.com/yuzhangbit/ros_node_pattern/blob/master/demo/src/simple_node.cpp): `spinOnce()` with a while loop implementation, **simple node pattern**
* [single_thread_node_instance](https://github.com/yuzhangbit/ros_node_pattern/blob/master/demo/src/single_thread_node_instance.cpp): `spin()` with a timer in the node class implementaion, **class node pattern**

Both periodic loops are set to 10hz. Three subscribers are defined to subscribing to the same topic. Each subscriber callback will block the program for 200ms. Then the publishing rate becomes 1.666hz(1/(0.2 + 0.2 + 0.2)hz) instead of 10hz.

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
  You should get 1.666hz roughly. You can also check the thread ID in the console as well.

This toy example explain why we should only update information in subscriber callback functions rather than perform algorithm processing in callbacks of a single-thread ROS node.


## Multi-thread Node
The limitation of single-thread node is pretty obvious. What if I have to spend some time in the subscriber callback functions? What if I want to have two timers in different spinning rate? The solution really comes down to the multi-thread version of ROS node.


### MultiThreadedSpinner vs AsyncSpinner
We can easily implement the multi-thread ros node using the same node class even without modifications when instantiating the node class with `MultiThreadedSpinner` or `AsyncSpinner` as below.

* MultiThreadedSpinner version in [demo/src/multi_thread_node_instance.cpp](https://github.com/yuzhangbit/ros_node_pattern/blob/master/demo/src/multi_thread_node_instance.cpp)
  ```c++
  #include "node_class.hpp"
  #include <string>

  int main(int argc, char** argv) {
    std::string node_name = "simple_class_node";
    ros::init(argc, argv, node_name);
    ros::NodeHandle nh("");
    ros::NodeHandle nh_private("~");
    NodeClass node(nh, nh_private);
    ROS_INFO("Initialized a multi-thread node.");
    ros::MultiThreadedSpinner s(4);   // Use 4 threads
    ROS_INFO_STREAM("Main loop in thread:" << boost::this_thread::get_id());
    ros::spin(s);
  }
  ```
* AsyncSpinner version in [demo/src/async_multi_thread_node_instance.cpp](https://github.com/yuzhangbit/ros_node_pattern/blob/master/demo/src/async_multi_thread_node_instance.cpp)
  ```c++
  #include "node_class.hpp"
  #include <string>

  int main(int argc, char** argv) {
    std::string node_name = "simple_class_node";
    ros::init(argc, argv, node_name);
    ros::NodeHandle nh("");
    ros::NodeHandle nh_private("~");
    NodeClass node(nh, nh_private);
    ROS_INFO("Initialized an async multi-thread node.");
    ros::AsyncSpinner s(4);  // Use 4 threads
    ROS_INFO_STREAM("Main loop in thread:" << boost::this_thread::get_id());
    s.start();
    ros::waitForShutdown();
  }
  ```

Both versions are multi-thread ros nodes. Now every callbacks get a thread to use. Here are differences of `MultiThreadedSpinner` and `AsyncSpinner` explained by [roscpp/Overview/Callbacks and Spinning](http://wiki.ros.org/roscpp/Overview/Callbacks%20and%20Spinning).
> **MultiThreadedSpinner** is a blocking spinner, similar to ros::spin(). You can specify a number of threads in its constructor, but if unspecified (or set to 0), it will use a thread for each CPU core.

> A more useful threaded spinner is the **AsyncSpinner**. Instead of a blocking spin() call, it has start() and stop() calls, and will automatically stop when it is destroyed.

`AsyncSpinner` provides more control to users than `MultiThreadedSpinner`, which is similar to `spinOnce()`. If you want to update the data of the node, you may need to put a mutex in your callback function. Another thing you need to note is that you need `ros::waitForShutdown()` after the spinner.start() for `AsyncSpinner`, or the ros node will only spin once.

To prove that the multi-thread versions are working, you can repeat steps above by replacing step 4 with `rosrun demo multi_thread_node_instance` or `rosrun demo async_multi_thread_node_instance`.

You will get 10hz in step 5 and step 7. You can also the check the thread ID of every callback function or main loop.

## Nodelet Node Pattern
To be done.

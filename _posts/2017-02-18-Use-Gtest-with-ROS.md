---
published: true
title: Use Gtest with ROS
classes: wide
categories:
  - Tools
tags:
  - ROS
  - Programming
---

There are several interesting tips you need to know about catkin tools

### Configuration for catkin workspace using caktin Tools
* enable `-Wall -Wextra` of the compiler to report potential coding bugs
* enable robust cleaning of individual packages with `linked` layout , actually this is a default value of catkin_tools

The configuration is below:  
```
catkin config --cmake-args -DCMAKE_CXX_FLAGS="-Wall -Wextra" -DCMAKE_BUILD_TYPE=Release  
catkin config --link-devel
```

Build ros gtests using catkin_tools:  
```
catkin build --make-args tests
```


### Using gtest in sub-directory of ros packages.

#### Install the dependency first

```bash
sudo apt-get install libgtest-dev
```

#### The CMakeLists.txt codes in CMakeLists
The the cmakelists structure should be   

```cmake
ros_package    
  -launch      
  -cfg     
  -cmake      
  -include     
  -src     
  -external_lib     
    -include     
    -src     
    -doc     
    -cmake     
    -tests (libraries tests)     
      -CMakeLists.txt(test cmakelists)     
    -CMakeLists.txt (libraries CMakeLists files)     
  -test (ros tests)       
  -CMakeLists.txt(top level CMakeLists)      
```


The test CMakeLists should be

```cmake
catkin_add_gtest(test_name test1.cpp test2.cpp)  
target_link_libraries(test_name ${catkin_LIBRARIES})  
```

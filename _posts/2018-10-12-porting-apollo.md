---
published: true
title: Using Apollo Algorithms within Your Normal ROS Module  
classes: wide
categories:
  - Tools
tags:
  - Apollo
  - ROS
  - Programming
---


This blog will introduce how to convert an apollo module to a normal ROS package and use Apollo algorithms in your own ros package on a native linux system (i.e. ubuntu 16.04 LTS) instead of docker environments.

The tested codes are based on the release [apollo-v3.0.0](https://github.com/ApolloAuto/apollo/releases).

The goal of this project is to convert bazel project to a cmake project while without modifying the algorithm part of source codes in apollo and keeping the directory structure unchanged. But the include directories in the sources somehow need to be adapted according to the structure of cmake projects. I am not going the split the header files and source files of apollo like a typical cmake
projects. I prefer keeping as it was to avoid copying files and moving directories. The rational behind this is that in this way I can easily checkout the contents of the module folder of apollo and throw the existing `CMakeLists.txt` and `package.xml` to the updated codes and get a new working version with minimum effort.
So the `include` directory won't exist in every ROS package folder. But you can still include project header files like other normal ROS packages assuming the headers are there.

## Structure of the Repo
```bash
port_apollo
├── LICENSE
├── README.md
├── scripts
│   ├── build_pkg.sh  # handy build script for ros workspace
│   ├── docker_build_image.sh # docker image for CI, you can use it locally as well
│   ├── docker_compile_pkgs.sh # repo-build script in docker container
│   ├── Dockerfile   # base docker file to build a image: ubuntu 16.04 + ros kinetics
│   ├── docker_install_dependencies.sh # install dependencies in the docker container
│   ├── docker_run.sh  # run the docker for the CI test
│   ├── installer  # dependencies install scripts go here
│   └── tools  # tools scripts
└── src
    ├── catkin_simple  # dependencies ros package
    ├── glog_catkin  # dependencies ros package
    ├── cmake  # cmake modules for FindProtobuf.cmake
    ├── common  # apollo module
    ├── planning # apollo module, to be done
    ...
    └── other_module_name # apollo module, to be done
```
### Converting Steps
Let's create a new branch named `feature_catkinizing_module` to hold the all the changes we are going to make. Pick a module named `module_name` from `planning`,`control`, `routing`, `perception`,..., etc. to convert.

#### 1. Create a working branch based on the master branch
```bash
git checkout master && git pull # pull the latest codes
git checkout -b feature_catkinizing_module # create a new branch locally
git push --set-upstream origin feature_catkinizing_module # push to the remote
```
#### 2. Get the source codes of a module:   
* Checkout the module   
This repo holds a copy of the source codes of [apollo-v3.0.0](https://github.com/ApolloAuto/apollo/releases) in branch `apollo_3_0_0`. You can use the git command to checkout a folder from the branch `apollo_3_0_0`.
  ```bash
  cd src && git checkout apollo_3_0_0 -- module_name
  ```
* Modify the include directries in the header and source files   
All the original files include the `module/module_name` in the `#include` lines. But in cmake projects, the prefix `module/module` is not needed. My solution is searching all the `.h` and `.cc` files for `module/module_name/` and replace it with an empty string `""`. In `port_apollo` repo, I provide a python script [scripts/tools/content_hunter.py](https://github.com/yuzhangbit/port_apollo/blob/master/scripts/tools/content_hunter.py) to do the work automatically.  The usage is as below:
  ```python
  python scripts/tools/content_hunter.py [module1_name] [module2_name]
  ```
  The module names here can be `common`, `planning`, `control`, `perception` etc.    
  ```
  # for example 
  python scripts/tools/content_hunter.py common
  ```
  **Note**: The script only substitutes the string `module/module_name/`. If the file include `module/other_module_name`, you may need to remove it manually. Or improve the python script.

#### 3. Add ROS-related files to the `module_name` package  

* Create a test main file called `module_name_tests.cc` in the `module_name` folder.   
  This file will call the test cases you are going to add in the `CMakeLists.txt` file.
    ```c++
    #include <gtest/gtest.h>
    int main(int argc, char **argv) {
      ::testing::InitGoogleTest(&argc, argv);
      return RUN_ALL_TESTS();
    }
    ```

* Add `CMakeLists.txt`    

    ```cmake
    cmake_minimum_required(VERSION 3.0)
    project(module_name VERSION 0.0.1 LANGUAGES CXX)
    # enable c++11　feature
    set(CMAKE_CXX_STANDARD 11)
    #  enable tests
    set(CATKIN_ENABLE_TESTING ON)
    # for protobuf to generated interfacing files
    list(APPEND CMAKE_MODULE_PATH "${CMAKE_CURRENT_SOURCE_DIR}/../cmake")
    ###############
    #### set the catkin dependend packages
    set(PKG_DEPS
        glog_catkin
        roscpp)
    find_package(catkin REQUIRED COMPONENTS ${PKG_DEPS})
    find_package(Protobuf REQUIRED)
    # set the .proto definition files  
    set(PROTOS
          path/to/file.proto # relative to module_name folder   
    )
    # call the protobuf command to generate the header and source files
    PROTOBUF_GENERATE_CPP(PROTO_SRCS PROTO_HDRS ${PROTOS})
    ```
    Note: I write a custom cmake module called `FindProtobuf.cmake` to find the protobuf library and related variables. It depends on `pkg_check_modules` of the pkgconfig and protobuf.pc to find the right version and return below variables
    ```
    PROTOBUF_INCLUDE_DIRS
    PROTOBUF_LIBRARIES
    RPOTOBUF_FOUND
    ```
    It also provides a cutom cmake command `PROTOBUF_GENERATE_CPP` to generate the header and source files for the `.proto` definition files before compiling the library. Currently, the script does not install `.proto` files to the shared folder like `catkin_ws/devel/share` or `catkin_ws/install/share`. The generated files will mirror the `.proto` directory structure in `module_name` folder. So if you need to use the generated header file of some `.proto`, just include the `directory_to_proto` file but replace the extension `.proto` with the `.pb.h`. For example, `#include "common/configs/proto/vehicle_config.pb.h"` for `common/configs/proto/vehicle_config.proto`. Of course, in the same package, you don't need the module name `common`.
    ```
    # global include directories
    include_directories(
        ${catkin_INCLUDE_DIRS}
        ${PROTOBUF_INCLUDE_DIRS}
    )
    # use catkin_package command to expose the header files and the same directory structure to other catkin packages
    catkin_package(
        ## export these folder sturcture in the package root folder to other catkin packages
        INCLUDE_DIRS ${CATKIN_DEVEL_PREFIX}/include
        LIBRARIES ${PROJECT_NAME}  # we are going to wrap all the algorithms to one library named by the module_name
        CATKIN_DEPENDS ${PKG_DEPS})
    # set the source files for the library, you can select the source files you want to test in the module. Be careful with the dependencies. You can check the bazel build files for the dependency tree. You may need other module to be a catkin package first. In that case, convert other module first. Then add other modules as catkin dependencies to PKG_DEPS
    set(SOURCES
        path/to/source1.cc
        path/to/source2.cc)
    # add library target
    add_library(${PROJECT_NAME}
        ${SOURCES}
        ${PROTO_HDRS}
        ${PROTO_SRCS})
    # set the include directory only for the target
    target_include_directories(${PROJECT_NAME}
        PUBLIC
          $<BUILD_INTERFACE:${CATKIN_DEVEL_PREFIX}/include>
          $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}>
        PRIVATE
          $<BUILD_INTERFACE:${CMAKE_CURRENT_BINARY_DIR}/${PROJECT_NAME}>
        )
    # link the library
    target_link_libraries(${PROJECT_NAME}
        ${catkin_LIBRARIES}
        ${PROTOBUF_LIBRARIES}
        )
    if (CATKIN_ENABLE_TESTING)
        catkin_add_gtest(${PROJECT_NAME}_tests
            module_name_tests.cc
            path/to/test1.cc
            path/to/test2.cc)

        target_include_directories(${PROJECT_NAME}_tests
          PUBLIC
            $<BUILD_INTERFACE:${CATKIN_DEVEL_PREFIX}/include${PROJECT_NAME}>
            $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}>
          PRIVATE
            $<BUILD_INTERFACE:${CMAKE_CURRENT_BINARY_DIR}/${PROJECT_NAME}>
            )
        target_link_libraries(${PROJECT_NAME}_tests
          ${catkin_LIBRARIES}
          ${PROJECT_NAME})

    endif (CATKIN_ENABLE_TESTING)
    
    #############
    ## Install ##
    #############
    ## install the headers and directories
    ## don't miss any subfolders of the root, or you can't include the headers
    ## from other ros packages
    # take the `common` module for example
    set(DIRS proto math util time vehicle_state data configs adapters status transform_listener monitor_log kv_db filters)
    # install all the headers to devel space since we export ${CATKIN_DEVEL_PREFIX}/include/
    # to catkin package instead of the include folder in the root
    install(DIRECTORY ${DIRS}
              DESTINATION ${CATKIN_DEVEL_PREFIX}/include/${PROJECT_NAME}
              FILES_MATCHING PATTERN "*.h"
              PATTERN ".svn" EXCLUDE
      )
    # install the header files in the module_name root folder
     install(FILES log.h macro.h
              DESTINATION ${CATKIN_DEVEL_PREFIX}/include/${PROJECT_NAME}
     )
     # install all the headers to the install space, mirror the structure
     # install the generated headers
     install(DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}/${PROJECT_NAME}
              DESTINATION ${CATKIN_GLOBAL_INCLUDE_DESTINATION}
              FILES_MATCHING PATTERN "*.h"
              PATTERN ".svn" EXCLUDE
     )
     # install all the headers to install space
     install(DIRECTORY ${DIRS}
              DESTINATION ${CATKIN_PACKAGE_INCLUDE_DESTINATION}
              FILES_MATCHING PATTERN "*.h"
              PATTERN ".svn" EXCLUDE
     )
     # install header in the module_name root folder to install space
     install(FILES log.h macro.h
              DESTINATION ${CATKIN_PACKAGE_INCLUDE_DESTINATION}
     )
    ```   

* Add `package.xml`, should match the ros packages defined by `PKG_DEPS` in `CMakeLists.txt`.

    ```xml
    <package format="2">
      <name>module_name</name>
      <description>apollo module_name module</description>
      <maintainer email="abc@abc.com">abc</maintainer>
      <license>Apache 2.0</license>
      <version>3.0.0</version>
      <buildtool_depend>catkin</buildtool_depend>
      <depend>glog_catkin</depend>
      <depend>roscpp</depend>
    </package>
    ```

#### 4. Compile and Test, in `port_apollo`
* Build   

        ```bash
        catkin build
        catkin build --make-args tests
        ./devel/lib/module_name/module_name
        ```

#### 5. Call the algorithms from the `module_name` you just converted in your catkin package `my_package`
  * CMakeLists.txt

      ```
      find_package(catkin REQUIRED COMPONENTS module_name)
      catkin_package(
          CATKIN_DEPENDS module_name
      )
      ```

  * package.xml

      ```xml
      <package format="2">
        <name>my_package</name>
        <description>my_package</description>
        <maintainer email="yu.zhang.bit@gmail.com">Yu Zhang</maintainer>
        <license>Apache 2.0</license>
        <version>0.0.1</version>
        <buildtool_depend>catkin</buildtool_depend>
        <depend>module_name</depend>
      </package>
      ```

  * Include headers from `module_name` package in the source files of your own package. Just follow the directory structure in `module_name` package. You can also use clion IDE to help you find the headers automatically.

      ```c++
      #include <module_name/subfolder/some_header.h>
      ```

A working example could be found in package [common](https://github.com/yuzhangbit/port_apollo/tree/master/src/common).  

Pull requests for [port_apollo](https://github.com/yuzhangbit/port_apollo) are welcomed!

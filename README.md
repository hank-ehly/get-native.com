# get-native.com

Source code for get-native.com

[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)
[![CircleCI](https://circleci.com/gh/hank-ehly/get-native.com.svg?style=svg&circle-token=c8cd7dd33921404431af97d9c9fab8c3714ec4fc)](https://circleci.com/gh/hank-ehly/get-native.com)

## 1. Purpose and Goal

### 1.1 General Description
Get Native is a web application (described here forth as app) for language learning. It allows users to login, browse a database of video interviews, and view or study the original and/or translated version of the script accompanying each video.

### 1.2 Goal
This app serves as a study tool for language learners who have already reached a comfortable level of proficiency but wish to make their word choice and pronunciation sound more native-like.

### 1.3 Target Audience
The target audience of this app is the advanced language learner who wishes to bring their pronunciation and word-choice of the target language closer to that of a native speaker.

## 2. Features

### 2.1 Registration & Login
Get Native allows users to register and/or login in 1 of 3 ways:
Facebook
Gmail (Google Account)
Regular Email

### 2.2 Browse / Search Videos
The focus of Get Native is on studying video interviews. Users can browse and/or filter-search video interviews based on preset criteria. Videos are stored on the origin server and sent to the client using HTTP Range Requests [RFC 7233] via the HTML5 <video> interface. Videos are proprietary and are not available for download; however, they are free to view online.

### 2.3 Study Sessions
A Get Native Study Session is a timed exercise performed while logged into the app. The user selects a video, specifies the amount of time (in minutes) they want to study, and is led through a series of 4 language exercises utilizing the chosen video:
- Listening
- Shadowing
- Speaking
- Writing

### 2.4 Multiple language support
Get Native provides video interviews in multiple languages, which makes it possible to study multiple languages. Users can change the current Study Language at any time by hovering over the bottom right corner of the screen when logged in.

### 2.5 Interactive Tutorial
To learn about how to use Get Native, users are able to navigate through an interactive tutorial which shows and describes the various features of Get Native.

## 3. Database Schema

<p><img src="docs/images/schema.png" alt="Database Schema"/></p>

---
layout: project
title:  "Automated Testing using Image Recognition"
excerpt: "In 2016, I prototyped an application for automated testing using image recognition for the BPMCamp conference. This application was able to match screenshots of UI elements to their location on the screen and interact with these UI elements, allowing users to test without writing code."
type: "achievement"
tag:
- bp3
- automation
- automated
- testing
- brazos
comments: true
thumbnail: "opencv-logo.png"
thumbnailCustomCSS: "padding: 10px;"
technologiesUsed:
  - "OpenCV (3.x)"
  - "C++"
  - "Java 8"
  - "Java Native Interface (JNI)"
  - "Automated Testing Framework"
---
## Introduction
At the yearly BPMCamp[^1] conference, developers are given the chance to show off random ideas they have by presenting prototypes in a 2-hour open session. Having developed the [Automated Testing Framework]({{ site.url }}/projects/bp3-testing-framework) recently, I thought about finding a way to allow business users to design tests for processes they implement on their BPM systems. One of the ideas that popped into my head was allowing users to write tests using what they interact with. This meant, they could take screenshots of UI elements that need testing, fill in the parameters (i.e. tell the testing system how to interact with this element, whether this be clicking, entering a string, etc.), and let the testing system handle the rest of it. This would require the testing system to act like how a human would when performing manual testing: Identify the element to test on the screen, interact with it, and finally verify that results reflect what was expected. I achieved this using image recognition algorithms.

## Preliminary Research
Preliminary research for this project revealed 3 projects I could utilize:
* Sikuli
* OpenCV
* Google Vision API

### Sikuli
[Sikuli](http://www.sikuli.org/) is a software package that automates "anything that's seen on the screen" and comes as different packages. One of them is called [SikuliX](http://sikulix.com/), which is distributed as a standalone package that can be run and scripted using a variety of languages. SikuliX can also be downloaded as a JAR and included in any JVM-based language as a dependency for greater control. However, having been initially developed as a research project, its Java API is not well documented.

### OpenCV
A cross-platform computer vision library that has been around since 2000. Having used this library in college before, I was somewhat familiar with its image recognition capabilities. At the time of this project, this library was mature, even including a GPU interface for some of the image recognition capabilities. OpenCV comes with a Java wrapper; however, this wrapper is limited as it does not provide an API for all OpenCV functionality, such as the GPU interface.

### Google Vision API
A comprehensive cloud offering by Google that performs various computer vision tasks, including optical character recognition (OCR). At the time of this project, the Google Vision platform was in its infancy and did not provide any examples of OCR performed on screenshot images.

## Design
I decided to go with OpenCV for this project as I had experience using it before, and it provided a decent GPU interface for its image recognition algorithms, which would help accelerate the calculations. However, this GPU interface was not available through the OpenCV Java API, which meant I had to use C++. Despite the challenges, this was a great opportunity for me to get back into C++ and learn how to use JNI.

<figure>
  <a href="{{ site.url }}/assets/img/projects/opencv-2016/arch.svg"><img src="{{ site.url }}/assets/img/projects/opencv-2016/arch.svg" style="max-width: unset; width: 25vw;"></a>
  <center><figcaption>Architecture diagram showing the high level interaction between modules. Java calls to the C++ functions are made through JNI.</figcaption></center>
</figure>

The first step was to implement the C++ applications - the element and text finders - which would be called by the Java application using JNI. Then, I had to extend the [Automated Testing Framework]({{ site.url }}/projects/bp3-testing-framework) (called "Application Executor" in the diagram above) to perform several simple tasks. If using the element finder:
1. Bring the app to be tested to the foreground.
1. Take a screenshot.
1. Send the screenshot and the image of the element to be found to the element finder, then start execution.
1. Based on the response from the element finder, execute the test on the app in the foreground.

If the text finder is being used:
1. Bring the app to be tested to the foreground.
1. Take a screenshot.
1. Send the screenshot and text to be found to the text finder, then start execution.
1. Based on the response from the text finder, execute the test on the app in the foreground.

### Element Finder
<figure>
  <a href="{{ site.url }}/assets/img/projects/opencv-2016/element-finder-ssd.svg"><img src="{{ site.url }}/assets/img/projects/opencv-2016/element-finder-ssd.svg" style="max-width: unset;"></a>
  <center><figcaption>System sequence diagram for the UI element finder, showing the interaction between different modules.</figcaption></center>
</figure>

The element finder first checks to see if the image of the element to be found in the screenshot is smaller than a threshold. If so, it enlarges both the screenshot and the element image. Bicubic interpolation works best for preserving sharp edges of elements.

<figure>
  <a href="{{ site.url }}/assets/img/projects/opencv-2016/bicubic-vs-bilinear.png"><img src="{{ site.url }}/assets/img/projects/opencv-2016/bicubic-vs-bilinear.png"></a>
  <center><figcaption>Bicubic (left) vs bilinear (right) interpolation of an input box element on the screen. Bicubic interpolation is better at preserving sharp edges</figcaption></center>
</figure>

Next, the [Speeded up robust features (SURF)](http://docs.opencv.org/3.0-beta/doc/py_tutorials/py_feature2d/py_surf_intro/py_surf_intro.html) - an optimized version of Scale Invariant Feature Transform (SIFT) - algorithm is used to detect keypoints (i.e. areas of interest in the image) and descriptors for these keypoints (i.e. an internal representation that describes these keypoints, such as their gradient) in both the image element and the screenshot. These descriptors are then used to find the element image in the screenshot. While there are other algorithms available for this process, such as FAST and ORB, SURF[^4] excels at detecting images with blurring, which tends to happen with screenshots that are scaled up.

<figure>
  <a href="{{ site.url }}/assets/img/projects/opencv-2016/surf-detection.png"><img src="{{ site.url }}/assets/img/projects/opencv-2016/surf-detection.png"></a>
  <center><figcaption>Detection of keypoints and what the element matches in the screenshot (right).</figcaption></center>
</figure>

Next, a brute force matcher is used to match the descriptors in the element image and screenshot, which goes through all descriptors and finds the best match. While the brute force matcher finds the best result, it can also take a long time to complete for larger datasets. In such cases, another matching algorithm called FLANN may be used. FLANN uses approximations to find a good match (which may not be the best match) and is reportedly more efficient on datasets that contain data on the order of thousands of entries[^5].

Finally, if a good number of matches are found (based on a preset threshold value), a perspective transform is applied on the element image, which allows the proper screen coordinates to be obtained and sent back to the Java application, which interacts with the element on the screen.

### Text Finder
One problem that occurred to me was that OCR was generally performed on image in photos. Generally photos are much more detailed (200-300 ppi[^2]) than the text in a screenshot (which is usually around 72 ppi). I suspected this could be an issue when trying to detect text in a screenshot. Some research confirmed my suspicions and was proven by research done by others: [An evaluation of HMM-based Techniques for the Recognition of Screen Rendered Text]({{ site.url }}/assets/docs/projects/opencv-2016/screen-text-recognition-eval.pdf). 

The research paper above shows that Hidden Markov Model (HMM) based algorithms fare better at detecting screen-rendered text as they don't need to segment characters for detection. This is important since segmentation of characters is difficult, due to anti-aliasing applied to screen-rendered text[^3]. OpenCV offers two options for OCR using HMM: [OCRTesseract](http://docs.opencv.org/3.3.0/d7/ddc/classcv_1_1text_1_1OCRTesseract.html) (Google's OCR library) and [OCRHMMDecoder](http://docs.opencv.org/3.3.0/d0/d74/classcv_1_1text_1_1OCRHMMDecoder.html). Both require training data, which is also [provided by OpenCV](https://github.com/opencv/opencv_contrib/tree/master/modules/text).

<figure>
  <a href="{{ site.url }}/assets/img/projects/opencv-2016/text-finder-ssd.svg"><img src="{{ site.url }}/assets/img/projects/opencv-2016/text-finder-ssd.svg" style="max-width: unset;"></a>
  <center><figcaption>System sequence diagram for the text finder, showing the interaction between different modules.</figcaption></center>
</figure>

Having decided to go with Tesseract OCR (due to its ease of use with OpenCV), the first step is to convert the screenshot into grayscale, then enlarge using Lanczos interpolation[^6] (as suggested by the research paper above), as Tesseract performs much better with higher resolution images. Other OCR algorithms also exist, such as a pure HMM-based solution or ABBYY; however, HMM-based solutions are difficult to set up and train, while ABBYY is a proprietary solution that is not provided standalone.

<figure>
  <a href="{{ site.url }}/assets/img/projects/opencv-2016/recognition-accuracies.png"><img src="{{ site.url }}/assets/img/projects/opencv-2016/recognition-accuracies.png"></a>
  <center><figcaption>Tesseract performs much better with higher resolution images.</figcaption></center>
</figure>

Next, the screenshot is binarized using the [Otsu method](https://en.wikipedia.org/wiki/Otsu%27s_method), which automatically determines the threshold by separating the image into its foreground and background pixels. Binarized images consist only of black and white pixels, which helps reduce the anti-aliasing formed around the text during enlargement.

<figure class="half">
  <a href="{{ site.url }}/assets/img/projects/opencv-2016/non-binarized.jpg"><img src="{{ site.url }}/assets/img/projects/opencv-2016/non-binarized.jpg"></a>
  <a href="{{ site.url }}/assets/img/projects/opencv-2016/binarized.jpg"><img src="{{ site.url }}/assets/img/projects/opencv-2016/binarized.jpg"></a>
  <center><figcaption>A regular image (left) and its binarized version (right)</figcaption></center>
</figure>

Next, the binarized screenshot is dilated to increase the white region in the image (assuming white is the color of the foreground objects in the image), which allows text to merge, making it easier to find the contours of the merged text.

<figure class="third">
<a href="{{ site.url }}/assets/img/projects/opencv-2016/normal.png"><img src="{{ site.url }}/assets/img/projects/opencv-2016/normal.png"></a>
  <a href="{{ site.url }}/assets/img/projects/opencv-2016/dilated.png"><img src="{{ site.url }}/assets/img/projects/opencv-2016/dilated.png"></a>
  <a href="{{ site.url }}/assets/img/projects/opencv-2016/contoured.png"><img src="{{ site.url }}/assets/img/projects/opencv-2016/contoured.png"></a>
  <center><figcaption>The screenshot (left), then dilated (middle), and finally contoured (right). Cliking on the contour image will help with viewing the red lines of the contour.</figcaption></center>
</figure>

Next, OpenCV can create a bounding box around the contoured areas, allowing us to mark to extract only the regions with text, which will later be given to Tesseract for analysis after filtering out outliers (such as vertical text).

<figure>
  <a href="{{ site.url }}/assets/img/projects/opencv-2016/regions.png"><img src="{{ site.url }}/assets/img/projects/opencv-2016/regions.png"></a>
  <center><figcaption>Red box outlining the area with text, found by drawing a bounding box around the contour.</figcaption></center>
</figure>

Finally, the regions can be given to Tesseract for extracting text. If any matching text is found within these regions, the location is sent back to the Java application such that tests can interact with the app in the foreground.

## Challenges
Despite being an experimental app, I faced several challenges in the few weeks that I spent on finding a solution:
* There were no examples on how to perform text extraction from screenshots. I had to rely on research papers and examples that were similar to what I was trying to achieve (such as extracting subtitles from video).
* Last time I had used C++ was more than a decade ago. Much had changed with regards to the language and I was not familiar with some of the new features that was brought in with C++11 (such as `auto` and auto pointers). In addition, I had to use the C++ implementation of OpenCV, as the Java wrapper did not provide access to SURF, Tesseract, or any of the GPU interfaces.
* Using the GPU interface to find elements on a screenshot (with the element finder) proved significantly faster; however, with limited memory on the graphics card, I had to often release memory space allocated to matrices storing processed versions of images. With enlarged color images taking up about 120 MBs[^7] each, my graphics card was regularly running out of available memory.
* JNI has a difficult syntax that takes time to get used to. Thankfully, its syntax makes sense after using it for a while and it provides seamless integration with C++. Here's an example that references a Java native method signature in the package `com.example.elementfinder`, in the class `ElementFinder`, with name `findElementInScreenshot`:
{% highlight c++ %}
JNIEXPORT jobject JNICALL Java_com_example_elementfinder_ElementFinder_findElementInScreenshot
        (JNIEnv *, jobject, jstring, jstring);
{% endhighlight %}
* Building OpenCV takes some time to get right, as you need to make sure all dependencies are available to build the library without issues (such as installing CUDA drivers, find the JNI C++ interfaces, etc).

## Conclusion
Although this was a difficult project, it is one that I have greatly enjoyed experimenting with. I have learned about how a plethora of image and text recognition algorithms work, as well as the steps taken in utilizing such algorithms.

## Footnotes
[^1]: BPMCamp is an annual conference held by BP3, where employees and customers are invited to watch presentations by BP3 employees and industry guests.
[^2]: "ppi" stands for "[Pixels per Inch](https://en.wikipedia.org/wiki/Pixel_density#Scanners_and_cameras)". It's a way of measuring the pixel density of a screen or image. Higher pixel densities mean the image contains greater detail per square inch of area.
[^3]: Anti-aliasing occasionally causes text to touch each other, which makes segmentation difficult.
[^4]: A drawback of SURF is that [it's patented and requires permission to use commercially](http://www.vision.ee.ethz.ch/~surf/download.html).
[^5]: There is no official source that states what a "large dataset" entails. The "order of thousands" statement is based on other users' observations of FLANN's performance.
[^6]: Similar to cubic interpolation. You can read more about it [here](https://en.wikipedia.org/wiki/Lanczos_resampling).
[^7]: A 10 megapixel, CV_32FC3 format image (3 channel, each 32-bit floating point values, or 96 bits per pixel) takes up about 995,328,000 bits or ~124.4 MBs.

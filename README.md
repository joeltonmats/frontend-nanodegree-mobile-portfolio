## Website Performance Optimization portfolio project

This project was the Udacity's challenge for [Critical Rendering Path course](https://www.udacity.com/course/ud884).
The target was optimize this online portfolio for speed, in particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques.


### Getting started

1. Check out the repository
2. Download the dependecies

 ```bash
 $> cd /path/to/your-project-folder
 $> npm install
 ```

3.  To inspect the site on your phone, you can run a local server
 
  ```bash
  $> cd /path/to/your-project-folder
  $> npm start
  ```

4. Open a browser and visit localhost:3000

**If you dont want to do next two steps, go to next section and run PageSpeed score locally.**

5. Download and install [ngrok](https://ngrok.com/) to the top-level of your project directory to make your local server accessible remotely 

  ``` bash
  $> cd /path/to/your-project-folder
  $> ./ngrok http 3000
  ```

6. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! 


### Running PageSpeed Insights locally

1. To run PageSpeed score locally just run the task with the application running on port 3000

  ``` bash
  $> cd /path/to/your-project-folder
  $> grunt pagespeed-score
  ```
### Optimizations Made

1. Gzip compactation - It was actived in server side. In app.js has this code.
2. CSS minification - The css files in the project were minified.
3. HTML minification - The HTML files were minified.
4. JS minification - Scripts used in the application were minified.
5. Images optimization - The images were optimized to reduce load time.
6. Application Bugs Fixed
  1. Application runnning in 60 fps.
  2. Slider on pizza size has a resize smaller 5 ms


### Optimization Tips and Tricks reference this project
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>
* <a href="http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/">Grunt pageSpeed and ngork integration</a> 


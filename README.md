# Questions And Answers web page built with Drupal

![image](https://github.com/user-attachments/assets/78e5cf53-65f2-4dee-aff0-8ccc12f6f882)

## In order to run this project you need to:

1. Install Drupal 10.3 locally https://drupalize.me/tutorial/install-drupal-locally-ddev. <br/>
   1.1 Install DDev https://ddev.readthedocs.io/en/latest/users/install/ddev-installation/.
2. Clone this repository on your local system.
3. Run powershell as admin. <br/>
  3.1 Navigate to the project file. <br/>
  3.2 Run these commands to start and launch the project: ddev start && ddev launch


## A breakdown of my work steps

### Task 1:
  1. Installed DDev and Ubuntu.
  2. Created a new DDEV project named my-site and configured it to host a Drupal application.

### Task 2:
  1. Created a Question Content Type using Drupal's UI.
  2. Added relevant fields.

### Task 3:
  1. Added a new View named: Questions and Answers, and configured it properly.
  2. Added test content of questions and answers. 

### Task 4:
  1. Made the questions filterd by Topic.
  2. Downloaded "Better Exposed Filters" extention. 

### Task 5:
  1. Installed and built a new custom theme using "Starterkit". my theme name is: rotem-linnovate-theme.
  2. Installed "JSON:API" and "Serialization" module.
  3. Integrated my custom theme with React. <br/>
     3.1 Used page--front.html.twig in order to show react components only on front pages.

### Task 6:
  1. Fetched the information (Questions, answers, Order and Topics) from the Json api.
  2. Implemented sort method that uses the order field to align the questions in ascending order.
  3. Implemented the fetched information into relevant containers. Topics are clickable boxes and questions are collapsible list.
  4. Implemented a logic that allows only one answer to be open at a time.
  5. Applied CSS to enhance visual appearence. <br/>
  
    

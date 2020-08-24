# microBlock IDE

Program a microcontroller with Block &amp; MicroPython. Support ESP32, ESP8266 and STM32

## Get Started

### Install MicroPython

Install MicroPython to your Microcontroller. Now, microBlock IDE main support ESP32. You can read how to install MicroPython to ESP32 at http://docs.micropython.org/en/latest/esp32/tutorial/intro.html#esp32-intro

### Enable Serial API

microBlock IDE is Web Service use Serial API for connect to your microcontroller. Now, Serial API support only Google Chrome and needs enable the #enable-experimental-web-platform-features flag in chrome://flags

### Blink with Block programming

Go to microblock.app, Main page have 4 section

 1. Top Menu bar - Have this 
    1. Mode select - you can select programming with Block or Python Code, If you have blocks in Block mode and then switch to code mode, Block will convart to Python Code but if you edit code in Python Code mode. The Python code can't convart to block so just keep in mind. You can select one mode for Project. 
    2. Open Extension Dialog - if you needs more blocks you can install extension for get more blocks
    3. Open Help page - After click it, You will go to main web of microBlock IDE and then you can go Docs page for get about microBlock IDE
 2. Block Category - Have thie
    1. Pin - this category you can get digtial read , digital write , analog read and PWM write block, Drap and Drop blocks in category to Workspace for programming
    2. Control - you can get delay loop and if in this category.
    3. ....
  3. Workspace - Drap and Drop blocks in category to Workspace for programming
  4. Bottom bar - Have this
    1. New project - if you want to new project you can click this (Keep in mind, Save project before New project)
    2. Save Project - Blocks and Extension and other about project will convart to one file. You can share file same share code
    3. Open Project - Open old project
    4. Upload - Upload your code to your device
    5. Open terminal - you can enter python code, Cancle code, Delete file, get all file in device via terminal. Recommend, Open terminal before Upload. You will know how microBlock upload code to you device and get Upload progress
    
OK, for create Blink program you needs 3 blocks

  1. digital write at Pin Category
  2. wait ... sec at Control Category
  3. forever at Control Category
  
How Blink program work ? Blink is turn on led and wait and turn off and wait and turn on led and wait and turn off and wait and ... do forever so

  1. Move digital write block into forever block
  2. Move wait ... sec block into forever block with append digital write block
  3. Duplicate digital write block (Right click at digital write and select Duplicate) and move new digtial write block into forever block with append wait ... sec block
  4. Duplicate wait ... sec block and move into forever block with append last digtial write block
  
## We needs you support



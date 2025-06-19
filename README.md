# Dimensity

A CLI-over-CLI shell that makes your terminal usage "adventure" better with smart autocompletion (with commands too!), command history, error descriptions and handling...

## How it works

I created Dimensity as a sort of experiment to see how well JS apps could be converted to executable binaries. After some time I realized that it could be useful for lots of people (including me) and so I decided to improve it with a bunch of useful features.

## Features

Dimensity currently has (or is going to implement) the following features:

1. Smart autocompletion for commands and files (with command arguments support)
2. Command history with arrow keys support (users can also see their history with the ˋdimensity historyˋ command)
3. Error descriptions and handling (will be improved in the future with more detailed error messages and maybe AI-powered descriptions)
4. Colored info, command output and other messages
5. Username support
6. Customizable theme colors
7. Command aliases

## Installation

To install Dimensity, simply go to the GitHub releases page and download and run the latest release. Then, run `chmod +x dimensity-[arch]` to make it executable.

### On MacOS

Apple is kind of special with its "security", so you will need to allow the app to run in your Privacy & Security settings, even if we codesigned it (Apple really wants devs to pay for a dev account...).

To do that, go to System Preferences > Privacy & Security, scroll down to Security and click "Allow Anyway" next to the message about Dimensity being blocked. Once you do that, you can run Dimensity, and it will ASK AGAIN if you want to run it. Say yes, auth with password/Touch ID, and it will run.

## Usage

To use Dimensity, run the `./dimensity` file in your terminal (feel free to install it globally as well). If you run it with root, it'll allow you to run commands with root privileges (use with caution!).

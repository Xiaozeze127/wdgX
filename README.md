# wdgX

[![NPM Version](http://img.shields.io/npm/v/wdgx.svg?style=flat)](https://www.npmjs.org/package/wdgx)
[![NPM Downloads](https://img.shields.io/npm/dm/wdgx.svg?style=flat)](https://npmcharts.com/compare/wdgx?minimal=true)
[![Install Size](https://packagephobia.now.sh/badge?p=wdgx)](https://packagephobia.now.sh/result?p=wdgx)

Static website directory generation

It's like a mirror station

- [wdgX](#wdgx)
  - [Install](#install)
  - [Config](#config)
    - [pd](#pd)
    - [Differences between cttp and hcttp](#differences-between-cttp-and-hcttp)
      - [cttp](#cttp)
      - [hcttp](#hcttp)
      - [How to config cttp and hcttp](#how-to-config-cttp-and-hcttp)
    - [disable_index and disable_catalog](#disable_index-and-disable_catalog)
    - [e.html](#ehtml)
  - [generation](#generation)
  - [Start Server](#start-server)

## Install

```shell
npm install wdgx -g
```

## Config

Find the folder where you want to use the wdgX, and need use "wdgx -i" to init

Then you can see a new file called "wdgx-config.json" in the current directory

If you want to reinitialize, please enter "wdgx -i -f"

```json
{
    "path": "./", // Folder to use
    "suffix": "html", // file extension
    "cttp": [ // Whether to change the website title, see below
        {
            "YN": true, // Y/N
            "id": "title" // id
        }
    ],
    "hcttp": [ // Whether to change the page title,see below
        {
            "YN": true, // Y/N
            "id": "htitle" //id
        }
    ],
    "pd": true, // Display upper level folder
    "e_html": "./e.html", // Basic HTML
    "disable_index": [ // Do not generate these files to web pages
        "index.html",
        ".git",
        "CNAME",
        ".DS_Store",
        "README.md",
        "json",
        "e.html",
        "js",
        "css",
        "node_modules",
        "package.json",
        "package-lock.json",
        "LICENSE",
        ".gitignore",
        "wdgX-config.json"
    ],
    "disable_catalog": [ // Hide these files to the web page
        "img",
        "documents"
    ],
    "change_title": [ // Switch the names of these files
        {
            "img": "photos"
        }
    ]
}
```

### pd

means Parent directory

effect:

![effect](img/4-1.png)

### Differences between cttp and hcttp

#### cttp

![path:/](img/1-1.png)

![path:/wuhaneduyun](img/1-2.png)

#### hcttp

![path:/](img/2-1.png)

![path:/wuhaneduyun](img/2-2.png)

#### How to config cttp and hcttp

![cttp](img/3-1.png)

```json
"cttp": [
      {
          "YN": true,
          "id": "title"
      }
  ],
```

![hcttp](img/3-2.png)

```json
"hcttp": [
      {
          "YN": true,
          "id": "htitle"
      }
  ],
```

### disable_index and disable_catalog

disable_index will not generate links in the directory,And if it is a directory, no web page will be generated in this directory

disable_catalog is equivalent to a hidden folder

### e.html

Basic HTML content

You need the following:

```html
<table>
    <thead>
        <th>Name</th>
        <th>Last Update</th>
    </thead>
    <tbody id="filelist">

    </tbody>
</table>
```

This is the file directory section, id must be filelist

[example:](https://github.com/Xiaozeze127/wdgX/blob/master/example.html)

[example website:](https://mirrors.maftertstudio.com)

The directory name must be in the "tname" style, time has to be in "tt" style

Because html is:

```html
<td><a class="tname" href="">Name</a></td><td><a class="tt">Time</a></td>
```

## generation

Find the generate "wdgx-config.json" folder

```shell
wdgx -g
```

Wait a few seconds, and he's done

As you can see, they are generated in all directories index.html file

## Start Server

We provide a service to start the server, and of course you can also move this folder to nginx

```shell
wdgx -s

              _      __  __
 __      ____| | __ _\ \/ /
 \ \ /\ / / _` |/ _` |\  / 
  \ V  V / (_| | (_| |/  \ 
   \_/\_/ \__,_|\__, /_/\_\
                |___/      
Starting up http-server, serving ./
Available on:
  http://127.0.0.1:4000
  http://172.20.10.5:4000
Hit CTRL-C to stop the server
```

For more help on "wdgx -s", please enter "wdgx -s -h"

---
aliases: Obsidian resources
---
# Obsidian Meta Directory

[![Hope](https://img.shields.io/badge/tested%20by-H%C2%AF%5C__(%E3%83%84)__%2F%C2%AFPE-green.svg)](http://www.hopedrivendevelopment.com)

This is the Meta directory for my Obsidian vaults. This is shared across different vaults and contains templates and scripts.

## Plugins used

- [Custom JS](obsidian://show-plugin?id=customjs)
  - Enables sharing scripts in different environments
- [Dataview](obsidian://show-plugin?id=dataview)
  - Used for generating tables from metadata
- [Media DB](obsidian://show-plugin?id=obsidian-media-db-plugin)
  - Helps collect data about media I'm consuming
- [Meta Bind](obsidian://show-plugin?id=obsidian-meta-bind-plugin)
  - Used to edit ratings and so on in [[#Media DB]] pages
- [Periodic Notes](obsidian://show-plugin?id=periodic-notes)
  - For journaling.
- [Templater](obsidian://show-plugin?id=templater-obsidian)
  - Powers most of the fun stuff here!
  - <https://shbgm.ca/blog/obsidian/Templater+Snippets> for more cool stuff.

## Plugin configuration

### Custom JS

- Set the Custom JS folder to the `CustomJS` folder in this directory

### Media DB

- Create a `Media` Folder
- Create subfolders for each type of media and set up Media DB to send new media of each type to the corresponding folder
- Set the correct template for each media type to the templates in `Templates/Media/`
  - Notice the templates here depend on the [[#Meta Bind]] plugin to edit ratings

### Meta Bind

- Toggle the `Enable Javascript` setting on

### Periodic Notes

> [!warning]
> Disable the built-in `Daily Notes`  "Core Plugin", it can cause confusion.

- Set the Destination folders for each type of periodic note
- DO NOT set templates in this plugin

### Templater

- Toggle the `Automatic jump to cursor` setting on
- Toggle the `Trigger Templater on new file creation` setting on
- Set the periodic notes templates as the default for their corresponding directory
- Add the [[Youtube Link]] and [[Create New Person]] as template hotkeys, that shows them in the menu!
- Set the Job Search template as the default in a folder if you're looking for a job
  - You may also want to copy the [[Job Search Summary]] template as well.

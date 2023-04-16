---
title: Git Cheatsheet
sidebar_position: 10
---

## How to remove deleted remote branches locally

```powershell
$branches = git for-each-ref --format '%(refname) %(upstream:track)'
$branches | foreach {if ($_.endswith('[gone]')) {git branch -D $_.split(' ')[0].replace('refs/heads/', '')}}
```

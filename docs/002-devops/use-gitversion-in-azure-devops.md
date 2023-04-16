---
title: Use GitVersion in Azure DevOps
---

How to use [GitVersion](https://gitversion.net/) for proper [Semantic Versioning](https://semver.org/).

I recently had the challenge of creating proper semantic versioning for a shared library published to an Azure NuGet feed. We are running the GitFlow branching strategy. Here is how we are working.

* We continously build from the `develop` branch.
* New features are branched from `develop` into feature branches, e.g. `feature/<feature-name>`. We squash merge these into develop. During the merge, you can give GitVersion a hint on the next version number by including `[+semver:patch]`, `[+semver:minor]` or `[+semver:major]` in the message.
* We prepare releases in release brances, e.g. `release/0.2.0`.
* We release offical and stable version from the `main` branch.

**The only way to do a release of the library is to tag the release branch or the main branch.**

The follow describes an example workflow.

* `develop` has version `0.2.1-alpha.1`.
* A feature is merged into `develop` and the merge message includes `[+semver:minor]`.
* `develop` has version `0.3.0-alpha.1`.
* `release/0.3.0` is created from `develop` and gets version `0.3.0-beta.1`.
* The release branch is tagged with `0.3.0-beta.1` and this pushes a release to NuGet.
* A hotfix to the release branch increases the version to `0.3.0-beta.2`.
* To release, we tag the release branch with `0.3.0-beta.2`.
* When everything is fine and dandy, the release branch is merged to `develop` and `main` and the deleted.
* `main` is tagged with `0.3.0` and will be released to NuGet.

## Pipeline setup

First you need to install the tool. A fixed version is installed due to a bug in a later release (might have been solved by now).

```yaml
  - task: CmdLine@2
    displayName: Install GitVersion tool
    inputs:
      script: 'dotnet tool install --global GitVersion.Tool --version 5.10.0'
```

In order for the tool to generate a semantic version number you need to run

```yaml
  - task: CmdLine@2
    displayName: Generate version
    inputs:
      script: 'dotnet-gitversion /output buildserver /nofetch'
```

This outputs a lot of variables which are useful for the building and packaging of the library.

```yaml
  - task: DotNetCoreCLI@2
    displayName: Build library
    inputs:
      command: 'build'
      projects: '**/*.csproj'
      // highlight-next-line
      arguments: '-c Release -p:Version=$(GitVersion.SemVer)'
  - task: DotNetCoreCLI@2
    displayName: Build NuGet package
    inputs:
      command: 'pack'
      packagesToPack: '**/*.csproj'
      configuration: 'Release'
      nobuild: true
      versioningScheme: 'off'
      // highlight-next-line
      buildProperties: 'PackageVersion=$(GitVersion.NuGetVersion)'
```

After build and pack, the library gets pushed to the NuGet repository if the pipeline was triggered by a tag.

```yaml
  - task: DotNetCoreCLI@2
      // highlight-next-line
    condition: and(succeeded(), startsWith(variables['Build.SourceBranch'], 'refs/tags/'))
    displayName: Publish NuGet package
    inputs:
      command: 'push'
      packagesToPush: '$(Build.ArtifactStagingDirectory)/*.nupkg'
      nuGetFeedType: 'internal'
      publishVstsFeed: '.../...'
```

Done.
# Changelog

All notable changes to Threadz since version 2.2.1 will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.2.1] - 2022/25/08

### Fixed

- ESModules detection error in `ThreadzWorkerPool`

### Added

- Raw `MyErrorConfig` object to a new `raw` property on `MyError`

### Changed

- `fixup` script to accommodate for the usage of `__dirname` in **ThreadzWorkerPool.ts**
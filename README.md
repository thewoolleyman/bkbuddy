# BkBuddy

# Overview

* Gathers metrics on Buildkite builds/jobs via webhooks
* Exposes info on frequency of flaky jobs.  A flaky job is defined as a
  job that fails, then passes on a subsequent re-run for the same SHA
* (Future feature) Automatically re-runs specified failed jobs once.

# Initial Setup

* App create with command:
  * `rails new bkbuddy --database postgresql --skip-action-mailer --skip-action-mailbox --skip-action-text --skip-active-storage --skip-sprockets --skip-turbolinks --skip-test --webpack=react`

* Initial Setup
  * `rails db:migrate`
  * `bin/setup`

# Development

* Secrets
  * See `bkbuddy` secure note in LastPass
  * Create `config/master.key` from value in LastPass
  * Edit credentials with `EDITOR="mate --wait" bin/rails credentials:edit` (or another editor)

* Ruby version
  * Use rbenv/ruby-build via brew
  * rbenv install 2.6.3

* System dependencies
  * Postgresql
  * Redis (for actioncable)
  * Node
  * Yarn

TODO: (from default Rails readme)

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

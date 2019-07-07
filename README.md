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

# Tech Stack

* Rails
* Mysql for DB
* React + Redux frontend
* ActionCable for client-server communication
* [redux-cablecar](https://github.com/ndhays/redux-cablecar) to wire ActionCable into Redux
* Typescript
* [deox](https://deox.js.org/) to DRY up Redux
* [blueprintjs](https://blueprintjs.com/) for layout/styling

## Notes on interaction between `deox` and `redux-cablecar`

* Actions prefixed with `SERVER_REQ` are automatically dispatched to ActionCable via `redux-cablecar`
* Actions prefixed with `SERVER_RESP` are responses from ActionCable.  They will have
  action creator executors defined via `deox`, but these executors are ***never invoked***,
  because they are handled by `redux-cablecar`.  However, they are still *defined*, in
  order to declare the types used in the corresponding reducers.  There may be a
  cleaner/better way to do this...
  
## Notes on redux payloads in `deox` and `redux-cablecar`

* In the `deox` `createActionCreator` function's `executor` callback which receives
  a `resolve` callback parameter, the `resolve` callback will automatically wrap the
  passed payload in a "`payload`" key.  This means that when you process it in a
  reducer via `handleAction`, you will need to pattern-match out the `payload` key
  in order to get back the original object you passed to `resolve` in the action
  creator.
* ***However***, as mentioned above, action payloads whose dispatch is initiated
  from the server side via `redux-cablecar` (in `main_channel.rb`) never go through
  a `deox` action creator executor or resolve method.  Therefore, they do
  ***NOT*** automatically get their payload wrapped in a `payload` key.  So, for
  consistency in the reducers, these are manually wrapped in a `payload` key.

# Development

* Secrets
  * ***IMPORTANT: NEVER SET A PRODUCTION SECRET VIA `credentials:edit`, E.G. DB PASSWORDS, SENSITIVE API KEYS.  USE ENV VARS!***
  * Note that some API keys may be stored, however, because they are needed in dev/test as well as prod.  E.g. the Buildkite API key.
  * See `bin/rails credentials:help` and https://blog.eq8.eu/til/rails-52-credentials-tricks.html for more details
  * See `bkbuddy` secure note in LastPass
  * For local workstations, create `config/master.key` from value in LastPass
  * Edit credentials with `EDITOR="mate --wait" bin/rails credentials:edit` (or another editor)
  * Set RAILS_MASTER_KEY on deployed environments

* Ruby version
  * Use rbenv/ruby-build via brew
  * rbenv install 2.6.3

* System dependencies
  * Mysql
  * Redis (only on server for actioncable, dev uses default built-in async subscription adapter)
  * Node
  * Yarn


# TODO: (bullet items from default Rails readme)

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

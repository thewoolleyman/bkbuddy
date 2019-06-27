require "application_system_test_case"

class HappySystemTest < ApplicationSystemTestCase
  test "happy path" do
    visit root_url

    # Check header
    assert_selector "#header", text: "Kathryn Janeway"

    # Check load of initial database state
    assert_selector ".monitored-pipeline", text: "Tracker - Web" # existing, loaded from db

    # Sanity check that fixtures are being loaded to start with known state
    refute_selector ".monitored-pipeline", text: "Gogator"

    # expand pipeline chooser
    find('div#pipeline-chooser', text: /choose new pipelines to monitor/i).click

    # add a new monitored pipeline (hits live Buildkite API)
    click_button text: /select a pipeline to monitor/i
    find('a.pipeline-select-item', text: /Gogator/).click
    assert_selector ".monitored-pipeline", text: "Gogator"
  end
end

require "application_system_test_case"

class HappySystemTest < ApplicationSystemTestCase
  test "happy path" do
    visit root_url

    # Check header
    assert_selector "#header", text: "Kathryn Janeway"

    # Check load of initial database state
    assert_selector ".monitored-pipeline", text: "Tracker - Web" # existing, loaded from db

    # Sanity check that fixtures are being loaded to start with known state
    refute_selector ".monitored-pipeline", text: "Classico – Weekday Morning"

    # expand pipeline chooser
    find('div#pipeline-chooser', text: /choose new pipelines to monitor/i).click

    # add a new monitored pipeline (hits live Buildkite API)
    click_button text: /select a pipeline to monitor/i
    find('a.pipeline-select-item', text: /Classico – Weekday Morning/).click
    assert_selector ".monitored-pipeline", text: "Classico – Weekday Morning"

    # load steps
    within('.monitored-pipeline', text: "Classico – Weekday Morning") do
      find('.refreshSteps').click
    end
    assert_selector "li.step", text: "scripts/testing/browser"

    # test error display
    find('.forceServerError').click
    assert_selector "div", text: "RuntimeError"
    find('.forceClientError').click
    assert_selector "div", text: "TestClientError1"
    assert_selector "div", text: "TestClientError2"
  end
end
